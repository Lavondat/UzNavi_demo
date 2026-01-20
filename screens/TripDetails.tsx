
import React, { useState } from 'react';
import { Trip, Place } from '../types';

interface TripDetailsProps {
  trip: Trip;
  onBack: () => void;
  onPlaceClick: (place: Place) => void;
}

const TripDetails: React.FC<TripDetailsProps> = ({ trip, onBack, onPlaceClick }) => {
  const [activeDay, setActiveDay] = useState(1);

  const currentDayData = trip.days.find(d => d.day === activeDay);

  return (
    <div className="min-h-full bg-white flex flex-col">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md z-40 p-4 border-b border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={onBack} className="p-2 bg-gray-50 rounded-xl">⬅️</button>
          <h1 className="text-lg font-bold">Your Itinerary</h1>
        </div>
        
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          {trip.days.map(d => (
            <button
              key={d.day}
              onClick={() => setActiveDay(d.day)}
              className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all flex-shrink-0 ${
                activeDay === d.day ? 'bg-teal-600 text-white shadow-lg' : 'bg-gray-50 text-gray-400'
              }`}
            >
              Day {d.day}
            </button>
          ))}
        </div>
      </div>

      {/* Day Content */}
      <div className="p-6 space-y-6">
        {currentDayData && (
          <>
            <div className="bg-teal-50 p-4 rounded-2xl border border-teal-100">
              <p className="text-sm text-teal-800 italic leading-relaxed">
                <span className="font-bold text-lg not-italic block mb-1">Morning Overview</span>
                "{currentDayData.summary}"
              </p>
            </div>

            <div className="relative space-y-8 pl-8">
              {/* Timeline Connector */}
              <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-dashed bg-teal-100 border-l-2 border-dashed border-teal-200"></div>

              {currentDayData.stops.map((stop, idx) => (
                <div key={stop.id} className="relative group">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[2.25rem] top-1.5 w-7 h-7 bg-white border-4 border-teal-600 rounded-full z-10 flex items-center justify-center text-[10px] font-bold">
                    {idx + 1}
                  </div>

                  <button 
                    onClick={() => onPlaceClick(stop)}
                    className="w-full bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-left hover:shadow-md transition-all active:scale-[0.98]"
                  >
                    <div className="flex gap-4">
                      <img src={stop.image} className="w-16 h-16 rounded-xl object-cover" />
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900">{stop.name}</h4>
                        <p className="text-[10px] text-teal-600 font-bold uppercase tracking-wider">{stop.category}</p>
                        <p className="text-xs text-gray-500 line-clamp-2 mt-1">{stop.description}</p>
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Floating Action: Map View */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2">
        <button className="bg-teal-900 text-white px-8 py-3 rounded-full font-bold shadow-2xl flex items-center gap-2">
          <span>📍</span>
          <span>View Day Route</span>
        </button>
      </div>
    </div>
  );
};

export default TripDetails;
