import React, { useRef, useState } from 'react';
import { UploadIcon } from '../constants';

interface UploadZoneProps {
  onImageSelected: (base64: string) => void;
  currentImage: string | null;
  variant?: 'default' | 'compact';
  label?: string;
}

const UploadZone: React.FC<UploadZoneProps> = ({ 
  onImageSelected, 
  currentImage, 
  variant = 'default',
  label = "SUBMETER ATIVO MASTER"
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) processFile(file);
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('ERRO: FORMATO INVÁLIDO. Por favor, utilize apenas arquivos de imagem.');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      onImageSelected(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const isCompact = variant === 'compact';
  const heightClass = isCompact ? 'h-36' : 'h-[440px]';

  return (
    <div 
      className={`
        relative w-full ${heightClass} border-4 border-dashed rounded-xl transition-all duration-700 flex flex-col items-center justify-center overflow-hidden cursor-pointer
        ${isDragging 
          ? 'border-brand-primary bg-brand-primary/20 scale-[1.01] shadow-[0_0_40px_rgba(255,215,0,0.2)]' 
          : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
        }
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />

      {currentImage ? (
        <div className="relative w-full h-full group/preview">
          <img 
            src={currentImage} 
            alt="Ativo de Marca" 
            className="w-full h-full object-contain p-6 transition-all duration-1000 group-hover/preview:scale-[1.05]" 
          />
          <div className="absolute inset-0 bg-black/90 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-md">
            <div className="p-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-info rounded-lg">
               <div className="bg-black px-10 py-4 rounded-md">
                 <p className="font-display font-black text-white tracking-[0.4em] text-[12px] uppercase">Alterar Recurso</p>
               </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={`text-center transition-all duration-700 ${isCompact ? 'p-2' : 'p-12'}`}>
          <div className={`mx-auto mb-6 transition-all duration-700 ${isDragging ? 'text-brand-primary scale-125' : 'text-white/20'} ${isCompact ? 'scale-75' : ''}`}>
            {isCompact ? (
               <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
               </svg>
            ) : <UploadIcon />}
          </div>
          <h3 className={`${isCompact ? 'text-[10px]' : 'text-[14px]'} font-display font-black text-white mb-3 tracking-[0.3em] uppercase drop-shadow-lg`}>
            {label}
          </h3>
          {!isCompact && (
            <p className="text-gray-500 text-[10px] font-mono tracking-[0.4em] uppercase font-bold bg-white/5 py-2 px-6 rounded-full border border-white/10">
              Drag & Drop Digital Master
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadZone;