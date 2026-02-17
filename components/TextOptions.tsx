import React, { useState } from 'react';
import { AdCopy } from '../types';

interface CopyItemProps {
  text: string;
  idx: number;
  color: string;
  label: string;
  neonBorder: string;
}

const CopyItem: React.FC<CopyItemProps> = ({ text, idx, color, label, neonBorder }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className={`group bg-black/80 border-2 ${neonBorder} p-8 cursor-pointer transition-all duration-500 hover:bg-white/5 rounded-xl shadow-[0_5px_20px_rgba(0,0,0,0.4)]`}
      onClick={handleCopy}
    >
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
           <span className={`text-[10px] font-mono font-black ${color} uppercase tracking-[0.4em] py-1 px-3 bg-white/5 rounded-md border border-white/10`}>
             {label} #{String(idx + 1).padStart(2, '0')}
           </span>
           {copied ? (
             <span className="text-[10px] font-black text-brand-success uppercase tracking-widest animate-pulse drop-shadow-[0_0_10px_#00FF7F]">Copiado para o Clipboard</span>
           ) : (
             <span className="text-gray-600 group-hover:text-white transition-all text-sm">📋</span>
           )}
        </div>
        <p className="text-[14px] text-gray-200 leading-relaxed tracking-wide group-hover:text-white transition-colors uppercase font-black italic">
          "{text}"
        </p>
      </div>
    </div>
  );
};

interface TextOptionsProps {
  copy: AdCopy;
  isLoading: boolean;
}

const TextOptions: React.FC<TextOptionsProps> = ({ copy, isLoading }) => {
  // Safe check for titles and descriptions using optional chaining and default values
  const titles = copy?.titles || [];
  const descriptions = copy?.descriptions || [];

  if (isLoading || (titles.length === 0 && descriptions.length === 0)) return null;

  return (
    <div className="space-y-16 py-16 animate-in slide-in-from-bottom-12 duration-1000 bg-white/5 p-12 rounded-3xl border-2 border-white/5">
      <div className="flex items-center gap-10">
        <h2 className="text-[14px] font-display font-black tracking-[0.6em] uppercase text-white drop-shadow-lg">RELATÓRIO DE SÍNTESE TEXTUAL</h2>
        <div className="h-[2px] flex-1 bg-gradient-to-r from-white/20 to-transparent" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        <div className="space-y-10">
           <div className="flex items-center gap-6">
              <div className="w-3 h-3 bg-brand-primary rounded-full shadow-[0_0_20px_#FFD700]" />
              <h3 className="text-[12px] font-display font-black text-brand-primary uppercase tracking-[0.5em]">Headlines de Alta Impacto</h3>
           </div>
           <div className="grid gap-6">
              {titles.map((t, i) => (
                <CopyItem key={`title-${i}`} text={t} idx={i} color="text-brand-primary" label="TITULO" neonBorder="border-brand-primary/20 hover:border-brand-primary/50" />
              ))}
           </div>
        </div>

        <div className="space-y-10">
           <div className="flex items-center gap-6">
              <div className="w-3 h-3 bg-brand-info rounded-full shadow-[0_0_20px_#00BFFF]" />
              <h3 className="text-[12px] font-display font-black text-brand-info uppercase tracking-[0.5em]">Descrições de Elite</h3>
           </div>
           <div className="grid gap-6">
              {descriptions.map((d, i) => (
                <CopyItem key={`desc-${i}`} text={d} idx={i} color="text-brand-info" label="COPY" neonBorder="border-brand-info/20 hover:border-brand-info/50" />
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default TextOptions;