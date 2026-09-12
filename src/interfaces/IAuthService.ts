import { User } from "../models/User";

export interface IAuthService {

  register(user: User): void;
  login(email: string, password: string): User | null;
  logout(): void;
  getCurrentUser(): User | null;
}