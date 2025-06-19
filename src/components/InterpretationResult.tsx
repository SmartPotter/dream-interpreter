import { Brain, Heart, Eye, Lightbulb, Copy, Star } from 'lucide-react';

interface Interpretation {
  symbolism: string;
  emotions: string;
  themes: string;
  insights: string;
  overall: string;
}

interface InterpretationResultProps {
  interpretation: Interpretation;
  dreamText: string;
  onNewDream: () => void;
}

export default function InterpretationResult({
  interpretation,
  dreamText,
  onNewDream,
}: InterpretationResultProps) {
  const sections = [
    {
      title: 'Symbolism',
      content: interpretation.symbolism,
      icon: Eye,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      title: 'Emotions',
      content: interpretation.emotions,
      icon: Heart,
      color: 'from-pink-500 to-red-500',
      bgColor: 'bg-pink-500/10',
    },
    {
      title: 'Themes',
      content: interpretation.themes,
      icon: Brain,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Insights',
      content: interpretation.insights,
      icon: Lightbulb,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-500/10',
    },
  ];

  const copyToClipboard = async () => {
    const text = `Dream: ${dreamText}\n\nInterpretation:\n${interpretation.overall || ''}`;
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Your Dream Interpretation</h2>
        <p className="text-purple-200">AI-powered analysis of your subconscious mind</p>
      </div>

      {/* Dream Summary */}
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl blur opacity-25"></div>
        <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <Star className="w-5 h-5" />
            Your Dream
          </h3>
          <p className="text-purple-100 leading-relaxed">{dreamText}</p>
        </div>
      </div>

      {/* Overall Interpretation */}
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl blur opacity-25"></div>
        <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h3 className="text-white font-semibold mb-4 text-xl">Overall Interpretation</h3>
          <p className="text-white leading-relaxed text-lg">{interpretation.overall}</p>
        </div>
      </div>

      {/* Detailed Analysis Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {sections.map((section, index) => {
          const IconComponent = section.icon;
          return (
            <div key={index} className="relative group">
              <div
                className={`absolute -inset-1 bg-gradient-to-r ${section.color} rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-200`}
              ></div>
              <div
                className={`relative ${section.bgColor} backdrop-blur-lg rounded-2xl p-6 border border-white/20 h-full`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-r ${section.color} flex items-center justify-center`}
                  >
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-white font-semibold text-lg">{section.title}</h3>
                </div>
                <p className="text-purple-100 leading-relaxed">{section.content}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={copyToClipboard}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/20 transition-all duration-200 backdrop-blur-lg"
        >
          <Copy className="w-5 h-5" />
          Copy Interpretation
        </button>
        <button
          onClick={onNewDream}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white rounded-xl transition-all duration-200"
        >
          <Brain className="w-5 h-5" />
          Interpret Another Dream
        </button>
      </div>
    </div>
  );
}
