
import { Drone } from './types';

const MOCK_REVIEWS = [
  { id: 'r1', user: 'Capt. Arjan Singh', rating: 5, comment: 'Exceptional stability in high-altitude winds. The thermal imaging is game-changing.', date: '2024-03-12' },
  { id: 'r2', user: 'Vikram Mehta', rating: 4, comment: 'Build quality is robust. Used for agricultural mapping, worked flawlessly.', date: '2024-02-28' },
  { id: 'r3', user: 'Operations Lead Alpha', rating: 5, comment: 'Indispensable for logistics in the North-East region.', date: '2024-04-01' }
];

export const DRONES: Drone[] = [
  {
    id: '1',
    name: 'AGNI-STRIKE MK-I',
    price: 145000,
    description: 'Precision tactical strike drone with thermal imaging and advanced GPS jamming resistance.',
    longDescription: 'The Agni-Strike MK-I is the pinnacle of Indian tactical aerospace engineering. Designed for high-stakes precision, it features an encrypted frequency-hopping link and a reinforced carbon-fiber airframe. Its primary mission profile includes search-and-rescue and surgical surveillance in hostile environments.',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Attack',
    specs: { range: '15km', battery: '45 mins', payload: '5kg', topSpeed: '120km/h', signalType: 'Encrypted RF' },
    reviews: MOCK_REVIEWS
  },
  {
    id: '2',
    name: 'VAYU-RECON V2',
    price: 89000,
    description: 'Lightweight surveillance unit with 4K stealth camera and silent rotor technology.',
    longDescription: 'Engineered for complete silence, the Vayu-Recon V2 utilizes specialized aerodynamic propellers to maintain a sub-40dB noise floor at 50 meters. Ideal for covert monitoring and wildlife documentation where minimal disturbance is paramount.',
    image: 'https://images.unsplash.com/photo-1527977966376-1c8418f9f108?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1527977966376-1c8418f9f108?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1506947411487-a56738267384?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Recon',
    specs: { range: '25km', battery: '60 mins', payload: '0.5kg', topSpeed: '85km/h', signalType: 'OcuSync Digital' },
    reviews: MOCK_REVIEWS.slice(0, 2)
  },
  {
    id: '3',
    name: 'GARUDA LOGISTICS',
    price: 210000,
    description: 'Heavy-lift cargo drone designed for medical and essential supplies in rugged terrains.',
    longDescription: 'The Garuda is a heavy-lift multirotor designed to bridge the last-mile gap in difficult terrain. With an industry-leading MTOW (Maximum Take-Off Weight), it serves as a lifeline for remote communities, delivering medical supplies and emergency rations.',
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Logistics',
    specs: { range: '40km', battery: '35 mins', payload: '20kg', topSpeed: '60km/h', signalType: 'SAT-LINK' },
    reviews: MOCK_REVIEWS
  },
  {
    id: '4',
    name: 'BHARAT SPECTER',
    price: 65000,
    description: 'Consumer-grade high-fidelity photography drone with 3-axis gimbal stability.',
    longDescription: 'Capturing the beauty of the subcontinent has never been easier. The Specter features an AI-assisted flight controller that makes cinematic shots accessible to everyone. From the Ghats of Varanasi to the peaks of Ladakh, the Specter is your eye in the sky.',
    image: 'https://images.unsplash.com/photo-1506947411487-a56738267384?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1506947411487-a56738267384?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1527977966376-1c8418f9f108?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Consumer',
    specs: { range: '8km', battery: '30 mins', payload: '0.2kg', topSpeed: '55km/h', signalType: '2.4GHz / 5.8GHz' },
    reviews: MOCK_REVIEWS.slice(1)
  }
];
