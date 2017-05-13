import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { User } from './user';

@Injectable()
export class DbService {
  users: FirebaseListObservable<any>;

  constructor(private db: AngularFireDatabase) {
    this.users = db.list('/users');
  }

  getUsers() {
    return this.users;
  }

  getMember(memberId: string) {
    return this.db.object('/users/'+memberId);
  }

}
