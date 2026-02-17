export enum AdStyle {
  // General Styles
  CYBERPUNK = 'Cyberpunk Neon',
  LUXURY = 'Dark Luxury Gold',
  EXPLOSIVE = 'Explosive Energy',
  SURREAL = 'Surreal Dreamscape',
  MINIMAL_POWER = 'Minimalist Power',
  NATURE_FORCE = 'Force of Nature',
  AI_GLOW = 'AI Tech Glow',
  RETRO_WAVE = 'Retro Synthwave',
  ECO_ORGANIC = 'Eco Organic',
  INDUSTRIAL = 'Urban Industrial',
  POP_ART = 'Vibrant Pop Art',
  MONOCHROME = 'High Fashion Mono',
  LIQUID_MOTION = 'Liquid Motion',
  HOLOGRAPHIC = 'Holographic Iridescence',
  COZY_HOME = 'Warm Lifestyle',
  GEOMETRIC_3D = 'Abstract 3D',
  
  // Existing New Styles
  VAPORWAVE_DREAM = 'Vaporwave Dream',
  GOLDEN_LIQUID = 'Golden Fluid Lux',
  URBAN_GRAFFITI = 'Street Graffiti',
  MAGMA_CORE = 'Volcanic Magma',
  GLACIER_FROST = 'Glacier Frost',
  BIO_LUMINESCENT = 'Neon Biolume',

  // Extra 6 Styles
  STEAMPUNK_BRASS = 'Steampunk Brass',
  ABSTRACT_PAPER = 'Abstract Paper Cut',
  ABYSSAL_DEEP = 'Abyssal Deep Sea',
  COSMIC_NEBULA = 'Cosmic Nebula',
  HYPER_MINIMAL = 'Hyper Minimalist',
  SYNTHWAVE_SUN = 'Synthwave Sunset',

  // PornFood Styles
  FOOD_GOURMET = 'Gourmet Dark',
  FOOD_STREET = 'Street Messy',
  FOOD_FRESH = 'Ultra Fresh',
  FOOD_BBQ = 'Rustic BBQ',
  FOOD_SWEET = 'Sweet Dream',

  // Beauty & Fragrance Styles
  BEAUTY_CRYSTAL = 'Crystal Splash',
  BEAUTY_FLORAL = 'Floral Garden',
  BEAUTY_GOLD = 'Gold Elegance',
  BEAUTY_ZEN = 'Minimal Zen',
  BEAUTY_GLOSSY = 'Glossy Pink',
  BEAUTY_COSMIC = 'Cosmic Sparkle',
  BEAUTY_MATTE = 'Matte Professional',
  BEAUTY_VINTAGE = 'Vintage Pearl',
  BEAUTY_VELVET = 'Night Velvet',
  BEAUTY_ORGANIC = 'Organic Essence'
}

export enum LogoPosition {
  TOP_LEFT = 'superior esquerdo',
  TOP_RIGHT = 'superior direito',
  BOTTOM_LEFT = 'inferior esquerdo',
  BOTTOM_RIGHT = 'inferior direito'
}

export type Category = 'general' | 'food' | 'beauty';

export interface AdParameters {
  lightingIntensity: number;
  backgroundComplexity: number;
  colorPalette: string;
  overlayText?: string;
}

export interface GeneratedImage {
  original: string;
  result: string;
  style: AdStyle;
  timestamp: number;
}

export interface AdCopy {
  titles: string[];
  descriptions: string[];
}

export interface StyleConfig {
  id: AdStyle;
  label: string;
  description: string;
  gradient: string;
  promptModifier: string;
  category: Category;
}