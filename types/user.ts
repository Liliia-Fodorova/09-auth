export type User = {
  email: string;
  username: string;
  avatar: string;
};

export type UpdateUserRequest = {
  username?: string;
  photoUrl?: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};