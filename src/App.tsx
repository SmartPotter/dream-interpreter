import React, { useState } from 'react';
import { Moon, Settings, icons, Heart } from 'lucide-react';
import { DreamInputForm } from './components/DreamInputForm';
import { DreamInterpretation } from './components/DreamInterpretation.tsx';
import { ApiSettings } from './components/ApiSettings';
import { DreamInterpreterAPI } from './utils/dreamApi.ts';
import { DreamInterpretation as DreamInterpretationType } from './types/dream.ts';

const GithubIcon = icons.Github;
function App() {
  const [currentDream, setCurrentDream] = useState<string>('');
  const [interpretation, setInterpretation] = useState<DreamInterpretationType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [apiEndpoint, setApiEndpoint] = useState('https://api-inference.huggingface.co/models/microsoft/DialoGPT-large');
  const [error, setError] = useState<string>('');

  const dreamAPI = new DreamInterpreterAPI(apiKey, apiEndpoint);

  const handleDreamSubmit = async (dreamDescription: string) => {
    setIsLoading(true);
    setError('');
    setCurrentDream(dreamDescription);
    setInterpretation(null);

    try {
      const result = await dreamAPI.interpretDream({ dreamDescription });
      
      if (result.success && result.data) {
        setInterpretation(result.data);
      } else {
        setError(result.error || 'Failed to interpret dream');
      }
    } catch (err) {
      setError('An unexpected error occurred while interpreting your dream');
      console.error('Dream interpretation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApiSettingsSave = (newApiKey: string, newEndpoint: string) => {
    setApiKey(newApiKey);
    setApiEndpoint(newEndpoint);
  };

  const handleNewDream = () => {
    setCurrentDream('');
    setInterpretation(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-transparent via-transparent to-black/10"></div>

      {/* Header */}
      <header className="relative z-10 pt-8 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl">
                <Moon className="text-white" size={32} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                AI Dream Interpreter
              </h1>
            </div>
          </div>
          <p className="text-center text-white/90 text-lg max-w-2xl mx-auto">
            Unlock the mysteries of your subconscious mind with AI-powered dream analysis
          </p>
          
          {/* Settings Button */}
          <div className="absolute top-8 right-8">
            <button
              onClick={() => setShowSettings(true)}
              className="p-3 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-all duration-200"
              title="API Settings"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 pb-12">
        {!interpretation && !isLoading && (
          <DreamInputForm onSubmit={handleDreamSubmit} isLoading={isLoading} />
        )}

        {error && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-red-100 border border-red-300 text-red-700 px-6 py-4 rounded-xl">
              <p className="font-medium">Unable to interpret your dream</p>
              <p className="text-sm mt-1">{error}</p>
              <button
                onClick={handleNewDream}
                className="mt-3 text-sm text-red-600 hover:text-red-800 underline"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-purple-300 border-t-transparent rounded-full animate-spin mb-6"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-blue-300 border-b-transparent rounded-full animate-spin animate-reverse"></div>
            </div>
            <p className="text-white text-lg mb-2">Analyzing your dream...</p>
            <p className="text-white/70 text-sm text-center max-w-md">
              Our AI is exploring the symbolism, emotions, and themes in your dream to provide meaningful insights
            </p>
          </div>
        )}

        {interpretation && currentDream && (
          <div className="space-y-8">
            <DreamInterpretation 
              dreamDescription={currentDream}
              interpretation={interpretation}
            />
            
            {/* New Dream Button */}
            <div className="flex justify-center">
              <button
                onClick={handleNewDream}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-200 border border-white/20"
              >
                Interpret Another Dream
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-white/70">
        <div className="flex items-center justify-center space-x-6">
          <div className="flex items-center space-x-2">
            <Heart size={16} className="text-red-400" />
            <span className="text-sm">Made with care for dreamers</span>
          </div>
          <div className="flex items-center space-x-2">
            <GithubIcon size={16} />
            <span className="text-sm">Powered by Hugging Face AI</span>
          </div>
        </div>
        <p className="text-xs mt-4 opacity-60">
          Dream interpretations are for entertainment and self-reflection purposes. 
          Trust your own intuition and seek professional guidance when needed.
        </p>
      </footer>

      {/* API Settings Modal */}
      <ApiSettings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onSave={handleApiSettingsSave}
        currentApiKey={apiKey}
        currentEndpoint={apiEndpoint}
      />
    </div>
  );
}

export default App;