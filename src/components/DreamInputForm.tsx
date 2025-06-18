import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

interface DreamInputFormProps {
  onSubmit: (dreamDescription: string) => void;
  isLoading: boolean;
}

export const DreamInputForm: React.FC<DreamInputFormProps> = ({ onSubmit, isLoading }) => {
  const [dreamText, setDreamText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dreamText.trim() && !isLoading) {
      onSubmit(dreamText.trim());
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <textarea
            value={dreamText}
            onChange={(e) => setDreamText(e.target.value)}
            placeholder="Describe your dream in detail... What did you see, feel, or experience? The more details you provide, the more insightful the interpretation will be."
            className="w-full min-h-[200px] p-6 bg-white/95 backdrop-blur-sm border border-purple-200 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-gray-800 placeholder-gray-500 text-lg leading-relaxed transition-all duration-200"
            disabled={isLoading}
          />
          <div className="absolute top-4 right-4 text-purple-400">
            <Sparkles size={24} />
          </div>
        </div>
        
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={!dreamText.trim() || isLoading}
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
          >
            <div className="flex items-center space-x-3">
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Interpreting Dream...</span>
                </>
              ) : (
                <>
                  <Send size={20} />
                  <span>Interpret My Dream</span>
                </>
              )}
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};