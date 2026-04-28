
export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Drone {
  id: string;
  name: string;
  price: number;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  category: 'Recon' | 'Attack' | 'Logistics' | 'Consumer';
  specs: {
    range: string;
    battery: string;
    payload: string;
    topSpeed: string;
    signalType: string;
  };
  reviews: Review[];
}

export type ViewState = 'landing' | 'solutions' | 'technology' | 'about';
