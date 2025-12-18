
import React, { useState } from 'react';
import { Reflection } from '../types';
import { generateReflection } from '../services/geminiService';

const ReflectionSection: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [reflection, setReflection] = useState<Reflection | null>(null);
  const [mood, setMood] = useState('');

  const moods = [
    { label: 'Ansiedade', value: 'ansiedade', icon: 'fa-wind' },
    { label: 'Cansaço', value: 'cansaço', icon: 'fa-battery-quarter' },
    { label: 'Dúvida', value: 'dúvida', icon: 'fa-question' },
    { label: 'Medo', value: 'medo', icon: 'fa-ghost' },
    { label: 'Tristeza', value: 'tristeza', icon: 'fa-cloud-rain' }
  ];

  const handleReflect = async (selectedMood: string) => {
    setLoading(true);
    setMood(selectedMood);
    try {
      const data = await generateReflection(selectedMood);
      setReflection(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="text-center mb-12">
        <h2 className="font-cinzel text-3xl mb-4 gold-glow">Como está sua alma hoje?</h2>
        <p className="text-gray-400">Escolha o que mais se aproxima do seu estado atual para receber uma palavra.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
        {moods.map((m) => (
          <button
            key={m.value}
            disabled={loading}
            onClick={() => handleReflect(m.label)}
            className={`p-6 rounded-xl border transition-all flex flex-col items-center gap-3 ${
              mood === m.label 
              ? 'bg-yellow-500/10 border-yellow-500 text-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.2)]' 
              : 'bg-white/5 border-white/10 hover:border-white/30 text-gray-400'
            }`}
          >
            <i className={`fa-solid ${m.icon} text-2xl`}></i>
            <span className="font-medium">{m.label}</span>
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-12 h-12 border-4 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin"></div>
          <p className="text-yellow-500 font-cinzel animate-pulse">Invocando a Luz...</p>
        </div>
      )}

      {reflection && !loading && (
        <div className="bg-spiritual-gradient victory-border rounded-2xl p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h3 className="font-cinzel text-2xl mb-6 text-yellow-500 text-center">{reflection.title}</h3>
          <p className="text-lg leading-relaxed text-gray-200 mb-8 italic text-center">
            "{reflection.body}"
          </p>
          <div className="border-t border-white/10 pt-6 text-center">
            <span className="text-sm font-cinzel text-yellow-600 uppercase tracking-widest block mb-2">Palavra Sagrada</span>
            <p className="text-gray-400 font-medium">{reflection.verse}</p>
          </div>
          
          <button 
            onClick={() => setReflection(null)}
            className="mt-8 block mx-auto text-sm text-gray-500 hover:text-white transition-colors underline decoration-dotted"
          >
            Buscar nova reflexão
          </button>
        </div>
      )}
    </div>
  );
};

export default ReflectionSection;
