import { GoogleGenAI, Type } from "@google/genai";
import { AdStyle, AdCopy, LogoPosition, AdParameters } from "../types";

const extractBase64 = (dataUrl: string): string => {
  return dataUrl.split(',')[1];
};

const getPromptForStyle = (style: AdStyle): string => {
  switch (style) {
    case AdStyle.CYBERPUNK:
      return "Create a high-impact cyberpunk advertising creative. Surround the product with neon lights, holographic glitches, and a futuristic night city background. Colors: Neon Pink, Cyan, Deep Purple.";
    case AdStyle.LUXURY:
      return "Create an ultra-luxurious, premium advertising creative. Place the product on white or black marble with gold accents and elegant spotlighting.";
    case AdStyle.STEAMPUNK_BRASS:
      return "Create a detailed Steampunk ad. Product surrounded by brass gears, copper pipes, Victorian industrial textures, and warm gaslight illumination.";
    case AdStyle.ABSTRACT_PAPER:
      return "Create a clean Paper Cutout style ad. Minimalist layers of high-quality craft paper with soft shadows, focus on shapes and textures.";
    case AdStyle.ABYSSAL_DEEP:
      return "Create a mysterious Deep Sea Abyssal ad. Bioluminescent floating organisms, deep navy blue water, caustic light effects, and bubbles.";
    case AdStyle.COSMIC_NEBULA:
      return "Create a majestic Cosmic Nebula ad. Swirling galaxy clouds in purple and gold, distant stars, and a vast, dreamy space atmosphere.";
    case AdStyle.HYPER_MINIMAL:
      return "Create a Hyper Minimalist commercial photo. Pure monochromatic background with sharp, elegant shadows that define the product's silhouette.";
    case AdStyle.SYNTHWAVE_SUN:
      return "Create a classic Synthwave ad. Retrowave sun grid, pink and orange sunset sky, VHS scanline textures, and a cool 80s electronic vibe.";
    case AdStyle.VAPORWAVE_DREAM:
      return "Create a nostalgic Vaporwave advertising creative. Use pastel pinks, purples, and blues, 80s aesthetics, low-poly grids, and stylized palm trees.";
    case AdStyle.GOLDEN_LIQUID:
      return "Create a majestic liquid gold luxury ad. The product should be surrounded by swirling molten gold, highly reflective surfaces, and expensive lighting.";
    case AdStyle.URBAN_GRAFFITI:
      return "Create a high-energy street graffiti ad. Vibrant spray paint drips, urban wall textures, colorful neon tags, and a modern street fashion vibe.";
    case AdStyle.MAGMA_CORE:
      return "Create an intense volcanic magma ad. Glowing lava, deep red embers, dark basalt rocks, and extreme lighting contrast with fire sparks.";
    case AdStyle.GLACIER_FROST:
      return "Create a freezing glacier frost ad. Translucent ice crystals, blue frozen textures, mist, and sharp, cold highlights on the product.";
    case AdStyle.BIO_LUMINESCENT:
      return "Create a magical bioluminescent jungle ad. Glowing exotic plants, mysterious purple and green light veins, and a lush, dreamlike dark forest atmosphere.";
    case AdStyle.EXPLOSIVE:
      return "Create an explosive, high-energy advertising creative. The product should look like it is landing with impact, causing colorful debris and energy sparks to fly.";
    default:
      return "Create a high-impact advertising creative. Dramatic lighting, professional product photography style, vibrant colors.";
  }
};

export const generateAdCreative = async (
  productBase64: string,
  style: AdStyle,
  customInstructions?: string,
  logoBase64?: string,
  logoPosition: LogoPosition = LogoPosition.TOP_RIGHT,
  params?: AdParameters
): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const model = 'gemini-2.5-flash-image';
    const basePrompt = getPromptForStyle(style);
    
    const lightingStyle = "high-contrast vibrant professional lighting";
    const complexityStyle = "intricate and detailed environment with rich cinematic textures";
    const colorDNA = "Use vibrant, high-end commercial colors matching the style.";

    const textOverlayDirective = params && params.overlayText 
      ? `CRITICAL: Render the text "${params.overlayText}" elegantly and prominently in the composition. The typography must be legible, stylish, and integrated into the artistic style of the ad.` 
      : "";

    let finalPrompt = `
      Expert advertising art director task.
      Style Directive: ${basePrompt}
      Lighting: ${lightingStyle}
      Background: ${complexityStyle}
      Color Palette: ${colorDNA}
      ${textOverlayDirective}

      ${customInstructions ? `Additional Context: ${customInstructions}` : ''}
      
      REQUIREMENTS:
      1. Subject is the hero. Enhance but don't distort its original product identity.
      2. Professional 4K commercial photography quality.
      ${logoBase64 ? `3. LOGO: Place the provided brand logo clearly in the ${logoPosition} corner.` : ''}
      4. Ensure the output is vibrant, colorful, and ultra-appealing for social media conversion.
    `;

    const parts: any[] = [
      { inlineData: { mimeType: 'image/jpeg', data: extractBase64(productBase64) } }
    ];

    if (logoBase64) {
      parts.push({ inlineData: { mimeType: 'image/jpeg', data: extractBase64(logoBase64) } });
    }

    parts.push({ text: finalPrompt });

    const response = await ai.models.generateContent({
      model: model,
      contents: { parts: parts }
    });

    const contentParts = response.candidates?.[0]?.content?.parts;
    if (!contentParts) throw new Error("Generation failed");

    for (const part of contentParts) {
      if (part.inlineData?.data) {
        return `data:image/jpeg;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data");
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const generateAdCopy = async (
  imageBase64: string,
  style: AdStyle,
  customInstructions?: string
): Promise<AdCopy> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const model = 'gemini-3-flash-preview';
    const prompt = `
      Estrategista de marcas de luxo. Crie headlines e descrições persuasivas para este anúncio no estilo "${style}".
      Evite clichês óbvios. Foque em transformação, desejo e status.
      GERE EXATAMENTE: 5 Títulos e 5 Descrições em JSON.
      Idioma: Português (Brasil).
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: extractBase64(imageBase64) } },
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
          }
        }
      }
    });

    const rawData = JSON.parse(response.text || '{}');
    return {
      titles: Array.isArray(rawData.titles) ? rawData.titles : ["Elegância Definida", "O Futuro da Forma"],
      descriptions: Array.isArray(rawData.descriptions) ? rawData.descriptions : ["Descubra o extraordinário.", "Sinta a perfeição em cada detalhe."]
    };
  } catch (error) {
    return { titles: ["Elegância Definida", "O Futuro da Forma"], descriptions: ["Descubra o extraordinário.", "Sinta a perfeição em cada detalhe."] };
  }
};