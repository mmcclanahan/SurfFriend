export interface Friend {
  user_id: string;
  friend_id: string;
  request: string;
  createdAt: string;
  display_name: string;
  status: number;
  city: string | null;
  spot_name: string | null;
  rating: number | null;
}

export interface StatusForm {
  id: number;
  status: number;
  city?: string;
  spot_name?: string;
  rating: number;
  statusId: number;
}

export interface Session {
  user_id: number;
  city: string;
  spot_name: string;
  rating: number;
  diary?: string;
  //conditions?: string;
}

export interface SurfSpot {
  id: number;
  city: string;
  spot_name: string;
  times_surfed: number;
}

export interface AddSpotFormProps {
  addSpot: (surfSpot: SurfSpot) => { error: string } | { data: SurfSpot };
  userId: number;
  city: string;
  cities: string[];
  surfSpots: SurfSpot[];
}

export interface ConfirmProps {
  header: string;
  confirmFn: () => void;
  backFn: () => void;
  info: string[];
}

export interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface CityCardProps {
  city: string;
  spots: number;
  selectCity: (city: string) => void;
  selectedCity: string;
}
