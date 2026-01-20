
import React, { useState } from 'react';
import { UserPreferences, Trip, Place } from './types';
import Layout from './components/Layout';
import Onboarding from './screens/Onboarding';
import Home from './screens/Home';
import TripDetails from './screens/TripDetails';
import PlaceDetails from './screens/PlaceDetails';
import MapScreen from './screens/MapScreen';
import { generateTripItinerary } from './geminiService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [currentScreen, setCurrentScreen] = useState<'onboarding' | 'home' | 'trip_details' | 'place_details'>('onboarding');
  const [userTrip, setUserTrip] = useState<Trip | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const handleOnboardingComplete = async (prefs: UserPreferences) => {
    const itinerary = await generateTripItinerary(prefs);
    const newTrip: Trip = {
      id: 'trip-' + Date.now(),
      userId: 'user-123',
      preferences: prefs,
      days: itinerary,
      totalEstimatedCost: 0, // Fully free for 6 months
      createdAt: new Date().toISOString()
    };
    setUserTrip(newTrip);
    setCurrentScreen('home');
    setActiveTab('home');
  };

  const navigateToPlace = (place: Place) => {
    setSelectedPlace(place);
    setCurrentScreen('place_details');
  };

  const renderContent = () => {
    if (currentScreen === 'onboarding') {
      return <Onboarding onComplete={handleOnboardingComplete} />;
    }

    if (currentScreen === 'place_details' && selectedPlace) {
      return <PlaceDetails place={selectedPlace} onBack={() => setCurrentScreen('home')} />;
    }

    if (currentScreen === 'trip_details' && userTrip) {
      return (
        <TripDetails 
          trip={userTrip} 
          onBack={() => setCurrentScreen('home')} 
          onPlaceClick={navigateToPlace}
        />
      );
    }

    // Tab Navigation Logic
    switch (activeTab) {
      case 'home':
        return (
          <Home 
            trip={userTrip} 
            onViewPlace={navigateToPlace} 
            onViewTrip={() => setCurrentScreen('trip_details')} 
          />
        );
      case 'map':
        return (
          <MapScreen 
            onPlaceClick={navigateToPlace}
            itineraryStops={userTrip?.days[0]?.stops} // Show first day route by default
          />
        );
      case 'explore':
        return (
          <div className="p-8 text-center bg-white h-full flex flex-col justify-center">
            <div className="text-6xl mb-6">🏺</div>
            <h2 className="text-2xl font-black text-teal-900 uppercase tracking-widest">Heritage Explore</h2>
            <p className="text-sm text-gray-500 font-medium leading-relaxed mt-4 px-6">
              Discover hidden tea houses and ancient artisan workshops across Bukhara and Samarkand.
            </p>
          </div>
        );
      case 'guides':
        return (
          <div className="p-8 text-center bg-white h-full flex flex-col justify-center">
            <div className="text-6xl mb-6">🧔🏻</div>
            <h2 className="text-2xl font-black text-teal-900 uppercase tracking-widest">Certified Guides</h2>
            <p className="text-sm text-gray-500 font-medium leading-relaxed mt-4 px-6">
              All VIP guides are currently **FREE** as part of your 6-month tourism pilot program.
            </p>
          </div>
        );
      case 'profile':
        return (
          <div className="p-6 space-y-8 bg-gray-50 h-full overflow-y-auto pb-24">
            <div className="flex items-center gap-6 p-6 bg-white rounded-[32px] shadow-2xl border-2 border-teal-800">
              <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center text-4xl shadow-inner border-2 border-white">🗺️</div>
              <div>
                <h3 className="text-xl font-black text-teal-900">Umarbek K.</h3>
                <div className="bg-teal-700 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mt-1">
                  6-Month Free Trial
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Safety & Support</h4>
              <div className="bg-red-50 p-6 rounded-[32px] space-y-4 border-2 border-red-200">
                <div className="flex justify-between items-center text-sm font-black text-red-900 uppercase tracking-widest">
                  <span>Police</span>
                  <a href="tel:102" className="bg-red-900 text-white px-4 py-2 rounded-xl text-xs">CALL 102</a>
                </div>
                <div className="flex justify-between items-center text-sm font-black text-red-900 uppercase tracking-widest border-t border-red-200 pt-4">
                  <span>Tourist Police</span>
                  <a href="tel:+998712000003" className="bg-red-900 text-white px-4 py-2 rounded-xl text-xs">CONTACT</a>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-[32px] shadow-xl border-2 border-teal-800/10 space-y-6">
               <div className="flex justify-between items-center">
                 <span className="font-black text-teal-900 text-sm uppercase">Language</span>
                 <span className="text-teal-700 font-black">EN / UZ</span>
               </div>
               <div className="flex justify-between items-center border-t border-gray-100 pt-6">
                 <span className="font-black text-teal-900 text-sm uppercase">Currency</span>
                 <span className="text-teal-700 font-black">USD / UZS</span>
               </div>
               <div className="flex justify-between items-center border-t border-gray-100 pt-6">
                 <span className="font-black text-teal-900 text-sm uppercase">Trial Ends</span>
                 <span className="text-red-600 font-black">Sept 2024</span>
               </div>
            </div>
          </div>
        );
      default:
        return <Home trip={userTrip} onViewPlace={navigateToPlace} onViewTrip={() => setCurrentScreen('trip_details')} />;
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-slate-950 overflow-hidden font-sans">
      <div className="w-full max-w-md h-full bg-white relative border-x border-teal-900/20 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
        {currentScreen === 'onboarding' || currentScreen === 'place_details' || currentScreen === 'trip_details' ? (
          renderContent()
        ) : (
          <Layout activeTab={activeTab} onTabChange={(tab) => {
            setActiveTab(tab);
            setCurrentScreen('home'); 
          }}>
            {renderContent()}
          </Layout>
        )}
      </div>
    </div>
  );
};

export default App;
