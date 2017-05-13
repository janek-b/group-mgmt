import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { User } from './user';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.user = afAuth.authState;
    this.user.subscribe(user => {
      if (user) {
        var ref = firebase.database().ref('/users');
        ref.once('value', (snapshot) => {
          if (!snapshot.hasChild(user.uid)) {
            var newUser = new User(user.displayName, user.email, user.photoURL, (new Date).toJSON());
            ref.child(user.uid).set(newUser);
          }
        });
      }
    });

  }


  loginGoogle() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  loginEmailPass(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  getCurrentUser() {
    return this.user;
  }

  createUser(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  updateUserProfile(displayName: string, photoURL: string) {
    return this.afAuth.auth.currentUser.updateProfile({displayName: displayName, photoURL: photoURL});
  }

}
