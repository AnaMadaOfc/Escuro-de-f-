
import React, { useState, useEffect } from 'react';
import { AppState } from './types';
import Header from './components/Header';
import ReflectionSection from './components/ReflectionSection';
import PrayerSection from './components/PrayerSection';
import VisualSection from './components/VisualSection';

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<AppState>(AppState.HOME);

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  const renderContent = () => {
    switch (currentTab) {
      case AppState.REFLECTION:
        return <ReflectionSection />;
      case AppState.PRAYER:
        return <PrayerSection />;
      case AppState.VISUAL:
        return <VisualSection />;
      case AppState.HOME:
      default:
        return (
          <div className="animate-in fade-in duration-1000">
            {/* Hero Section */}
            <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=2000" 
                  alt="Mist and Light" 
                  className="w-full h-full object-cover opacity-30 grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
              </div>

              <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                <div className="mb-8 animate-pulse-slow">
                  <i className="fa-solid fa-shield-halved text-6xl text-yellow-500 gold-glow"></i>
                </div>
                <h1 className="font-cinzel text-5xl md:text-7xl font-bold mb-6 tracking-tighter gold-glow">
                  ESCUDO DE FÉ
                </h1>
                <p className="text-xl md:text-2xl text-gray-400 font-serif italic mb-12 max-w-2xl mx-auto leading-relaxed">
                  "Você pode até tentar confundir, acusar e assustar... mas aqui não."
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <button 
                    onClick={() => setCurrentTab(AppState.PRAYER)}
                    className="w-full sm:w-auto bg-yellow-600 hover:bg-yellow-500 text-black font-bold py-4 px-10 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-yellow-600/20"
                  >
                    Ativar Escudo de Oração
                  </button>
                  <button 
                    onClick={() => setCurrentTab(AppState.REFLECTION)}
                    className="w-full sm:w-auto border border-white/20 hover:border-white/50 bg-white/5 backdrop-blur-sm text-white font-medium py-4 px-10 rounded-full transition-all"
                  >
                    Ver Reflexão do Dia
                  </button>
                </div>
              </div>
              
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
                <i className="fa-solid fa-chevron-down text-2xl"></i>
              </div>
            </div>

            {/* Quote Grid */}
            <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-3 gap-12 border-t border-white/5">
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-yellow-500/30 transition-all">
                <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center mb-6">
                   <i className="fa-solid fa-bolt-lightning text-yellow-500 text-xl"></i>
                </div>
                <h3 className="font-cinzel text-xl mb-4">Poder da Palavra</h3>
                <p className="text-gray-400 leading-relaxed">Reflexões geradas para dissipar as sombras que tentam envolver sua mente.</p>
              </div>
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-yellow-500/30 transition-all">
                <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center mb-6">
                   <i className="fa-solid fa-hand-fist text-yellow-500 text-xl"></i>
                </div>
                <h3 className="font-cinzel text-xl mb-4">Guerra Espiritual</h3>
                <p className="text-gray-400 leading-relaxed">Orações personalizadas que declaram sua autoridade e herança divina.</p>
              </div>
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-yellow-500/30 transition-all">
                <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center mb-6">
                   <i className="fa-solid fa-eye text-yellow-500 text-xl"></i>
                </div>
                <h3 className="font-cinzel text-xl mb-4">Visão da Vitória</h3>
                <p className="text-gray-400 leading-relaxed">Visualizações que manifestam a luz triunfante sobre cada um de seus temores.</p>
              </div>
            </div>

            {/* Immersive Section */}
            <div className="bg-spiritual-gradient py-24 border-y border-white/5">
              <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="font-cinzel text-3xl md:text-5xl mb-12">"Essa vida não te pertence."</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                  <div className="space-y-4">
                    <p className="text-gray-400 italic font-serif text-lg">
                      O inimigo pode tentar confundir seus pensamentos, acusar seu passado e assustar seu futuro. Mas o Escudo de Fé está aqui para lembrá-lo de quem você realmente é.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-400 italic font-serif text-lg">
                      Não estamos em uma batalha comum. Estamos em uma luta onde a luz já venceu. Nosso papel é apenas permanecer firmes na verdade.
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setCurrentTab(AppState.VISUAL)}
                  className="mt-16 inline-flex items-center gap-3 text-yellow-500 font-cinzel hover:gap-5 transition-all group"
                >
                  Manifestar Luz Agora <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>

            {/* Footer Text */}
            <footer className="py-12 px-6 text-center text-gray-600 text-sm font-cinzel">
              <p className="tracking-widest uppercase mb-4">A Vitória é Tua por Herança</p>
              <p>&copy; {new Date().getFullYear()} Escudo de Fé</p>
            </footer>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentTab={currentTab} setTab={setCurrentTab} />
      <main className="flex-1">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
