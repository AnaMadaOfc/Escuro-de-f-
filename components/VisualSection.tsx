
import React, { useState } from 'react';
import { generateVisualShield } from '../services/geminiService';

const VisualSection: React.FC = () => {
  const [fear, setFear] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleVisualize = async () => {
    if (!fear.trim()) return;
    setLoading(true);
    setImageUrl(null);
    try {
      const url = await generateVisualShield(fear);
      setImageUrl(url);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="text-center mb-10">
        <h2 className="font-cinzel text-3xl mb-4 gold-glow">Escudo Visual</h2>
        <p className="text-gray-400">Transforme suas trevas em luz. Qual sombra você deseja ver dissipada?</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <input
          type="text"
          value={fear}
          onChange={(e) => setFear(e.target.value)}
          placeholder="Digite um medo ou preocupação..."
          className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-3 text-lg focus:outline-none focus:border-yellow-500/50"
        />
        <button
          onClick={handleVisualize}
          disabled={loading || !fear.trim()}
          className="bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-yellow-500 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
        >
          {loading ? 'Manifestando...' : 'Visualizar Vitória'}
        </button>
      </div>

      <div className="relative group">
        {loading && (
          <div className="aspect-square w-full max-w-[500px] mx-auto bg-white/5 rounded-2xl flex flex-col items-center justify-center gap-6 animate-pulse border border-white/10">
            <i className="fa-solid fa-wand-magic-sparkles text-5xl text-yellow-500/50"></i>
            <div className="text-center space-y-2 px-6">
              <p className="text-yellow-500 font-cinzel">Pintando a vitória com Luz Divina</p>
              <p className="text-xs text-gray-500">Isso pode levar alguns segundos enquanto as sombras recuam...</p>
            </div>
          </div>
        )}

        {imageUrl && !loading && (
          <div className="animate-in fade-in zoom-in-95 duration-1000">
            <div className="aspect-square w-full max-w-[500px] mx-auto relative rounded-2xl overflow-hidden victory-border">
              <img src={imageUrl} alt="Vitória Visual" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-yellow-500 font-bold mb-1">Manifestação de Fé</p>
                  <p className="text-white text-lg font-cinzel">A luz que dissipa o medo de {fear}</p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-center gap-4">
              <button 
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = imageUrl;
                  link.download = `escudo-de-fe-${Date.now()}.png`;
                  link.click();
                }}
                className="text-sm flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors"
              >
                <i className="fa-solid fa-download"></i> Salvar Escudo
              </button>
              <button 
                onClick={() => setImageUrl(null)}
                className="text-sm flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors"
              >
                <i className="fa-solid fa-rotate"></i> Novo
              </button>
            </div>
          </div>
        )}

        {!loading && !imageUrl && (
          <div className="aspect-square w-full max-w-[500px] mx-auto bg-white/5 rounded-2xl border border-dashed border-white/20 flex flex-col items-center justify-center text-gray-600 p-12 text-center">
            <i className="fa-solid fa-image text-6xl mb-6 opacity-20"></i>
            <p className="font-cinzel">Nada oculto permanece nas sombras quando a luz é invocada.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisualSection;
