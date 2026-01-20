
import React, { useState, useEffect, useRef } from 'react';
import { UserPreferences, BudgetTier, TripType, Pace } from '../types';
import { INTERESTS } from '../constants';
import { chatWithUzi } from '../geminiService';

interface OnboardingProps {
  onComplete: (prefs: UserPreferences) => void;
}

type Step = 'welcome' | 'interests' | 'budget' | 'type' | 'days' | 'pace' | 'generating';

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState<Step>('welcome');
  const [prefs, setPrefs] = useState<Partial<UserPreferences>>({
    interests: [],
    budgetTier: BudgetTier.Bronze,
    tripType: TripType.Solo,
    days: 3,
    pace: Pace.Moderate
  });
  
  const [uziMessages, setUziMessages] = useState<{ role: 'model' | 'user', text: string }[]>([
    { role: 'model', text: "Assalomu alaykum! I'm Uzi, your personal guide to Uzbekistan. Ready to plan an epic trip?" }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [uziMessages]);

  const addMessage = (role: 'model' | 'user', text: string) => {
    setUziMessages(prev => [...prev, { role, text }]);
  };

  const handleNext = async (value?: any) => {
    if (step === 'welcome') {
      setStep('interests');
      addMessage('model', "First, what kind of experiences do you love?");
    } else if (step === 'interests') {
      setStep('budget');
      addMessage('model', "Great choices! What's your total budget tier for this adventure?");
    } else if (step === 'budget') {
      setStep('type');
      addMessage('model', "Who are you traveling with?");
    } else if (step === 'type') {
      setStep('days');
      addMessage('model', "And how many days will you stay in our beautiful country?");
    } else if (step === 'days') {
      setStep('pace');
      addMessage('model', "Last thing - how do you like to travel?");
    } else if (step === 'pace') {
      setStep('generating');
      addMessage('model', "Incredible! Let me weave some magic and generate your perfect Uzbekistan journey...");
      setTimeout(() => {
        onComplete(prefs as UserPreferences);
      }, 3000);
    }
  };

  const toggleInterest = (id: string) => {
    const current = prefs.interests || [];
    if (current.includes(id)) {
      setPrefs({ ...prefs, interests: current.filter(i => i !== id) });
    } else {
      setPrefs({ ...prefs, interests: [...current, id] });
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-teal-600 p-6 text-white rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-inner">
            🤖
          </div>
          <div>
            <h1 className="text-xl font-bold">Uzi AI Assistant</h1>
            <p className="text-teal-100 text-sm">Online & ready to help</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar">
        {uziMessages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl ${
              msg.role === 'user' 
                ? 'bg-teal-500 text-white rounded-tr-none' 
                : 'bg-gray-100 text-gray-800 rounded-tl-none shadow-sm'
            }`}>
              <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}

        {/* Option Selection Area */}
        {step !== 'generating' && (
          <div className="mt-6 space-y-4 animate-in fade-in duration-500">
            {step === 'welcome' && (
              <button 
                onClick={() => handleNext()}
                className="w-full bg-teal-600 text-white py-4 rounded-xl font-bold shadow-md hover:bg-teal-700 transition-colors"
              >
                Let's Start Planning! ✈️
              </button>
            )}

            {step === 'interests' && (
              <div className="grid grid-cols-2 gap-3">
                {INTERESTS.map(item => (
                  <button
                    key={item.id}
                    onClick={() => toggleInterest(item.id)}
                    className={`p-3 border-2 rounded-xl flex items-center gap-2 transition-all ${
                      prefs.interests?.includes(item.id) 
                        ? 'border-teal-500 bg-teal-50 text-teal-700' 
                        : 'border-gray-100'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span className="text-xs font-semibold">{item.label}</span>
                  </button>
                ))}
                <button 
                  onClick={() => handleNext()}
                  className="col-span-2 mt-2 bg-teal-600 text-white py-3 rounded-xl font-bold"
                >
                  Continue
                </button>
              </div>
            )}

            {step === 'budget' && (
              <div className="flex flex-col gap-2">
                {Object.values(BudgetTier).map(tier => (
                  <button
                    key={tier}
                    onClick={() => {
                      setPrefs({ ...prefs, budgetTier: tier });
                      handleNext();
                    }}
                    className={`p-4 border-2 rounded-xl text-left font-semibold ${
                      prefs.budgetTier === tier ? 'border-teal-500 bg-teal-50' : 'border-gray-100'
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            )}

            {step === 'type' && (
              <div className="grid grid-cols-2 gap-3">
                {Object.values(TripType).map(type => (
                  <button
                    key={type}
                    onClick={() => {
                      setPrefs({ ...prefs, tripType: type });
                      handleNext();
                    }}
                    className={`p-4 border-2 rounded-xl font-semibold ${
                      prefs.tripType === type ? 'border-teal-500 bg-teal-50' : 'border-gray-100'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}

            {step === 'days' && (
              <div className="flex flex-col gap-4 p-4 bg-gray-50 rounded-xl">
                <input 
                  type="range" min="1" max="14" step="1"
                  value={prefs.days}
                  onChange={(e) => setPrefs({ ...prefs, days: parseInt(e.target.value) })}
                  className="w-full accent-teal-600"
                />
                <div className="flex justify-between font-bold text-teal-800">
                  <span>{prefs.days} Days Journey</span>
                </div>
                <button 
                  onClick={() => handleNext()}
                  className="bg-teal-600 text-white py-3 rounded-xl font-bold"
                >
                  That's perfect
                </button>
              </div>
            )}

            {step === 'pace' && (
              <div className="grid grid-cols-3 gap-2">
                {Object.values(Pace).map(pace => (
                  <button
                    key={pace}
                    onClick={() => {
                      setPrefs({ ...prefs, pace: pace });
                      handleNext();
                    }}
                    className={`p-3 border-2 rounded-xl text-xs font-bold ${
                      prefs.pace === pace ? 'border-teal-500 bg-teal-50' : 'border-gray-100'
                    }`}
                  >
                    {pace}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {step === 'generating' && (
        <div className="p-8 text-center space-y-4">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 border-4 border-teal-100 border-t-teal-600 rounded-full animate-spin"></div>
            <div className="absolute inset-4 bg-teal-50 rounded-full flex items-center justify-center text-2xl">
              🗺️
            </div>
          </div>
          <h2 className="text-lg font-bold text-gray-800">Crafting your itinerary...</h2>
          <p className="text-sm text-gray-500 italic">Finding the best historical sites and restaurants in Samarkand & Tashkent</p>
        </div>
      )}
    </div>
  );
};

export default Onboarding;
