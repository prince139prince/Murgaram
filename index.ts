export interface IUser {
  uid: string;
  murgaRamId: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  coverImage: string;
  bio: string;
  followers: number;
  following: number;
  posts: number;
  online: boolean;
  lastSeen: string;
  createdAt: string;
}