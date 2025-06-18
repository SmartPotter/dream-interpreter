import React, { useState } from 'react';
import { Settings, Key, Globe, X } from 'lucide-react';

interface ApiSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (apiKey: string, endpoint: string) => void;
  currentApiKey: string;
  currentEndpoint: string;
}

export const ApiSettings: React.FC<ApiSettingsProps> = ({
  isOpen,
  onClose,
  onSave,
  currentApiKey,
  currentEndpoint
}) => {
  const [apiKey, setApiKey] = useState(currentApiKey);
  const [endpoint, setEndpoint] = useState(currentEndpoint);

  const handleSave = () => {
    onSave(apiKey, endpoint);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Settings className="text-purple-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">API Settings</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Key size={16} className="inline mr-2" />
              Hugging Face API Key (Optional)
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="hf_..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Optional: Providing an API key may improve response quality and reduce rate limits
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Globe size={16} className="inline mr-2" />
              API Endpoint
            </label>
            <input
              type="url"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              placeholder="https://api-inference.huggingface.co/models/..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Use Hugging Face Inference API or your own model endpoint
            </p>
          </div>
        </div>

        <div className="flex space-x-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};