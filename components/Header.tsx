
import React from 'react';
import { AppState } from '../types';

interface HeaderProps {
  currentTab: AppState;
  setTab: (tab: AppState) => void;
}

const Header: React.FC<HeaderProps> = ({ currentTab, setTab }) => {
  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => setTab(AppState.HOME)}>
        <i className="fa-solid fa-shield-halved text-yellow-500 text-2xl"></i>
        <span className="font-cinzel text-xl font-bold gold-glow tracking-widest hidden sm:block">
          ESCUDO DE FÉ
        </span>
      </div>
      
      <div className="flex gap-4 sm:gap-8">
        {[
          { id: AppState.REFLECTION, label: 'Refletir', icon: 'fa-sun' },
          { id: AppState.PRAYER, label: 'Orar', icon: 'fa-hands-praying' },
          { id: AppState.VISUAL, label: 'Visualizar', icon: 'fa-eye' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            className={`flex items-center gap-2 text-sm font-medium transition-all ${
              currentTab === item.id ? 'text-yellow-500' : 'text-gray-400 hover:text-white'
            }`}
          >
            <i className={`fa-solid ${item.icon}`}></i>
            <span className="hidden xs:block">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Header;
