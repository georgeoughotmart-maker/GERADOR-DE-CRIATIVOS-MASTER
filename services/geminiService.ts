import { GoogleGenAI, Type } from "@google/genai";
import { AdStyle, AdCopy, LogoPosition, AdParameters } from "../types";

const getImageData = (dataUrl: string) => {
  const match = dataUrl.match(/^data:(image\/[a-zA-Z+.-]+);base64,(.+)$/);
  if (!match) throw new Error("Formato de imagem inválido");
  return { mimeType: match[1], data: match[2] };
};

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const withRetry = async <T>(fn: () => Promise<T>, retries = 3, delay = 3000): Promise<T> => {
  try {
    return await fn();
  } catch (error: any) {
    const errorMsg = error?.message?.toLowerCase() || "";
    const errorStatus = error?.status;
    const isQuotaError = errorMsg.includes('429') || 
                        errorMsg.includes('resource_exhausted') || 
                        errorMsg.includes('quota') ||
                        errorMsg.includes('limit') ||
                        errorStatus === 429;

    if (isQuotaError && retries > 0) {
      console.warn(`[API] Cota excedida. Tentando novamente em ${delay}ms... (Tentativas restantes: ${retries})`);
      await wait(delay);
      return withRetry(fn, retries - 1, delay * 2);
    }
    
    if (isQuotaError) {
      throw new Error("LIMITE DE COTA: O Google limitou as requisições gratuitas para este modelo de imagem no momento. Por favor, aguarde cerca de 1 minuto ou utilize uma chave de projeto com faturamento ativo.");
    }
    
    throw error;
  }
};

const getPromptForStyle = (style: AdStyle): string => {
  const styles: Record<string, string> = {
    [AdStyle.CYBERPUNK]: "Cyberpunk neon advertising. High-tech, futuristic city, glowing edges, cinematic lighting.",
    [AdStyle.LUXURY]: "Premium luxury photography. Deep shadows, elegant golden highlights, marble texture, ultra-sharp.",
    [AdStyle.EXPLOSIVE]: "Dynamic explosive action. Debris, motion blur, intense energy sparks, high-speed shutter.",
    [AdStyle.FOOD_GOURMET]: "Professional gourmet food close-up. Warm moody lighting, steam, macro detail, bokeh.",
    [AdStyle.BEAUTY_GOLD]: "High-end beauty product shot. Shimmering gold particles, silk drapes, soft focus luxury."
  };
  return styles[style] || "Professional commercial high-impact advertising photography, studio lighting.";
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
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const modelName = 'gemini-2.5-flash-image';
    
    const productInfo = getImageData(productBase64);
    const parts: any[] = [{ inlineData: { mimeType: productInfo.mimeType, data: productInfo.data } }];

    if (logoBase64) {
      const logoInfo = getImageData(logoBase64);
      parts.push({ inlineData: { mimeType: logoInfo.mimeType, data: logoInfo.data } });
    }

    const stylePrompt = getPromptForStyle(style);
    const overlayTextPrompt = params?.overlayText ? `IMPORTANT: High-end artistic typography for the text "${params.overlayText}".` : "";
    
    const finalPrompt = `
      TASK: Create an ultra-premium advertising creative masterpiece.
      STYLE: ${stylePrompt}
      ${overlayTextPrompt}
      ADDITIONAL INFO: ${customInstructions || ""}
      COMPOSITION: Hero Product is the centerpiece. Background, lighting, and atmospherics must be completely reimagined according to style.
      ${logoBase64 ? `BRANDING: Place logo at ${logoPosition}.` : ""}
      QUALITY: Masterpiece, 4K, Commercial Grade.
    `;

    parts.push({ text: finalPrompt });

    const response = await ai.models.generateContent({
      model: modelName,
      contents: { parts: parts }
    });

    const candidate = response.candidates?.[0];
    if (!candidate?.content?.parts) throw new Error("A IA não retornou uma imagem válida.");

    for (const part of candidate.content.parts) {
      if (part.inlineData?.data) {
        return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
      }
    }

    throw new Error("Falha ao sintetizar a imagem. Tente outro estilo.");
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
    
    const imgInfo = getImageData(imageBase64);
    const prompt = `Como um mestre do marketing, analise este produto no estilo "${style}". Crie 5 títulos magnéticos e 5 textos de copy curtos. Retorne APENAS JSON. Idioma: Português.`;

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
      return JSON.parse(response.text || '{"titles":[], "descriptions":[]}');
    } catch {
      return { titles: ["Inovação Pura", "Design de Elite"], descriptions: ["Transforme sua presença digital.", "Qualidade incomparável."] };
    }
  });
};