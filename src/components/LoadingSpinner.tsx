import React from 'react';
import { Moon, Star, Sparkles } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6">
      <div className="relative">
        {/* Animated background circles */}
        <div className="absolute inset-0 animate-ping">
          <div className="w-24 h-24 bg-purple-500/20 rounded-full"></div>
        </div>
        <div className="absolute inset-2 animate-pulse delay-100">
          <div className="w-20 h-20 bg-blue-500/20 rounded-full"></div>
        </div>
        
        {/* Central moon icon */}
        <div className="relative w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
          <Moon className="w-10 h-10 text-white animate-pulse" />
        </div>

        {/* Floating stars */}
        <div className="absolute -top-2 -right-2 animate-bounce delay-300">
          <Star className="w-4 h-4 text-yellow-300" />
        </div>
        <div className="absolute -bottom-2 -left-2 animate-bounce delay-500">
          <Sparkles className="w-4 h-4 text-purple-300" />
        </div>
        <div className="absolute top-2 -left-4 animate-bounce delay-700">
          <Star className="w-3 h-3 text-blue-300" />
        </div>
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-white">Analyzing Your Dream</h3>
        <p className="text-purple-200">AI is exploring the depths of your subconscious...</p>
        
        {/* Loading progress dots */}
        <div className="flex justify-center space-x-1 pt-4">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-100"></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-200"></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-300"></div>
        </div>
      </div>
    </div>
  );
}