export interface UserAttributes {
  id: number;
  username: string;
  email: string;
  salt?: string;
  sessiontoken?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
