export class User {

  id: string;
  name: string;
  email: string;
  password: string;

  constructor(id: string, name: string, email: string, password: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  getDisplayName(): string {

    if (this.name.trim().length > 0) {

      return this.name;

    }

 

    return this.email;

  }

 

  isValidEmail(): boolean {

    return this.email.includes("@") && this.email.includes(".");

  }

}