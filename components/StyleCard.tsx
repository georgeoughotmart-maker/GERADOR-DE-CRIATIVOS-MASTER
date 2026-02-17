import React from 'react';
import { StyleConfig } from '../types';

interface StyleCardProps {
  styleConfig: StyleConfig;
  isSelected: boolean;
  onSelect: () => void;
}

const StyleCard: React.FC<StyleCardProps> = ({ styleConfig, isSelected, onSelect }) => {
  // Cores dinâmicas baseadas na categoria para garantir visibilidade
  const getStyleAccent = () => {
    switch(styleConfig.category) {
      case 'food': return 'border-brand-primary text-brand-primary shadow-[0_0_20px_rgba(255,215,0,0.3)] bg-brand-primary/10';
      case 'beauty': return 'border-brand-secondary text-brand-secondary shadow-[0_0_20px_rgba(255,0,255,0.3)] bg-brand-secondary/10';
      default: return 'border-brand-info text-brand-info shadow-[0_0_20px_rgba(0,191,255,0.3)] bg-brand-info/10';
    }
  };

  const getStyleGradient = () => {
     switch(styleConfig.category) {
      case 'food': return 'from-brand-primary/40 to-black';
      case 'beauty': return 'from-brand-secondary/40 to-black';
      default: return 'from-brand-info/40 to-black';
    }
  }

  return (
    <div 
      onClick={onSelect}
      className={`
        relative overflow-hidden cursor-pointer group aspect-[4/5] transition-all duration-500 rounded-xl border-2
        ${isSelected 
          ? `scale-[1.04] z-10 ${getStyleAccent()} opacity-100` 
          : 'border-white/10 bg-white/5 opacity-50 hover:opacity-100 hover:border-white/30 hover:scale-[1.02]'
        }
      `}
    >
      {/* Background Vibrante Dinâmico */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getStyleGradient()} opacity-20 transition-transform duration-1000 group-hover:scale-125`} />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />
      
      {/* Informação Técnica */}
      <div className="absolute inset-0 p-5 flex flex-col justify-end">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h3 className={`font-display font-black text-[11px] tracking-[0.1em] uppercase transition-all duration-500 ${isSelected ? 'text-white' : 'text-gray-400'}`}>
              {styleConfig.label}
            </h3>
            {isSelected && (
              <div className="w-2 h-2 rounded-full animate-pulse shadow-[0_0_15px_currentColor] bg-current" />
            )}
          </div>
          <p className="text-[9px] text-gray-500 leading-tight uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
            {styleConfig.description}
          </p>
        </div>
      </div>

      {/* Shine Effect ao selecionar */}
      {isSelected && (
         <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 blur-3xl rounded-full -mr-10 -mt-10 animate-pulse" />
      )}
    </div>
  );
};

export default StyleCard;