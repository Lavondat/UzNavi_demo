
import { Interest, Place, Guide, BudgetTier, TripType, Pace } from './types';

export const INTERESTS: Interest[] = [
  { id: 'art', label: 'Art/Photography', icon: '🎨' },
  { id: 'museums', label: 'Museums', icon: '🏛️' },
  { id: 'nature', label: 'Nature', icon: '⛰️' },
  { id: 'parks', label: 'Parks', icon: '🌳' },
  { id: 'kids', label: 'Kids Activities', icon: '🎡' },
  { id: 'games', label: 'Entertainment', icon: '🎮' },
  { id: 'food', label: 'Food & Gastronomy', icon: '🥘' },
];

const DEFAULT_REVIEWS = [
  { id: 'r1', userName: 'Alex Johnson', rating: 5, comment: 'Simply magnificent. The tilework is beyond description.', date: '2024-05-10' },
  { id: 'r2', userName: 'Maria Garcia', rating: 4, comment: 'Breathtaking at sunset. Bring a good camera!', date: '2024-05-08' }
];

export const MOCK_PLACES: Place[] = [
  {
    id: 'p1',
    name: 'Registan Square',
    city: 'Samarkand',
    category: 'Historical',
    lat: 39.6547,
    lng: 66.9758,
    image: 'https://media.tacdn.com/media/attractions-splice-spp-360x240/13/d2/bb/b5.jpg',
    description: 'The architectural heart of Samarkand. It features three grand Madrasahs: Ulugh Beg, Sher-Dor, and Tilya-Kori.',
    price_range: 'Free (Trial)',
    phone: '+998 66 235 0000',
    opening_hours: '08:00 - 20:00',
    tags: ['History', 'Architecture', 'UNESCO'],
    reviews: DEFAULT_REVIEWS,
    averageRating: 4.9
  },
  {
    id: 'p2',
    name: 'Chorsu Bazaar',
    city: 'Tashkent',
    category: 'Shopping',
    lat: 41.3268,
    lng: 69.2396,
    image: 'https://www.advantour.com/img/uzbekistan/tashkent/chorsu/chorsu.jpg',
    description: 'A traditional bazaar located in the center of the old town. Known for its massive blue dome.',
    price_range: 'Free Entry',
    phone: '+998 71 244 0000',
    opening_hours: '06:00 - 18:00',
    tags: ['Market', 'Local', 'Food'],
    reviews: [
      { id: 'r3', userName: 'Kenji Sato', rating: 5, comment: 'The best place to buy local nuts and spices!', date: '2024-05-12' }
    ],
    averageRating: 4.6
  },
  {
    id: 'p3',
    name: 'Shah-i-Zinda',
    city: 'Samarkand',
    category: 'Historical',
    lat: 39.6631,
    lng: 66.9877,
    image: 'https://www.advantour.com/img/uzbekistan/samarkand/shakhi-zinda/shakhi-zinda-necropolis1.jpg',
    description: 'A necropolis in Samarkand that includes mausoleums and other ritual buildings of the 9-14th and 19th centuries.',
    price_range: 'Free (Trial)',
    phone: '+998 71 236 0000',
    opening_hours: '09:00 - 18:00',
    tags: ['History', 'Culture', 'Photography'],
    reviews: [],
    averageRating: 4.8
  }
];

export const MOCK_GUIDES: Guide[] = [
  {
    id: 'g1',
    name: 'Dilshod Akhmedov',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400',
    languages: ['English', 'Uzbek', 'Russian'],
    hourlyRate: 0, // Free trial
    experienceYears: 12,
    specialties: ['Silk Road History', 'Archaeology'],
    contact: '+998 90 123 4567',
    reviews: [
      { id: 'rg1', userName: 'Sarah Smith', rating: 5, comment: 'Incredible guide! His stories brought the history to life.', date: '2024-04-20' }
    ],
    averageRating: 5.0
  }
];
