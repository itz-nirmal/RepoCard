import React from 'react';
import { Sparkles } from 'lucide-react';

interface InputCardProps {
  url: string;
  onUrlChange: (url: string) => void;
  onGenerate: () => void;
  buttonState: 'initial' | 'generating' | 'generated';
}

const InputCard: React.FC<InputCardProps> = ({ url, onUrlChange, onGenerate, buttonState }) => {
  const getButtonText = () => {
    switch (buttonState) {
      case 'generating':
        return 'Generating Card...';
      case 'generated':
        return 'Card Generated';
      default:
        return 'Generate Card';
    }
  };

  const getButtonClass = () => {
    const baseClass = "w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900";
    
    switch (buttonState) {
      case 'generating':
        return `${baseClass} bg-gradient-to-r from-yellow-500 to-orange-500 text-white cursor-not-allowed`;
      case 'generated':
        return `${baseClass} bg-gradient-to-r from-green-500 to-emerald-500 text-white cursor-not-allowed`;
      default:
        return `${baseClass} bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700`;
    }
  };

  return (
    <div className="relative max-w-2xl w-full">
      {/* Glassmorphism Card */}
      <div className="relative">
        {/* Neon glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-20 blur-sm animate-pulse"></div>
        
        {/* Main card */}
        <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
          <div className="space-y-6">
            {/* Input field */}
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-30 blur-sm animate-pulse"></div>
              <input
                type="url"
                value={url}
                onChange={(e) => onUrlChange(e.target.value)}
                placeholder="https://github.com/username/repository"
                className="relative w-full py-4 px-6 bg-gray-900/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                disabled={buttonState === 'generating'}
              />
            </div>

            {/* Generate button */}
            <button
              onClick={onGenerate}
              disabled={!url.trim() || buttonState === 'generating' || buttonState === 'generated'}
              className={getButtonClass()}
            >
              <div className="flex items-center justify-center gap-2">
                {buttonState === 'generating' && (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                )}
                {buttonState === 'generated' && <Sparkles className="w-5 h-5" />}
                {getButtonText()}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputCard;