
import React from 'react';
import { Place } from '../types';
import { MOCK_PLACES } from '../constants';

interface MapScreenProps {
  onPlaceClick: (place: Place) => void;
  itineraryStops?: Place[];
}

const MapScreen: React.FC<MapScreenProps> = ({ onPlaceClick, itineraryStops = MOCK_PLACES }) => {
  return (
    <div className="h-full w-full relative bg-gray-200">
      {/* Simulation of a real map background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="w-[200%] h-[200%] absolute -top-1/4 -left-1/4 opacity-40">
           {/* Abstract map pattern */}
           <svg viewBox="0 0 1000 1000" className="w-full h-full text-teal-900">
             <path d="M0,500 Q250,400 500,500 T1000,500" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10,5" />
             <path d="M200,0 Q300,500 200,1000" fill="none" stroke="currentColor" strokeWidth="1" />
             <path d="M700,0 Q800,500 700,1000" fill="none" stroke="currentColor" strokeWidth="1" />
             <circle cx="500" cy="500" r="300" fill="currentColor" opacity="0.05" />
           </svg>
        </div>
      </div>

      {/* Map Pins */}
      {itineraryStops.map((stop, idx) => (
        <button
          key={stop.id}
          onClick={() => onPlaceClick(stop)}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-bounce-slow"
          style={{
            top: `${30 + (idx * 20)}%`,
            left: `${20 + (idx * 30)}%`
          }}
        >
          <div className="relative">
            <div className="w-12 h-12 bg-teal-800 rounded-full flex items-center justify-center text-white border-4 border-white shadow-2xl">
              <span className="font-black text-sm">{idx + 1}</span>
            </div>
            <div className="absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap bg-teal-900 text-white text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-widest shadow-xl border border-teal-700">
              {stop.name}
            </div>
          </div>
        </button>
      ))}

      {/* User Location Simulation */}
      <div className="absolute bottom-1/3 left-1/2 w-8 h-8 bg-blue-500 rounded-full border-4 border-white shadow-2xl animate-pulse flex items-center justify-center">
         <div className="w-2 h-2 bg-white rounded-full"></div>
      </div>

      {/* Route Path Connector (Visual only) */}
      <svg className="absolute inset-0 pointer-events-none" width="100%" height="100%">
        <path 
           d="M 20% 30% L 50% 50% L 80% 70%" 
           fill="none" 
           stroke="#0f766e" 
           strokeWidth="4" 
           strokeDasharray="8,8" 
           className="animate-[dash_2s_linear_infinite]"
        />
      </svg>

      {/* Overlay UI */}
      <div className="absolute top-6 left-6 right-6 flex flex-col gap-3">
        <div className="bg-white/95 backdrop-blur p-4 rounded-2xl shadow-2xl border-2 border-teal-800/20 flex items-center gap-4">
          <div className="w-10 h-10 bg-teal-800 rounded-xl flex items-center justify-center text-lg shadow-lg">🗺️</div>
          <div>
            <h2 className="text-sm font-black text-teal-900 uppercase tracking-widest">Active Navigation</h2>
            <p className="text-[10px] font-bold text-teal-700">6 Stops in Samarkand Old City</p>
          </div>
        </div>
        
        <div className="flex gap-2">
           <button className="flex-1 bg-teal-800 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl border-b-4 border-teal-950">
             Optimize Route
           </button>
           <button className="flex-1 bg-white text-teal-900 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl border-2 border-teal-800">
             Download (Trial Free)
           </button>
        </div>
      </div>

      <style>{`
        @keyframes dash {
          to { stroke-dashoffset: -16; }
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translate(-50%, -60%); }
          50% { transform: translate(-50%, -40%); }
        }
      `}</style>
    </div>
  );
};

export default MapScreen;
