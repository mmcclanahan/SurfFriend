export interface Friend {
  id: number;
  displayName: string;
  status: number;
  location?: string;
  rating?: number;
  sessionTime?: string;
}
export interface StatusForm {
  status: string;
  location?: string;
  rating?: string;
}
