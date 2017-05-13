export class User {
  role: string = 'member';
  bio: string = '';
  photoURL: string;

  constructor(public displayName: string, public email: string, photoURL: string, public joined: string) {
    if (photoURL) {
      this.photoURL = photoURL
    } else {
      this.photoURL = 'assets/images/profile-default.jpg';
    }
  }
}
