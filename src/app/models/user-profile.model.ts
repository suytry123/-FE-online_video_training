export interface UserProfile {
  id: number;
  username: string;
  email: string;
  phoneNumber: string | null;
  gender: string | null;
  photo: string | null;
}
