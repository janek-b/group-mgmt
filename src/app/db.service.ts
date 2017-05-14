import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { User } from './user';
import { Event } from './event';

@Injectable()
export class DbService {
  users: FirebaseListObservable<any>;
  events: FirebaseListObservable<any>;

  constructor(private db: AngularFireDatabase) {
    this.users = db.list('/users');
    this.events = db.list('/events');
  }

  getMembers() {
    return this.users;
  }

  getMember(memberId: string) {
    return this.db.object('/users/'+memberId);
  }

  getMemberOnce(memberId: string) {
    return firebase.database().ref('/users/'+memberId).once('value');
  }

  updateMember(memberId: string, updateValues: any) {
    this.users.update(memberId, updateValues);
  }

  getEvents() {
    return this.events;
  }

  addEvent(newEvent: Event) {
    this.events.push(newEvent);
  }

  getEventOnce(eventId: string) {
    return firebase.database().ref('/events/'+eventId).once('value');
  }

}
