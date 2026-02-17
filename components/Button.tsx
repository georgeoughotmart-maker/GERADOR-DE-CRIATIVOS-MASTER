import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'jewel';
  fullWidth?: boolean;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  isLoading = false,
  className = '',
  disabled,
  ...props 
}) => {
  const baseStyles = "relative font-display font-bold uppercase text-[9px] lg:text-[10px] tracking-[0.3em] py-5 px-10 transition-all duration-700 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 overflow-hidden rounded-sm border-2";
  
  const variants = {
    primary: "bg-black border-brand-primary/40 text-brand-primary shadow-[0_0_20px_rgba(255,215,0,0.1)] hover:border-brand-primary hover:shadow-[0_0_30px_rgba(255,215,0,0.3)]",
    secondary: "bg-white border-white text-black hover:bg-gray-100 shadow-xl",
    jewel: "bg-black border-white/20 text-white shadow-[0_0_40px_rgba(255,0,255,0.2)] hover:border-brand-secondary/60 hover:shadow-[0_0_50px_rgba(255,0,255,0.4)]",
    outline: "bg-transparent text-brand-primary border-brand-primary/30 hover:border-brand-primary hover:bg-brand-primary/5",
    ghost: "bg-white/5 text-gray-400 border-transparent hover:text-white hover:bg-white/10"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className} group`}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Background Glow dinâmico ao passar o mouse */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-info blur-xl" />
      
      {isLoading ? (
        <div className="relative z-10 flex flex-col items-center justify-center w-full">
          {/* Texto Pulsante Neon */}
          <span className="flex items-center gap-3 animate-pulse text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
            <span className="inline-block w-2 h-2 bg-brand-success rounded-full shadow-[0_0_12px_#00FF7F]" />
            SINTETIZANDO_CRIATIVO...
          </span>
          
          {/* Laser Scan Animation */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <div className="h-full w-[2px] bg-white shadow-[0_0_15px_#FFF,0_0_30px_#FFF] absolute left-0 animate-[laser-scan_1.5s_linear_infinite]" />
          </div>

          {/* Neural Activity Flicker - Barra de base */}
          <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/5 overflow-hidden">
             <div className="h-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-info w-full animate-[shimmer_2s_infinite]" />
          </div>
        </div>
      ) : (
        <>
          {/* Efeito de brilho ao passar o mouse (Static) */}
          <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <span className="relative z-10 flex items-center gap-2">{children}</span>
        </>
      )}

      <style>{`
        @keyframes laser-scan {
          0% { left: -5%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 105%; opacity: 0; }
        }
      `}</style>
    </button>
  );
};

export default Button;