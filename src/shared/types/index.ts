export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  data: T;
  error: string | null;
  status: number;
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresAt: Date;
}

export interface PageMeta {
  title: string;
  description: string;
  keywords: string[];
  image: string;
  url: string;
}
