import { GoogleGenAI, Type } from "@google/genai";
import { AdStyle, AdCopy, LogoPosition, AdParameters } from "../types";

const getImageData = (dataUrl: string) => {
  const match = dataUrl.match(/^data:(image\/[a-zA-Z+.-]+);base64,(.+)$/);
  if (!match) throw new Error("Formato de imagem inválido");
  return { mimeType: match[1], data: match[2] };
};

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const resizeImage = (base64Str: string, maxWidth = 512, maxHeight = 512): Promise<string> => {
  return new Promise((resolve) => {
    if (!base64Str || !base64Str.startsWith('data:image')) {
      console.error("[IA] Imagem inválida fornecida para redimensionamento");
      resolve(base64Str);
      return;
    }
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', 0.8));
    };
    img.onerror = (e) => {
      console.error("[IA] Erro ao carregar imagem para redimensionamento:", e);
      resolve(base64Str);
    };
  });
};

const getApiKey = () => {
  const key = process.env.API_KEY || process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error("Chave de API não encontrada. Por favor, conecte sua chave no topo da tela.");
  }
  return key;
};

export const isQuotaError = (error: any): boolean => {
  const errorMsg = error?.message?.toLowerCase() || "";
  return errorMsg.includes('429') || 
         errorMsg.includes('resource_exhausted') || 
         errorMsg.includes('quota') ||
         errorMsg.includes('limit') ||
         errorMsg.includes('overloaded') ||
         errorMsg.includes('busy') ||
         errorMsg.includes('demand') ||
         errorMsg.includes('ocupado') ||
         errorMsg.includes('processador') ||
         errorMsg.includes('alta demanda') ||
         errorMsg.includes('deadline_exceeded') ||
         errorMsg.includes('quota_exceeded');
};

const withRetry = async <T>(fn: () => Promise<T>, retries = 5, delay = 3000, initialRetries = 5): Promise<T> => {
  try {
    return await fn();
  } catch (error: any) {
    if (isQuotaError(error) && retries > 0) {
      const backoff = delay * Math.pow(1.5, initialRetries - retries);
      const jitter = Math.random() * 2000;
      const waitTime = backoff + jitter;
      
      await wait(waitTime);
      return withRetry(fn, retries - 1, delay, initialRetries);
    }
    
    throw error;
  }
};

const getPromptForStyle = (style: AdStyle): string => {
  const styles: Record<string, string> = {
    [AdStyle.CYBERPUNK]: "Cyberpunk neon advertising. High-tech, futuristic city, glowing edges, cinematic lighting, purple and cyan tones.",
    [AdStyle.LUXURY]: "Premium luxury photography. Deep shadows, elegant golden highlights, marble texture, ultra-sharp, sophisticated atmosphere.",
    [AdStyle.EXPLOSIVE]: "Dynamic explosive action. Debris, motion blur, intense energy sparks, high-speed shutter, fire and smoke elements.",
    [AdStyle.SURREAL]: "Surreal dreamscape. Floating elements, impossible geometry, soft ethereal lighting, dream-like atmosphere, pastel gradients.",
    [AdStyle.MINIMAL_POWER]: "Minimalist power. High contrast black and white or stark colors, sharp shadows, clean lines, bold composition.",
    [AdStyle.NATURE_FORCE]: "Raw nature force. Stormy clouds, lightning, crashing waves or rocky terrain, powerful natural lighting.",
    [AdStyle.AI_GLOW]: "AI technology glow. Neural network patterns, blue laser lines, holographic interfaces, digital intelligence aesthetic.",
    [AdStyle.RETRO_WAVE]: "80s Retro Synthwave. Laser grids, neon sunsets, chrome textures, vibrant pink and blue palette.",
    [AdStyle.ECO_ORGANIC]: "Eco-friendly organic. Lush greenery, natural sunlight, wooden textures, fresh and sustainable feel.",
    [AdStyle.INDUSTRIAL]: "Urban industrial. Raw concrete, rusted steel, warehouse setting, moody shadows, gritty texture.",
    [AdStyle.POP_ART]: "Vibrant Pop Art. Bold primary colors, comic book halftone dots, thick outlines, high energy.",
    [AdStyle.MONOCHROME]: "High-fashion monochrome. Dramatic black and white, high contrast, elegant lighting, timeless aesthetic.",
    [AdStyle.LIQUID_MOTION]: "Dynamic liquid motion. Water splashes, paint swirls, fluid shapes, high-speed capture, refreshing feel.",
    [AdStyle.HOLOGRAPHIC]: "Holographic iridescence. Rainbow color shifts, pearlescent textures, soft futuristic glow.",
    [AdStyle.COZY_HOME]: "Cozy home lifestyle. Warm interior lighting, soft fabrics, comfortable atmosphere, inviting and domestic.",
    [AdStyle.GEOMETRIC_3D]: "Abstract 3D geometry. Floating spheres and cubes, soft global illumination, modern architectural composition.",
    [AdStyle.ZEN_GARDEN]: "Zen garden tranquility. Smooth stones, raked sand, bamboo, soft natural light, peaceful and balanced.",
    [AdStyle.FOOD_GOURMET]: "Professional gourmet food close-up. Warm moody lighting, steam, macro detail, bokeh, appetizing textures.",
    [AdStyle.FOOD_STREET]: "Vibrant street food photography. Steam, glowing sauces, warm lighting, busy urban background, high energy.",
    [AdStyle.FOOD_FRESH]: "Ultra-fresh food photography. Bright natural light, water droplets, marble surface, clean and healthy aesthetic.",
    [AdStyle.FOOD_BBQ]: "Rustic BBQ photography. Fire, smoke, charred textures, dark wooden background, intense warm lighting.",
    [AdStyle.FOOD_SWEET]: "Irresistible dessert photography. Glossy syrups, soft focus, pastel colors, indulgent and sweet atmosphere.",
    [AdStyle.FOOD_MOLECULAR]: "Molecular gastronomy art. Foams, liquid nitrogen clouds, futuristic plating, scientific precision, blue and white lighting.",
    [AdStyle.FOOD_RUSTIC]: "Rustic farmhouse food. Aged wood, candlelight, warm earthy tones, cozy and traditional atmosphere.",
    [AdStyle.FOOD_NEON]: "Retro neon diner aesthetic. Glowing signs, chrome reflections, vibrant pink and blue lighting, nostalgic atmosphere.",
    [AdStyle.FOOD_MINIMAL]: "Minimalist food plating. Extreme negative space, architectural composition, stark lighting, high-end art gallery feel.",
    [AdStyle.FOOD_TROPICAL]: "Tropical food paradise. Bright sunlight, lush jungle leaves, vibrant exotic colors, refreshing and summer-like.",
    [AdStyle.FOOD_VINTAGE]: "Vintage kitchen photography. 1950s pastel colors, soft film grain, nostalgic domestic setting, warm and inviting.",
    [AdStyle.FOOD_SPICY]: "Intense spicy food. Red chili peppers, fire, heat haze, dark moody background, powerful and bold.",
    [AdStyle.FOOD_FROZEN]: "Frozen beverage photography. Ice crystals, frost, condensation, cool blue lighting, refreshing and crisp.",
    [AdStyle.BEAUTY_CRYSTAL]: "Crystal beauty photography. Refracted light, water splashes, glass-like skin, pure and refreshing.",
    [AdStyle.BEAUTY_FLORAL]: "Floral beauty garden. Floating petals, soft garden light, romantic and feminine, delicate textures.",
    [AdStyle.BEAUTY_GOLD]: "High-end beauty product shot. Shimmering gold particles, silk drapes, soft focus luxury, radiant glow.",
    [AdStyle.BEAUTY_ZEN]: "Zen beauty minimalism. Smooth stones, bamboo, soft natural light, peaceful and balanced skincare aesthetic.",
    [AdStyle.BEAUTY_GLOSSY]: "High-gloss beauty. Vibrant pop colors, super-shiny textures, modern and youthful energy.",
    [AdStyle.BEAUTY_COSMIC]: "Cosmic beauty glow. Glittering stars, galaxy colors, mystical atmosphere, radiant and ethereal.",
    [AdStyle.BEAUTY_MATTE]: "Professional matte beauty. Clean studio setting, soft powder textures, sophisticated and chic.",
    [AdStyle.BEAUTY_VINTAGE]: "Vintage glamour beauty. Classic pearls, cream tones, soft focus, timeless elegance.",
    [AdStyle.BEAUTY_VELVET]: "Dark velvet beauty. Rich fabric textures, dramatic lighting, mysterious and luxurious atmosphere.",
    [AdStyle.BEAUTY_ORGANIC]: "Organic skincare essence. Natural ingredients, fresh green leaves, pure and sustainable beauty.",
    [AdStyle.BEAUTY_PEARL]: "Pearlescent luxury beauty. Soft iridescent glow, smooth textures, elegant and subtle radiance.",
    [AdStyle.BEAUTY_NEON]: "Neon glam makeup. Blacklight glow, vibrant neon colors, bold and edgy fashion aesthetic.",
    [AdStyle.BEAUTY_DIAMOND]: "Diamond sparkle beauty. Intense light reflections, glittering crystals, high-end luxury and opulence.",
    [AdStyle.BEAUTY_SILK]: "Silk flow beauty. Soft moving fabrics, delicate lighting, smooth and luxurious touch."
  };
  return styles[style] || "Professional commercial high-impact advertising photography, studio lighting, masterpiece quality.";
};

export const generateAdCreative = async (
  productBase64: string,
  style: AdStyle,
  customInstructions?: string,
  logoBase64?: string,
  logoPosition: LogoPosition = LogoPosition.TOP_RIGHT,
  params?: AdParameters,
  onStatusUpdate?: (status: string) => void
): Promise<string> => {
  const modelName = 'gemini-3.1-flash-image-preview';
  
  onStatusUpdate?.('OTIMIZANDO RECURSOS VISUAIS...');
  const optimizedProduct = await resizeImage(productBase64);
  const optimizedLogo = logoBase64 ? await resizeImage(logoBase64, 512, 512) : null;

  const stylePrompt = getPromptForStyle(style);
  const overlayTextPrompt = params?.overlayText ? `IMPORTANT: Render the text "${params.overlayText}" into the scene with high-end typography.` : "";
  const finalPrompt = `
    Advertising photography for a product.
    PRODUCT DESCRIPTION: The product shown in the image.
    STYLE: ${stylePrompt}
    ${overlayTextPrompt}
    ${customInstructions ? `INSTRUCTIONS: ${customInstructions}` : ""}
    COMPOSITION: The product is the hero, centered, professional studio lighting, commercial grade.
    ${logoBase64 ? `BRANDING: Place the logo at the ${logoPosition}.` : ""}
  `;

  onStatusUpdate?.(`GERANDO CRIATIVO...`);
  
  return await withRetry(async () => {
    const apiKey = getApiKey();
    const ai = new GoogleGenAI({ apiKey });
    
    const productInfo = getImageData(optimizedProduct);
    const parts: any[] = [
      { inlineData: { mimeType: productInfo.mimeType, data: productInfo.data } },
      { text: finalPrompt }
    ];

    if (optimizedLogo) {
      const logoInfo = getImageData(optimizedLogo);
      parts.push({ inlineData: { mimeType: logoInfo.mimeType, data: logoInfo.data } });
    }

    const response = await ai.models.generateContent({
      model: modelName,
      contents: { parts: parts },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
          imageSize: "1K"
        }
      }
    });

    const candidate = response.candidates?.[0];
    
    if (candidate?.finishReason && candidate.finishReason !== 'STOP') {
      if (candidate.finishReason === 'SAFETY') throw new Error("A IA recusou a geração por segurança.");
      throw new Error(`Erro: ${candidate.finishReason}`);
    }

    if (candidate?.content?.parts) {
      for (const part of candidate.content.parts) {
        if (part.inlineData?.data) {
          return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
        }
      }
    }

    throw new Error("Falha ao gerar imagem.");
  });
};

export const generateAdCopy = async (
  imageBase64: string,
  style: AdStyle,
  customInstructions?: string
): Promise<AdCopy> => {
  return withRetry(async () => {
    const apiKey = getApiKey();
    const ai = new GoogleGenAI({ apiKey });
    const modelName = 'gemini-3-flash-preview';
    
    const imgInfo = getImageData(imageBase64);
    const prompt = `Como um mestre do marketing, analise este produto no estilo "${style}". ${customInstructions ? `Instruções extras: ${customInstructions}.` : ''} Crie 5 títulos magnéticos e 5 textos de copy curtos. Retorne APENAS JSON. Idioma: Português.`;

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
      return { titles: ["Inovação Pura"], descriptions: ["O futuro chegou."] };
    }
  });
};