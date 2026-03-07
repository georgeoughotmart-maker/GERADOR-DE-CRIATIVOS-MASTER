import React, { useState, useMemo, useEffect } from 'react';
import { STYLES, SparklesIcon, DownloadIcon, RefreshIcon } from './constants';
import { AdStyle, AdCopy, Category, LogoPosition, AdParameters } from './types';
import Button from './components/Button';
import StyleCard from './components/StyleCard';
import UploadZone from './components/UploadZone';
import TextOptions from './components/TextOptions';
import { generateAdCreative, generateAdCopy } from './services/geminiService';

declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('general');
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [logoPosition, setLogoPosition] = useState<LogoPosition>(LogoPosition.TOP_RIGHT);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedCopy, setGeneratedCopy] = useState<AdCopy | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<AdStyle>(AdStyle.CYBERPUNK);
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState<string>('');
  const [error, setError] = useState<React.ReactNode | null>(null);
  const [customPrompt] = useState('');
  const [overlayText, setOverlayText] = useState('');
  // const [isUsingPersonalKey, setIsUsingPersonalKey] = useState<boolean>(false);

  const filteredStyles = useMemo(() => {
    return STYLES.filter(s => s.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    // Lógica de verificação de chave removida para simplificar a experiência do usuário
  }, []);

  const handleGenerate = async () => {
    if (!originalImage) return;
    
    // Verificação de chave de API removida para permitir uso ilimitado via fallback
    /*
    const aiStudio = (window as any).aistudio;
    if (aiStudio) {
      try {
        const hasKey = await aiStudio.hasSelectedApiKey();
        if (!hasKey && !process.env.API_KEY) {
          setError("Por favor, conecte sua chave de API no topo da tela para gerar criativos.");
          setIsUsingPersonalKey(false);
          return;
        }
      } catch (e) {
        console.warn("[AI Studio] Erro ao verificar chave em tempo real:", e);
      }
    } else if (!process.env.API_KEY) {
      setError("O sistema de chaves da Google ainda não carregou. Por favor, aguarde e tente novamente.");
      return;
    }
    */

    setIsGenerating(true);
    setStatus('PREPARANDO AMBIENTE...');
    
    // Pequeno delay para garantir que a chave de API está pronta
    await new Promise(resolve => setTimeout(resolve, 1000));

    setGeneratedImage(null);
    setGeneratedCopy(null);
    setError(null);

    try {
      if (!originalImage.startsWith('data:image')) {
        throw new Error("A imagem do produto parece estar corrompida. Por favor, tente enviar novamente.");
      }
      const params: AdParameters = { 
        overlayText,
        lightingIntensity: 85,
        backgroundComplexity: 75,
        colorPalette: ''
      };
      
      // Tentativa de geração de imagem
      let imageResult = "";
      try {
        imageResult = await generateAdCreative(
          originalImage, 
          selectedStyle, 
          customPrompt, 
          logoImage || undefined, 
          logoPosition, 
          params,
          (newStatus) => setStatus(newStatus)
        );
        setGeneratedImage(imageResult);
        setStatus('GERANDO COPY PUBLICITÁRIO...');
      } catch (imgErr: any) {
        console.error("Erro na imagem:", imgErr);
        throw new Error(`ERRO NA IMAGEM: ${imgErr.message}`);
      }

      // Tentativa de geração de copy
      try {
        const copyResult = await generateAdCopy(originalImage, selectedStyle, customPrompt);
        setGeneratedCopy(copyResult);
      } catch (copyErr: any) {
        console.error("Erro no copy:", copyErr);
        // Se falhar o copy, não travamos a experiência, apenas mostramos um aviso no console
      }

      setIsGenerating(false);
      setStatus('');
    } catch (err: any) {
      console.error("Erro global na geração:", err);
      const errorMsg = err.message || "";
      
      // Se for erro de cota, tentamos novamente automaticamente após um delay sem mostrar o erro "ALTA DEMANDA"
      if (errorMsg.includes("429") || errorMsg.includes("quota") || errorMsg.includes("RESOURCE_EXHAUSTED")) {
        setStatus('SISTEMA OCUPADO... REFILANDO...');
        await new Promise(resolve => setTimeout(resolve, 5000));
        return handleGenerate();
      }

      if (errorMsg.includes("Requested entity was not found") || errorMsg.includes("API_KEY_INVALID") || errorMsg.includes("403")) {
        setError(
          <div className="space-y-4">
            <p className="font-black text-brand-danger">❌ ERRO DE CONEXÃO</p>
            <p className="text-sm text-gray-300 leading-relaxed">
              Ocorreu um erro ao processar sua solicitação. O sistema tentará novamente de forma automática.
            </p>
          </div>
        );
        // Tenta novamente após um tempo
        setTimeout(() => handleGenerate(), 10000);
      } else {
        setError(`ERRO NA GERAÇÃO: ${errorMsg || "Verifique sua conexão e tente novamente."}`);
      }
      setIsGenerating(false);
      setStatus('');
    }
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `ADRENALINE_CRIATIVO_${Date.now()}.jpg`;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col selection:bg-brand-primary/30">
      <header className="min-h-[6rem] lg:h-24 px-4 lg:px-12 py-4 lg:py-0 flex flex-col lg:flex-row items-center justify-between border-b-2 border-white/10 backdrop-blur-3xl sticky top-0 z-[100] bg-black/60 shadow-[0_4px_30px_rgba(0,0,0,0.5)] gap-4 lg:gap-0">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-16 w-full lg:w-auto">
          <div className="flex flex-col group cursor-default text-center lg:text-left">
            <h1 className="font-display font-black text-2xl lg:text-3xl tracking-[0.2em] leading-none">
              AD<span className="gradient-text-neon">RENALINE</span>
            </h1>
            <span className="text-[8px] lg:text-[9px] font-mono tracking-[0.4em] text-gray-400 mt-2 uppercase font-bold">Estúdio Criativo de Elite</span>
          </div>
          
          <nav className="flex items-center gap-1.5 p-1 bg-white/5 rounded-full border border-white/10 overflow-x-auto no-scrollbar max-w-full lg:max-w-none px-2 lg:px-1.5">
            {[
              { id: 'general', label: 'MODERNO' },
              { id: 'food', label: 'GASTRONOMIA' },
              { id: 'beauty', label: 'BELEZA' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as Category)}
                className={`whitespace-nowrap px-6 lg:px-10 py-2.5 rounded-full text-[10px] lg:text-[11px] font-black tracking-widest transition-all duration-500 relative ${activeCategory === cat.id ? `bg-white/15 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] border border-white/20` : 'text-gray-500 hover:text-gray-300'}`}
              >
                {cat.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-8">
          {/* Botão de chave removido para simplificar a interface conforme solicitado */}
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row p-4 lg:p-12 gap-8 lg:gap-12 max-w-[1920px] mx-auto w-full relative z-10">
        <aside className="w-full lg:w-[440px] space-y-10 flex-shrink-0 z-20 bg-white/[0.02] p-4 rounded-2xl border border-white/5">
          <section className="space-y-8">
            <header className="flex items-center gap-4">
              <span className="font-mono text-xs text-brand-info font-black px-2 py-1 bg-brand-info/10 border border-brand-info/30">01</span>
              <h2 className="text-xs font-black tracking-[0.3em] uppercase text-white">RECURSOS VISUAIS</h2>
              <div className="h-[2px] flex-1 bg-gradient-to-r from-brand-info/50 to-transparent" />
            </header>
            
            <div className="flex flex-col gap-8">
              <div className="relative">
                <div className="absolute -top-3 left-4 px-2 bg-brand-dark text-[9px] font-black text-brand-info tracking-widest z-10 uppercase">Foto do Produto</div>
                <div className="neon-border-blue rounded-xl p-1 bg-black/40 overflow-hidden">
                  <UploadZone 
                    onImageSelected={setOriginalImage} 
                    currentImage={originalImage} 
                    label="SUBMETER FOTO DO PRODUTO"
                  />
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -top-3 left-4 px-2 bg-brand-dark text-[9px] font-black text-brand-secondary tracking-widest z-10 uppercase">Logo da Marca</div>
                <div className="glass-card p-4 lg:p-6 rounded-xl space-y-5 neon-border-purple bg-black/60">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest opacity-50">Configurações de Logo</span>
                    {logoImage && <button onClick={() => setLogoImage(null)} className="text-[10px] text-brand-danger font-black uppercase tracking-widest hover:brightness-150 transition-all underline underline-offset-4">Remover</button>}
                  </div>
                  <UploadZone onImageSelected={setLogoImage} currentImage={logoImage} variant="compact" />
                  
                  {logoImage && (
                    <div className="space-y-3 pt-2">
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">Posição da Logo</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: LogoPosition.TOP_LEFT, label: 'Sup. Esq.' },
                          { id: LogoPosition.TOP_RIGHT, label: 'Sup. Dir.' },
                          { id: LogoPosition.CENTER, label: 'Centro' },
                          { id: LogoPosition.BOTTOM_LEFT, label: 'Inf. Esq.' },
                          { id: LogoPosition.BOTTOM_RIGHT, label: 'Inf. Dir.' },
                        ].map((pos) => (
                          <button
                            key={pos.id}
                            onClick={() => setLogoPosition(pos.id)}
                            className={`py-2 rounded text-[9px] font-black transition-all border ${
                              logoPosition === pos.id 
                                ? 'bg-brand-secondary/20 border-brand-secondary text-brand-secondary shadow-[0_0_10px_rgba(168,85,247,0.2)]' 
                                : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/20'
                            }`}
                          >
                            {pos.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="glass-card p-4 lg:p-6 rounded-xl neon-border-blue bg-black/60 space-y-4">
                 <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest block">Texto no Design</label>
                 <input 
                  type="text"
                  placeholder="EX: 50% OFF, NOVOS SABORES..."
                  value={overlayText}
                  onChange={(e) => setOverlayText(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[11px] text-brand-info placeholder-gray-700 outline-none focus:border-brand-info/50 focus:bg-white/10 transition-all font-mono font-bold"
                 />
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <header className="flex items-center gap-4">
              <span className="font-mono text-xs text-brand-success font-black px-2 py-1 bg-brand-success/10 border border-brand-success/30">02</span>
              <h2 className="text-xs font-black tracking-[0.3em] uppercase text-white">DIREÇÃO ARTÍSTICA</h2>
              <div className="h-[2px] flex-1 bg-gradient-to-r from-brand-success/50 to-transparent" />
            </header>
            <div className="grid grid-cols-2 gap-4 max-h-[500px] lg:max-h-[800px] overflow-y-auto custom-scrollbar pr-2 p-1">
              {filteredStyles.map((style) => (
                <StyleCard 
                  key={style.id}
                  styleConfig={style}
                  isSelected={selectedStyle === style.id}
                  onSelect={() => setSelectedStyle(style.id)}
                />
              ))}
            </div>
          </section>

          <div className="sticky bottom-6 lg:bottom-10 z-20">
            <Button 
              onClick={handleGenerate} 
              fullWidth 
              variant="jewel"
              disabled={!originalImage || isGenerating}
              isLoading={isGenerating}
              className="shadow-[0_0_40px_rgba(255,0,255,0.3)] h-16 lg:h-20 text-[12px] lg:text-[13px] border-2 border-white/20"
            >
              {!isGenerating && <><SparklesIcon /> RENDERIZAR CRIATIVO MESTRE</>}
            </Button>
          </div>
        </aside>

        <section className="flex-1 flex flex-col gap-8 lg:gap-10 min-w-0">
          <div className="flex-1 flex flex-col glass-card rounded-2xl overflow-hidden relative group neon-border-blue bg-black/40">
            <div className="h-auto lg:h-16 border-b-2 border-white/10 flex flex-col lg:flex-row items-center justify-between px-6 lg:px-10 py-4 lg:py-0 bg-black/60 backdrop-blur-md gap-4 lg:gap-0">
              <div className="flex gap-6 lg:gap-10 items-center">
                 <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-success shadow-[0_0_15px_#00FF7F]" />
                    <span className="text-[9px] lg:text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">SISTEMA_ATIVO</span>
                 </div>
                 <span className="text-[9px] lg:text-[10px] font-black text-brand-info uppercase tracking-[0.2em]">SAÍDA_4K_ULTRA</span>
              </div>
              {generatedImage && (
                <div className="flex gap-4 lg:gap-10 w-full lg:w-auto justify-center">
                   <button onClick={handleGenerate} className="text-[9px] lg:text-[10px] font-black text-gray-400 hover:text-white transition-colors flex items-center gap-2 lg:gap-3 uppercase tracking-widest group"><RefreshIcon className="group-hover:rotate-180 transition-transform duration-700" /> Refazer</button>
                   <button onClick={handleDownload} className="text-[10px] lg:text-[11px] font-black text-brand-primary flex items-center gap-2 lg:gap-3 uppercase tracking-widest hover:scale-105 transition-transform bg-brand-primary/10 px-4 lg:px-6 py-1.5 lg:py-2 rounded border border-brand-primary/30"><DownloadIcon /> Exportar</button>
                </div>
              )}
            </div>

            <div className="flex-1 flex items-center justify-center p-4 lg:p-12 bg-brand-dark relative overflow-hidden min-h-[400px]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] lg:w-[1200px] h-[600px] lg:h-[1200px] bg-brand-accent/5 rounded-full blur-[100px] lg:blur-[200px] pointer-events-none animate-pulse-slow" />

              {generatedImage ? (
                <div className="relative group/render animate-in fade-in zoom-in duration-1000 ease-out p-1 bg-gradient-to-br from-brand-primary/30 via-brand-secondary/30 to-brand-info/30 rounded-lg shadow-[0_0_100px_rgba(0,0,0,0.8)]">
                  <img src={generatedImage} alt="Criativo Renderizado" className="max-w-full max-h-[50vh] lg:max-h-[72vh] object-contain shadow-2xl rounded-sm border-2 border-white/20" />
                </div>
              ) : originalImage ? (
                <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center animate-in fade-in duration-700">
                  <div className="relative p-1 bg-gradient-to-br from-white/10 to-white/5 rounded-lg border-2 border-white/10">
                    <img src={originalImage} alt="Esboço" className="max-w-full max-h-[40vh] lg:max-h-[60vh] object-contain opacity-20 grayscale filter blur-[4px] scale-95" />
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-8 lg:y-12 relative z-10 p-6">
                   <div className="w-24 lg:w-32 h-24 lg:h-32 mx-auto border-4 border-white/5 rotate-45 flex items-center justify-center relative">
                      <div className="absolute inset-0 border-2 border-brand-primary/20 -rotate-12 animate-pulse-slow" />
                      <div className="w-12 lg:w-16 h-12 lg:h-16 border-2 border-white/20 rotate-45 flex items-center justify-center">
                        <span className="text-2xl lg:text-4xl rotate-[-90deg] opacity-20 gradient-text-neon font-black">✦</span>
                      </div>
                   </div>
                   <h3 className="text-base lg:text-lg font-display font-black tracking-[0.4em] uppercase text-white/40">Ambiente de Síntese Vazio</h3>
                </div>
              )}

              {error && (
                <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[210] bg-brand-dark/95 border border-white/10 backdrop-blur-3xl p-8 rounded-2xl animate-in slide-in-from-top duration-500 max-w-md w-full shadow-[0_0_50px_rgba(0,0,0,0.8)] pointer-events-auto ring-1 ring-white/20">
                  <div className="flex flex-col gap-6">
                    <div className="text-[11px] font-black text-white uppercase tracking-[0.1em] flex items-start gap-4 leading-relaxed">
                      <span className="w-3 h-3 bg-brand-primary rounded-full animate-pulse mt-1 flex-shrink-0 shadow-[0_0_10px_#FF00FF]" />
                      <div className="flex-1">
                        {error}
                      </div>
                    </div>
                    
                    {/* Botão de fechar/tentar novamente genérico se não for o erro de cota (que já tem botões próprios) */}
                    {typeof error === 'string' && (
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setError(null);
                        }}
                        className="w-full py-4 bg-white/5 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white/10 active:scale-[0.98] transition-all border border-white/10 cursor-pointer relative z-[220]"
                      >
                        FECHAR AVISO
                      </button>
                    )}
                  </div>
                </div>
              )}

              {isGenerating && (
                <div className="absolute inset-0 bg-brand-dark/98 backdrop-blur-2xl z-[200] flex flex-col items-center justify-center animate-in fade-in duration-500 text-center">
                  <div className="w-48 lg:w-64 h-[2px] bg-white/10 mb-16 overflow-hidden relative">
                     <div className="absolute inset-0 bg-brand-primary animate-shimmer" style={{ width: '40%' }} />
                  </div>
                  <p className="font-display text-3xl lg:text-5xl font-black tracking-[0.4em] gradient-text-neon animate-pulse">{status || 'SINTETIZANDO'}</p>
                  <p className="font-mono text-[9px] text-gray-400 mt-10 tracking-[0.4em] uppercase font-bold px-12">O estúdio está processando seu design de forma ilimitada. Em momentos de alta demanda, o sistema persistirá até obter o resultado. Por favor, aguarde.</p>
                  
                  <button 
                    onClick={() => {
                      setIsGenerating(false);
                      setStatus('');
                      setError(null);
                    }}
                    className="mt-12 text-[10px] font-black text-gray-500 hover:text-brand-danger transition-colors uppercase tracking-[0.3em] border border-white/10 px-6 py-2 rounded-full hover:bg-brand-danger/10"
                  >
                    Cancelar e Voltar
                  </button>
                </div>
              )}
            </div>
          </div>

          {generatedCopy && <TextOptions copy={generatedCopy} isLoading={isGenerating} />}
        </section>
      </main>

      <footer className="h-auto lg:h-40 border-t-2 border-white/10 mt-16 flex flex-col lg:flex-row items-center justify-between px-16 py-8 bg-black/40 gap-8">
        <div className="flex flex-col gap-3 text-center lg:text-left">
           <div className="flex flex-col lg:flex-row items-center gap-6">
              <h4 className="font-display font-black text-xl tracking-tighter text-white">AD<span className="text-brand-primary">RENALINE</span></h4>
              <span className="hidden lg:block w-px h-6 bg-white/10" />
              <span className="font-mono text-[10px] text-gray-600 tracking-[0.4em]">v5.3_PRO_OPEN // © 2025</span>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default App;