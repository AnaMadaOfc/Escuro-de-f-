
import React, { useState } from 'react';
import { generatePrayer } from '../services/geminiService';

const PrayerSection: React.FC = () => {
  const [intention, setIntention] = useState('');
  const [loading, setLoading] = useState(false);
  const [prayer, setPrayer] = useState('');

  const handleGenerate = async () => {
    if (!intention.trim()) return;
    setLoading(true);
    try {
      const result = await generatePrayer(intention);
      setPrayer(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <div className="text-center mb-10">
        <i className="fa-solid fa-hands-praying text-4xl text-yellow-500 mb-4 opacity-80"></i>
        <h2 className="font-cinzel text-3xl mb-4 gold-glow">Altar de Oração</h2>
        <p className="text-gray-400">Pelo que precisamos batalhar hoje? Declare sua causa.</p>
      </div>

      <div className="relative mb-12">
        <textarea
          value={intention}
          onChange={(e) => setIntention(e.target.value)}
          placeholder="Ex: Minha família, minha saúde mental, uma decisão difícil..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-lg focus:outline-none focus:border-yellow-500/50 transition-all min-h-[120px]"
        />
        <button
          onClick={handleGenerate}
          disabled={loading || !intention.trim()}
          className="absolute bottom-4 right-4 bg-yellow-600 hover:bg-yellow-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-black font-bold py-2 px-6 rounded-full transition-all flex items-center gap-2"
        >
          {loading ? (
            <i className="fa-solid fa-spinner animate-spin"></i>
          ) : (
            <i className="fa-solid fa-fire-flame-curved"></i>
          )}
          Guerrear em Oração
        </button>
      </div>

      {prayer && !loading && (
        <div className="bg-black/40 border border-yellow-500/20 rounded-2xl p-8 shadow-2xl animate-in zoom-in-95 duration-500">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs font-cinzel text-yellow-600 tracking-tighter uppercase">Decreto Espiritual</span>
            <button 
              onClick={() => navigator.clipboard.writeText(prayer)}
              className="text-gray-500 hover:text-yellow-500 transition-colors"
              title="Copiar Oração"
            >
              <i className="fa-regular fa-copy"></i>
            </button>
          </div>
          <div className="text-gray-100 text-lg leading-relaxed whitespace-pre-line font-serif italic">
            {prayer}
          </div>
          <div className="mt-8 flex justify-center">
             <div className="h-px w-20 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrayerSection;
