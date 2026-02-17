import { GoogleGenAI, Type } from "@google/genai";
import { AdStyle, AdCopy, LogoPosition, AdParameters } from "../types";

const getImageData = (dataUrl: string) => {
  const match = dataUrl.match(/^data:(image\/[a-zA-Z+.-]+);base64,(.+)$/);
  if (!match) throw new Error("Formato de imagem inválido");
  return { mimeType: match[1], data: match[2] };
};

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const withRetry = async <T>(fn: () => Promise<T>, retries = 2, delay = 3000): Promise<T> => {
  try {
    return await fn();
  } catch (error: any) {
    const errorStr = JSON.stringify(error).toUpperCase();
    const isRateLimit = errorStr.includes('429') || errorStr.includes('RESOURCE_EXHAUSTED');
    
    if (isRateLimit && retries > 0) {
      console.warn(`Cota atingida. Tentando novamente em ${delay}ms...`);
      await wait(delay);
      return withRetry(fn, retries - 1, delay * 2);
    }
    
    if (isRateLimit) {
      throw new Error("COTA_EXCEDIDA: O modelo de imagem atingiu o limite da chave gratuita. Por favor, clique em 'CONFIGURAR CHAVE' e use sua própria API Key paga para gerar sem restrições.");
    }
    
    throw error;
  }
};

const getPromptForStyle = (style: AdStyle): string => {
  const styles: Record<string, string> = {
    [AdStyle.CYBERPUNK]: "High-impact cyberpunk advertising. Neon lights, holographic glitches, futuristic night city.",
    [AdStyle.LUXURY]: "Ultra-luxurious premium ad. White or black marble, gold accents, elegant spotlights.",
    [AdStyle.EXPLOSIVE]: "Explosive energy ad. Product landing with impact, debris, energy sparks.",
    [AdStyle.VAPORWAVE_DREAM]: "Nostalgic vaporwave. Pastel pinks/blues, 80s aesthetics, palm trees, low-poly grids.",
    [AdStyle.GOLDEN_LIQUID]: "Majestic liquid gold luxury. Swirling molten gold, highly reflective surfaces."
  };
  return styles[style] || "Professional high-impact commercial photography, vibrant colors, dramatic lighting.";
};

export const generateAdCreative = async (
  productBase64: string,
  style: AdStyle,
  customInstructions?: string,
  logoBase64?: string,
  logoPosition: LogoPosition = LogoPosition.TOP_RIGHT,
  params?: AdParameters
): Promise<string> => {
  return withRetry(async () => {
    // Inicializa uma nova instância para garantir que usa a chave mais recente selecionada no dialog
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const modelName = 'gemini-2.5-flash-image';
    const basePrompt = getPromptForStyle(style);
    
    const textOverlayDirective = params?.overlayText 
      ? `IMPORTANT: Elegantly render the text "${params.overlayText}" in the composition.` 
      : "";

    const prompt = `
      Professional commercial photographer and digital artist task.
      Style Instruction: ${basePrompt}
      ${textOverlayDirective}
      ${customInstructions ? `Additional Context: ${customInstructions}` : ''}
      
      REQUIREMENTS:
      1. Use FIRST image as HERO PRODUCT.
      ${logoBase64 ? `2. Use SECOND image as LOGO in ${logoPosition}.` : ''}
      3. Output 4K commercial quality.
    `;

    const productInfo = getImageData(productBase64);
    const parts: any[] = [{ inlineData: { mimeType: productInfo.mimeType, data: productInfo.data } }];

    if (logoBase64) {
      const logoInfo = getImageData(logoBase64);
      parts.push({ inlineData: { mimeType: logoInfo.mimeType, data: logoInfo.data } });
    }

    parts.push({ text: prompt });

    const response = await ai.models.generateContent({
      model: modelName,
      contents: { parts: parts }
    });

    const candidate = response.candidates?.[0];
    if (!candidate?.content?.parts) throw new Error("Falha na síntese: Sem resposta da IA.");

    for (const part of candidate.content.parts) {
      if (part.inlineData?.data) {
        return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
      }
    }

    throw new Error("A IA não retornou uma imagem. Tente um estilo diferente.");
  });
};

export const generateAdCopy = async (
  imageBase64: string,
  style: AdStyle,
  customInstructions?: string
): Promise<AdCopy> => {
  return withRetry(async () => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const modelName = 'gemini-3-flash-preview';
    
    const prompt = `Estrategista de marcas. Crie 5 headlines e 5 descrições persuasivas em JSON para este anúncio de estilo "${style}". Retorne apenas o JSON. Idioma: Português.`;
    const imgInfo = getImageData(imageBase64);

    const response = await ai.models.generateContent({
      model: modelName,
      contents: {
        parts: [
          { inlineData: { mimeType: imgInfo.mimeType, data: imgInfo.data } },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            titles: { type: Type.ARRAY, items: { type: Type.STRING } },
            descriptions: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["titles", "descriptions"]
        }
      }
    });

    try {
      return JSON.parse(response.text || '{}');
    } catch {
      return { 
        titles: ["O Próximo Nível", "Design de Elite"], 
        descriptions: ["Experiência incomparável.", "Transforme sua realidade hoje."] 
      };
    }
  });
};