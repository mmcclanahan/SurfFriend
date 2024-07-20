export interface Friend {
  userId: number;
  friendId: number;
  request: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  status: number;
  city: string | null;
  spotName: string | null;
  rating: number | null;
}

export interface StatusForm {
  status: number;
  city?: string;
  spotName?: string;
  rating: number;
}

export interface Session {
  userId?: number;
  city: string;
  spotName: string;
  rating: number;
  conditions?: string;
  createdAt: string;
}

export interface SurfSpot {
  id: number;
  userId: number;
  city: string;
  spotName: string;
  timesSurfed?: number;
}

export interface AddSpotFormProps {
  createSpot: (surfSpot: SurfSpot) => void;
  userId: number;
  city: string;
  cities: string[];
  surfSpots: SurfSpot[];
}
