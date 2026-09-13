import type { IAuthService } from "../interfaces/IAuthService";

import { User } from "../models/User";

 

type StoredUser = {

  id: string;

  name: string;

  email: string;

  password: string;

};

 

export class AuthService implements IAuthService {

  private usersKey = "event_app_users";

  private currentUserKey = "event_app_current_user";

 

  private getUsers(): User[] {

    const usersJson = localStorage.getItem(this.usersKey);

 

    if (!usersJson) {

      return [];

    }

 

    const parsedUsers: StoredUser[] = JSON.parse(usersJson);

 

    return parsedUsers.map(

      (user) => new User(user.id, user.name, user.email, user.password)

    );

  }

 

  private saveUsers(users: User[]): void {

    localStorage.setItem(this.usersKey, JSON.stringify(users));

  }

 

  register(user: User): void {

    const users = this.getUsers();

 

    const existingUser = users.find(

      (savedUser) => savedUser.email.toLowerCase() === user.email.toLowerCase()

    );

 

    if (existingUser) {

      throw new Error("Korisnik sa ovim e-mailom već postoji.");

    }

 

    if (!user.isValidEmail()) {

      throw new Error("Unesite ispravnu e-mail adresu.");

    }

 

    if (user.password.length < 6) {

      throw new Error("Lozinka mora imati najmanje 6 karaktera.");

    }

 

    users.push(user);

    this.saveUsers(users);

  }

 

  login(email: string, password: string): User | null {

    const users = this.getUsers();

 

    const foundUser = users.find(

      (user) =>

        user.email.toLowerCase() === email.toLowerCase() &&

        user.password === password

    );

 

    if (!foundUser) {

      return null;

    }

 

    localStorage.setItem(this.currentUserKey, JSON.stringify(foundUser));

    return foundUser;

  }

 

  logout(): void {

    localStorage.removeItem(this.currentUserKey);

  }

 

  getCurrentUser(): User | null {

    const currentUserJson = localStorage.getItem(this.currentUserKey);

 

    if (!currentUserJson) {

      return null;

    }

 

    const user: StoredUser = JSON.parse(currentUserJson);

 

    return new User(user.id, user.name, user.email, user.password);

  }

}

 

export const authService = new AuthService();