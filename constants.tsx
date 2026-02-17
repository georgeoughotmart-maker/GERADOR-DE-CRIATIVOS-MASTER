import React from 'react';
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
  }
];

export const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);

export const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
  </svg>
);

export const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0l-4 4m4-4v12" transform="rotate(180 12 12)" />
  </svg>
);

export const RefreshIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);