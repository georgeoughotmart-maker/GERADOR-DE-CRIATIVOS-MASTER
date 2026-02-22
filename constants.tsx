import { AdStyle, StyleConfig } from './types';

export const STYLES: StyleConfig[] = [
  // General Category
  {
    id: AdStyle.CYBERPUNK,
    label: "NEON PUNK",
    description: "Futurista, luzes de neon, tecnologia, caos urbano.",
    gradient: "from-pink-600 to-purple-900",
    promptModifier: "Cyberpunk",
    category: 'general'
  },
  {
    id: AdStyle.LUXURY,
    label: "DARK LUXURY",
    description: "Elegância, ouro, mármore preto, exclusividade.",
    gradient: "from-yellow-600 to-neutral-900",
    promptModifier: "Luxury",
    category: 'general'
  },
  {
    id: AdStyle.STEAMPUNK_BRASS,
    label: "STEAMPUNK",
    description: "Engrenagens, latão polido, estética vitoriana industrial.",
    gradient: "from-amber-800 via-orange-900 to-black",
    promptModifier: "Steampunk",
    category: 'general'
  },
  {
    id: AdStyle.ABSTRACT_PAPER,
    label: "PAPER CUT",
    description: "Estilo colagem de papel, sombras suaves, minimalismo tátil.",
    gradient: "from-orange-100 via-orange-200 to-white",
    promptModifier: "Paper Cutout",
    category: 'general'
  },
  {
    id: AdStyle.ABYSSAL_DEEP,
    label: "DEEP SEA",
    description: "Bioluminescência marinha, azul profundo, mistério oceânico.",
    gradient: "from-blue-900 via-indigo-950 to-black",
    promptModifier: "Abyssal",
    category: 'general'
  },
  {
    id: AdStyle.COSMIC_NEBULA,
    label: "COSMIC",
    description: "Galáxias, nebulosas coloridas, poeira estelar infinita.",
    gradient: "from-purple-900 via-indigo-800 to-black",
    promptModifier: "Nebula",
    category: 'general'
  },
  {
    id: AdStyle.HYPER_MINIMAL,
    label: "HYPER MINIMAL",
    description: "Branco puro, sombras nítidas, foco absoluto no objeto.",
    gradient: "from-slate-100 to-white",
    promptModifier: "Hyper Minimalist",
    category: 'general'
  },
  {
    id: AdStyle.SYNTHWAVE_SUN,
    label: "SYNTH SUNSET",
    description: "Sol retrô em grade, cores vibrantes de entardecer 80s.",
    gradient: "from-pink-500 via-orange-500 to-purple-900",
    promptModifier: "Synthwave",
    category: 'general'
  },
  {
    id: AdStyle.VAPORWAVE_DREAM,
    label: "VAPORWAVE",
    description: "Estética 80s, estátuas gregas, cores pastel vibrantes.",
    gradient: "from-pink-400 via-purple-400 to-cyan-400",
    promptModifier: "Vaporwave",
    category: 'general'
  },
  {
    id: AdStyle.GOLDEN_LIQUID,
    label: "GOLD FLUID",
    description: "Ouro derretido, luxo fluido, reflexos ultra-brilhantes.",
    gradient: "from-amber-200 via-yellow-500 to-amber-800",
    promptModifier: "Molten Gold",
    category: 'general'
  },
  {
    id: AdStyle.URBAN_GRAFFITI,
    label: "GRAFFITI",
    description: "Arte de rua, tintas neon, energia urbana crua.",
    gradient: "from-green-400 via-yellow-400 to-red-500",
    promptModifier: "Street Art",
    category: 'general'
  },
  {
    id: AdStyle.MAGMA_CORE,
    label: "MAGMA CORE",
    description: "Lava vulcânica, brasa viva, contraste extremo.",
    gradient: "from-red-600 via-orange-600 to-black",
    promptModifier: "Volcanic",
    category: 'general'
  },
  {
    id: AdStyle.GLACIER_FROST,
    label: "GLACIER",
    description: "Gelo cristalino, frieza azul, texturas de geada.",
    gradient: "from-blue-100 via-cyan-300 to-blue-900",
    promptModifier: "Glacier",
    category: 'general'
  },
  {
    id: AdStyle.BIO_LUMINESCENT,
    label: "BIO JUNGLE",
    description: "Plantas que brilham, floresta neon, místico.",
    gradient: "from-green-600 via-emerald-400 to-purple-900",
    promptModifier: "Bioluminescent",
    category: 'general'
  },
  {
    id: AdStyle.EXPLOSIVE,
    label: "EXPLOSIVE",
    description: "Energia pura, partículas, fumaça colorida, impacto visual.",
    gradient: "from-orange-600 via-red-600 to-yellow-500",
    promptModifier: "Explosive Energy",
    category: 'general'
  },
  {
    id: AdStyle.SURREAL,
    label: "SURREAL",
    description: "Sonhos impossíveis, gravidade zero, elementos flutuantes.",
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
    promptModifier: "Surreal Dreamscape",
    category: 'general'
  },
  {
    id: AdStyle.MINIMAL_POWER,
    label: "MINIMAL POWER",
    description: "Minimalismo agressivo, alto contraste, sombras duras.",
    gradient: "from-zinc-800 to-black",
    promptModifier: "Minimalist Power",
    category: 'general'
  },
  {
    id: AdStyle.NATURE_FORCE,
    label: "NATURE FORCE",
    description: "Elementos naturais selvagens, tempestade, força da terra.",
    gradient: "from-green-800 via-emerald-900 to-stone-900",
    promptModifier: "Force of Nature",
    category: 'general'
  },
  {
    id: AdStyle.AI_GLOW,
    label: "AI TECH",
    description: "Circuitos neurais, brilho azul tecnológico, inteligência.",
    gradient: "from-cyan-600 via-blue-700 to-indigo-900",
    promptModifier: "AI Tech Glow",
    category: 'general'
  },
  {
    id: AdStyle.RETRO_WAVE,
    label: "RETRO WAVE",
    description: "Estética anos 80, grades laser, sol neon, nostalgia.",
    gradient: "from-purple-600 via-pink-600 to-blue-600",
    promptModifier: "Retro Synthwave",
    category: 'general'
  },
  {
    id: AdStyle.ECO_ORGANIC,
    label: "ECO ORGANIC",
    description: "Sustentabilidade, texturas naturais, verde vivo, frescor.",
    gradient: "from-lime-500 via-green-600 to-emerald-800",
    promptModifier: "Eco Organic",
    category: 'general'
  },
  {
    id: AdStyle.INDUSTRIAL,
    label: "INDUSTRIAL",
    description: "Concreto, aço, texturas urbanas brutas, cinza metálico.",
    gradient: "from-gray-600 via-slate-700 to-zinc-900",
    promptModifier: "Urban Industrial",
    category: 'general'
  },
  {
    id: AdStyle.POP_ART,
    label: "POP ART",
    description: "Cores primárias vibrantes, estilo quadrinhos, pontos Ben-Day.",
    gradient: "from-yellow-400 via-red-500 to-blue-500",
    promptModifier: "Vibrant Pop Art",
    category: 'general'
  },
  {
    id: AdStyle.MONOCHROME,
    label: "MONOCHROME",
    description: "Preto e branco dramático, alta moda, sombras profundas.",
    gradient: "from-neutral-400 via-neutral-600 to-black",
    promptModifier: "High Fashion Mono",
    category: 'general'
  },
  {
    id: AdStyle.LIQUID_MOTION,
    label: "LIQUID MOTION",
    description: "Fluidos dinâmicos, splash, formas orgânicas em movimento.",
    gradient: "from-blue-400 via-indigo-500 to-purple-600",
    promptModifier: "Liquid Motion",
    category: 'general'
  },
  {
    id: AdStyle.HOLOGRAPHIC,
    label: "HOLOGRAPHIC",
    description: "Iridescência, reflexos arco-íris, estética futurista suave.",
    gradient: "from-cyan-200 via-pink-200 to-indigo-300",
    promptModifier: "Holographic Iridescence",
    category: 'general'
  },
  {
    id: AdStyle.COZY_HOME,
    label: "COZY HOME",
    description: "Ambiente acolhedor, luz quente, conforto, estilo de vida.",
    gradient: "from-orange-200 via-amber-300 to-orange-400",
    promptModifier: "Warm Lifestyle",
    category: 'general'
  },
  {
    id: AdStyle.GEOMETRIC_3D,
    label: "GEOMETRIC 3D",
    description: "Formas abstratas 3D, sombras suaves, composição moderna.",
    gradient: "from-slate-400 via-slate-500 to-slate-700",
    promptModifier: "Abstract 3D",
    category: 'general'
  },
  {
    id: AdStyle.ZEN_GARDEN,
    label: "ZEN GARDEN",
    description: "Equilíbrio, pedras, areia, bambu, paz e minimalismo.",
    gradient: "from-stone-200 via-stone-400 to-stone-600",
    promptModifier: "Zen Garden",
    category: 'general'
  },

  // Food Category
  {
    id: AdStyle.FOOD_GOURMET,
    label: "GOURMET DARK",
    description: "Alta gastronomia, fundo escuro, luz pontual luxuosa.",
    gradient: "from-stone-800 to-black",
    promptModifier: "Fine Dining",
    category: 'food'
  },
  {
    id: AdStyle.FOOD_STREET,
    label: "STREET MESSY",
    description: "Cores quentes, vapor, molhos brilhantes, apetitoso.",
    gradient: "from-orange-500 to-red-600",
    promptModifier: "Street Food",
    category: 'food'
  },
  {
    id: AdStyle.FOOD_FRESH,
    label: "ULTRA FRESH",
    description: "Mármore branco, luz natural, gotas de água, leveza.",
    gradient: "from-blue-100 to-white",
    promptModifier: "Healthy Fresh",
    category: 'food'
  },
  {
    id: AdStyle.FOOD_BBQ,
    label: "RUSTIC BBQ",
    description: "Fogo, fumaça, madeira, brasa, rústico e potente.",
    gradient: "from-red-800 to-orange-950",
    promptModifier: "Barbecue",
    category: 'food'
  },
  {
    id: AdStyle.FOOD_SWEET,
    label: "SWEET DREAM",
    description: "Caldas brilhantes, luz suave, cores doces, irresistível.",
    gradient: "from-pink-400 to-rose-700",
    promptModifier: "Dessert",
    category: 'food'
  },
  {
    id: AdStyle.FOOD_MOLECULAR,
    label: "MOLECULAR",
    description: "Gastronomia molecular, espumas, nitrogênio, futurista.",
    gradient: "from-cyan-400 via-blue-500 to-indigo-600",
    promptModifier: "Molecular Gastronomy",
    category: 'food'
  },
  {
    id: AdStyle.FOOD_RUSTIC,
    label: "RUSTIC WOOD",
    description: "Madeira bruta, luz de velas, rústico e acolhedor.",
    gradient: "from-amber-900 via-orange-950 to-black",
    promptModifier: "Rustic Wood",
    category: 'food'
  },
  {
    id: AdStyle.FOOD_NEON,
    label: "NEON DINER",
    description: "Estética de lanchonete americana, luzes neon, retrô.",
    gradient: "from-pink-600 via-purple-700 to-blue-800",
    promptModifier: "Neon Diner",
    category: 'food'
  },
  {
    id: AdStyle.FOOD_MINIMAL,
    label: "MINIMAL PLATE",
    description: "Prato minimalista, muito espaço negativo, chique.",
    gradient: "from-slate-100 to-white",
    promptModifier: "Minimalist Plating",
    category: 'food'
  },
  {
    id: AdStyle.FOOD_TROPICAL,
    label: "TROPICAL VIBE",
    description: "Frutas tropicais, luz solar intensa, cores vibrantes.",
    gradient: "from-yellow-400 via-orange-500 to-green-500",
    promptModifier: "Tropical Food",
    category: 'food'
  },
  {
    id: AdStyle.FOOD_VINTAGE,
    label: "VINTAGE KITCHEN",
    description: "Cozinha antiga, tons pastéis, nostalgia e sabor.",
    gradient: "from-teal-100 via-teal-200 to-teal-300",
    promptModifier: "Vintage Kitchen",
    category: 'food'
  },
  {
    id: AdStyle.FOOD_SPICY,
    label: "SPICY HEAT",
    description: "Pimentas, fogo, tons vermelhos intensos, picante.",
    gradient: "from-red-600 via-red-800 to-black",
    promptModifier: "Spicy Food",
    category: 'food'
  },
  {
    id: AdStyle.FOOD_FROZEN,
    label: "FROZEN ICE",
    description: "Bebidas geladas, cristais de gelo, frescor extremo.",
    gradient: "from-blue-200 via-cyan-300 to-blue-500",
    promptModifier: "Frozen Beverage",
    category: 'food'
  },

  // Beauty Category
  {
    id: AdStyle.BEAUTY_CRYSTAL,
    label: "CRYSTAL SPLASH",
    description: "Gotas de água, refração de luz, vidro límpido, frescor.",
    gradient: "from-blue-200 to-cyan-500",
    promptModifier: "Perfume Glass",
    category: 'beauty'
  },
  {
    id: AdStyle.BEAUTY_FLORAL,
    label: "FLORAL GARDEN",
    description: "Pétalas flutuando, luz de jardim, romântico e suave.",
    gradient: "from-rose-200 to-pink-400",
    promptModifier: "Floral Beauty",
    category: 'beauty'
  },
  {
    id: AdStyle.BEAUTY_GOLD,
    label: "GOLD ELEGANCE",
    description: "Pó de ouro, luxo extremo, seda negra, exclusivo.",
    gradient: "from-amber-600 to-neutral-900",
    promptModifier: "Golden Luxury",
    category: 'beauty'
  },
  {
    id: AdStyle.BEAUTY_GLOSSY,
    label: "GLOSSY PINK",
    description: "Super brilho, cores pop, estética moderna e jovem.",
    gradient: "from-fuchsia-500 to-pink-600",
    promptModifier: "High Gloss",
    category: 'beauty'
  },
  {
    id: AdStyle.BEAUTY_COSMIC,
    label: "COSMIC SPARKLE",
    description: "Galáxias, glitter intenso, estrelas, místico.",
    gradient: "from-purple-600 to-indigo-950",
    promptModifier: "Cosmic Glow",
    category: 'beauty'
  },
  {
    id: AdStyle.BEAUTY_MATTE,
    label: "MATTE PRO",
    description: "Estúdio limpo, textura de pó, sombras suaves, chique.",
    gradient: "from-orange-200 to-orange-300",
    promptModifier: "Matte Finish",
    category: 'beauty'
  },
  {
    id: AdStyle.BEAUTY_ZEN,
    label: "MINIMAL ZEN",
    description: "Equilíbrio, pedras, bambu, luz suave e natural.",
    gradient: "from-stone-100 via-stone-200 to-stone-300",
    promptModifier: "Zen Beauty",
    category: 'beauty'
  },
  {
    id: AdStyle.BEAUTY_VINTAGE,
    label: "VINTAGE PEARL",
    description: "Estética clássica, pérolas, tons de creme, elegância.",
    gradient: "from-orange-50 via-orange-100 to-orange-200",
    promptModifier: "Vintage Glamour",
    category: 'beauty'
  },
  {
    id: AdStyle.BEAUTY_VELVET,
    label: "NIGHT VELVET",
    description: "Veludo escuro, luz dramática, mistério e luxo.",
    gradient: "from-purple-900 via-indigo-950 to-black",
    promptModifier: "Velvet Luxury",
    category: 'beauty'
  },
  {
    id: AdStyle.BEAUTY_ORGANIC,
    label: "ORGANIC ESSENCE",
    description: "Ingredientes naturais, folhas verdes, pureza.",
    gradient: "from-green-100 via-green-200 to-green-300",
    promptModifier: "Organic Skincare",
    category: 'beauty'
  },
  {
    id: AdStyle.BEAUTY_PEARL,
    label: "PEARL LUX",
    description: "Brilho perolado, iridescência suave, luxo discreto.",
    gradient: "from-pink-50 via-pink-100 to-pink-200",
    promptModifier: "Pearlescent",
    category: 'beauty'
  },
  {
    id: AdStyle.BEAUTY_NEON,
    label: "NEON GLAM",
    description: "Maquiagem neon, luz negra, cores vibrantes e ousadas.",
    gradient: "from-fuchsia-600 via-purple-600 to-blue-600",
    promptModifier: "Neon Makeup",
    category: 'beauty'
  },
  {
    id: AdStyle.BEAUTY_DIAMOND,
    label: "DIAMOND SPARK",
    description: "Brilho de diamante, reflexos intensos, ostentação.",
    gradient: "from-slate-200 via-slate-300 to-white",
    promptModifier: "Diamond Shine",
    category: 'beauty'
  },
  {
    id: AdStyle.BEAUTY_SILK,
    label: "SILK FLOW",
    description: "Seda fluida, movimento suave, toque delicado.",
    gradient: "from-rose-100 via-rose-200 to-rose-300",
    promptModifier: "Silk Texture",
    category: 'beauty'
  }
];

export const UploadIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-12 w-12 ${className || ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);

export const SparklesIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className || ''}`} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
  </svg>
);

export const DownloadIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className || ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0l-4 4m4-4v12" transform="rotate(180 12 12)" />
  </svg>
);

export const RefreshIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className || ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);