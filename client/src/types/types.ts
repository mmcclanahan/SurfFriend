export interface Friend {
  userId: number;
  friendId: number;
  request: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  status: number;
  location: string | null;
  rating: number | null;
}
export interface StatusForm {
  status: number;
  location?: string;
  rating: number;
}

export interface Session {
  userId?: number;
  location: string;
  rating: number;
  conditions?: string;
  createdAt?: string;
}

export interface SurfSpot {
  id?: number;
  userId: number;
  name: string;
  city: string;
  timesSurfed?: number;
}

export interface AddSpotFormProps {
  createSpot: (surfSpot: SurfSpot) => void;
  userId: number;
  city?: string;
  cities: string[];
  surfSpots: SurfSpot[];
  setShowSpotForm: (bool: boolean) => void;
}
