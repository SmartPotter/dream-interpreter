import React, { useState } from 'react';
import { Moon, Sparkles, Send } from 'lucide-react';

interface DreamFormProps {
  onSubmit: (dream: string) => void;
  isLoading: boolean;
}

export default function DreamForm({ onSubmit, isLoading }: DreamFormProps) {
  const [dream, setDream] = useState('');
  const maxLength = 1000;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dream.trim() && dream.length >= 20) {
      onSubmit(dream.trim());
    }
  };

  const isValid = dream.trim().length >= 20 && dream.trim().length <= maxLength;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full mb-4">
          <Moon className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">
          Dream<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Lens</span>
        </h1>
        <p className="text-purple-200 text-lg">
          Unlock the mysteries of your subconscious mind
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl blur opacity-25"></div>
          <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <label htmlFor="dream" className="text-white font-medium mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Describe your dream
            </label>
            <textarea
              id="dream"
              value={dream}
              onChange={(e) => setDream(e.target.value)}
              placeholder="I was walking through a forest of glowing trees when suddenly..."
              className="w-full h-32 px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none transition-all duration-200"
              disabled={isLoading}
            />
            <div className="flex justify-between items-center mt-3 text-sm">
              <span className={`${
                dream.length < 20 ? 'text-red-300' : 
                dream.length > maxLength ? 'text-red-300' : 'text-green-300'
              }`}>
                {dream.length < 20 ? `${20 - dream.length} more characters needed` : 
                 dream.length > maxLength ? `${dream.length - maxLength} characters over limit` :
                 'Ready for interpretation'}
              </span>
              <span className="text-purple-300">
                {dream.length}/{maxLength}
              </span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={!isValid || isLoading}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed group"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              Interpreting your dream...
            </>
          ) : (
            <>
              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              Interpret Dream
            </>
          )}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-purple-300 text-sm">
          Your dreams are analyzed using advanced AI to reveal hidden meanings, 
          emotions, and symbolic interpretations.
        </p>
      </div>
    </div>
  );
}