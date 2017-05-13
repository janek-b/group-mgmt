export class User {
  role: string = 'member';
  bio: string = '';

  constructor(public displayName: string, public email: string, public photoURL: string, public joined: string) {}
}
