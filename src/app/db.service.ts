import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
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

  deleteMember(member: any) {
    if (member.events) {
      Object.keys(member.events).forEach(event => this.removeAttendingMember(event, member.$key));
    }
    this.users.remove(member.$key);
  }

  getEvents() {
    return this.events;
  }

  addEvent(newEvent: Event) {
    this.events.push(newEvent);
  }

  getEvent(eventId: string) {
    return this.db.object('/events/'+eventId);
  }

  getEventOnce(eventId: string) {
    return firebase.database().ref('/events/'+eventId).once('value');
  }

  addAttendingMember(eventId: string, memberId: string) {
    var updates = {};
    updates['/events/' + eventId + '/members/' + memberId] = true;
    updates['/users/' + memberId + '/events/' + eventId] = true;
    return firebase.database().ref().update(updates);
  }

  removeAttendingMember(eventId: string, memberId: string) {
    var updates = {};
    updates['/events/' + eventId + '/members/' + memberId] = null;
    updates['/users/' + memberId + '/events/' + eventId] = null;
    return firebase.database().ref().update(updates);
  }

  getMembersByEvent(eventId: string) {
    return this.db.list('/events/'+eventId+'/members').switchMap((items) => {
      return items.length === 0 ? Observable.of([]) : Observable.combineLatest(...items.map(item => this.getMember(item.$key)))
    });
  }

  getEventsByMember(memberId: string) {
    return this.db.list('/users/'+memberId+'/events').switchMap((items) => {
      return items.length === 0 ? Observable.of([]) : Observable.combineLatest(...items.map(item => this.getEvent(item.$key)));
    })
  }


}
