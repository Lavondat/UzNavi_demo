
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'explore', icon: '🌍', label: 'Explore' },
    { id: 'map', icon: '🗺️', label: 'Map' },
    { id: 'guides', icon: '🤵', label: 'Guides' },
    { id: 'profile', icon: '👤', label: 'Profile' },
  ];

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white overflow-hidden relative border-x border-gray-100">
      {/* Content Area */}
      <main className="flex-1 overflow-y-auto hide-scrollbar bg-gray-50 pb-24">
        {children}
      </main>

      {/* Bottom Navigation with High Contrast */}
      <nav className="absolute bottom-0 left-0 right-0 bg-white border-t-2 border-gray-100 px-6 py-4 flex justify-between items-center z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] rounded-t-[32px]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center gap-1.5 transition-all duration-300 relative group ${
              activeTab === tab.id ? 'text-teal-800 scale-110' : 'text-gray-400'
            }`}
          >
            {activeTab === tab.id && (
              <span className="absolute -top-1 w-1 h-1 bg-teal-800 rounded-full animate-pulse"></span>
            )}
            <span className={`text-2xl ${activeTab === tab.id ? 'drop-shadow-[0_0_8px_rgba(13,148,136,0.5)]' : 'opacity-60 grayscale'}`}>
              {tab.icon}
            </span>
            <span className={`text-[9px] font-black uppercase tracking-[0.1em] ${activeTab === tab.id ? 'opacity-100' : 'opacity-60'}`}>
              {tab.label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
