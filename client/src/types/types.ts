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
