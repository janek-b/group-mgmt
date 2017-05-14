import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DbService } from '../db.service';
import { AuthService } from '../auth.service';
import { Event } from '../event';
import { User } from '../user';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

declare var Materialize: any;


@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  eventId: string;
  event: Event;
  members: User[];
  user: any = null;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private dbService: DbService,
              private authService: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.eventId = params['eventId'];
      this.dbService.getEvent(this.eventId)
        .takeUntil(this.ngUnsubscribe).subscribe(event => this.event = event);
      this.dbService.getMembersByEvent(this.eventId)
        .takeUntil(this.ngUnsubscribe).subscribe(members => this.members = members);
    });
    this.authService.getCurrentUser()
      .takeUntil(this.ngUnsubscribe).subscribe(currentUser => this.user = currentUser);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  attend(eventId: string) {
    this.dbService.addAttendingMember(eventId, this.user.uid).then(result => {
      Materialize.toast('RSVP confirmed', 4000);
    });
  }

  unAttend(eventId: string) {
    this.dbService.removeAttendingMember(eventId, this.user.uid).then(result => {
      Materialize.toast('RSVP cancelled', 4000);
    });
  }



}
