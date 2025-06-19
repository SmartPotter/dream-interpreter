import { useState } from 'react';
import DreamForm from './components/DreamForm';
import InterpretationResult from './components/InterpretationResult';
import LoadingSpinner from './components/LoadingSpinner';
import { interpretDream } from './services/dreamInterpretation';

interface Interpretation {
  symbolism: string;
  emotions: string;
  themes: string;
  insights: string;
  overall: string; // we’ll map this ourselves from API response
}

type AppState = 'input' | 'loading' | 'result';

function App() {
  const [state, setState] = useState<AppState>('input');
  const [interpretation, setInterpretation] = useState<Interpretation | null>(null);
  const [dreamText, setDreamText] = useState('');

  const handleDreamSubmit = async (dream: string) => {
    setDreamText(dream);
    setState('loading');

    try {
      const result = await interpretDream(dream);
      // map API keys to internal Interpretation type
      setInterpretation({
        symbolism: result.symbolism,
        emotions: result.emotions,
        themes: result.themes,
        insights: result.insights,
        overall: result.overallInterpretation,
      });
      setState('result');
    } catch (error) {
      console.error('Failed to interpret dream:', error);
      setState('input');
    }
  };

  const handleNewDream = () => {
    setState('input');
    setInterpretation(null);
    setDreamText('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Stars */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-white rounded-full animate-pulse delay-${i * 1000}`}
            style={{
              top: `${20 + i * 15}%`,
              left: `${20 + (i * 30) % 60}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        {state === 'input' && (
          <DreamForm onSubmit={handleDreamSubmit} isLoading={false} />
        )}
        {state === 'loading' && <LoadingSpinner />}
        {state === 'result' && interpretation && (
          <InterpretationResult
            interpretation={interpretation}
            dreamText={dreamText}
            onNewDream={handleNewDream}
          />
        )}
      </div>

      <div className="absolute bottom-4 left-0 right-0 text-center text-purple-300 text-sm">
        Powered by AI • Your dreams remain private and secure
      </div>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}

export default App;
