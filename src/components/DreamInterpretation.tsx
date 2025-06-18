import React from 'react';
import { Brain, Heart, Lightbulb, Sparkles, Star } from 'lucide-react';
import { DreamInterpretation as DreamInterpretationType } from '../types/dream';

interface DreamInterpretationProps {
  dreamDescription: string;
  interpretation: DreamInterpretationType;
}

export const DreamInterpretation: React.FC<DreamInterpretationProps> = ({
  dreamDescription,
  interpretation
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Dream Description */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Sparkles className="text-purple-600" size={24} />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Your Dream</h3>
        </div>
        <p className="text-gray-700 leading-relaxed text-lg italic">
          "{dreamDescription}"
        </p>
      </div>

      {/* Symbols */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-100">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Brain className="text-blue-600" size={24} />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Key Symbols</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {interpretation.symbols.map((symbol, index) => (
            <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
              <h4 className="font-semibold text-blue-800 mb-2">{symbol.symbol}</h4>
              <p className="text-gray-700 text-sm leading-relaxed">{symbol.meaning}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Emotions and Themes */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Emotions */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-100">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-pink-100 rounded-lg">
              <Heart className="text-pink-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Emotions</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {interpretation.emotions.map((emotion, index) => (
              <span
                key={index}
                className="px-3 py-2 bg-gradient-to-r from-pink-100 to-purple-100 text-pink-800 rounded-full text-sm font-medium border border-pink-200"
              >
                {emotion}
              </span>
            ))}
          </div>
        </div>

        {/* Themes */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-100">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-green-100 rounded-lg">
              <Lightbulb className="text-green-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Themes</h3>
          </div>
          <div className="space-y-2">
            {interpretation.themes.map((theme, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700 capitalize">{theme}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Interpretation */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-purple-100">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Brain className="text-indigo-600" size={24} />
          </div>
          <h3 className="text-2xl font-semibold text-gray-800">Dream Interpretation</h3>
        </div>
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
            {interpretation.interpretation}
          </p>
        </div>
      </div>

      {/* Positive Takeaway */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 shadow-xl text-white">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-white/20 rounded-lg">
            <Star className="text-white" size={24} />
          </div>
          <h3 className="text-2xl font-semibold">Positive Reflection</h3>
        </div>
        <p className="text-lg leading-relaxed opacity-95 whitespace-pre-line">
          {interpretation.takeaway}
        </p>
        <div className="mt-6 p-4 bg-white/10 rounded-xl">
          <p className="text-sm opacity-90">
            💫 Remember: You are the ultimate interpreter of your dreams. Use this analysis as a starting point for your own reflection and self-discovery journey.
          </p>
        </div>
      </div>
    </div>
  );
};