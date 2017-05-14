import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DbService } from '../db.service';
import { AuthService } from '../auth.service';
import { Event } from '../event';
import { User } from '../user';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
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
      this.dbService.getEvent(this.eventId).subscribe(event => this.event = event);
      this.dbService.getMembersByEvent(this.eventId).subscribe(members => this.members = members);
    });
    this.authService.getCurrentUser().subscribe(currentUser => {
      this.user = currentUser;
    });
  }

  attend(eventId: string) {
    this.dbService.addAttendingMember(eventId, this.user.uid).then(result => console.log(result));
  }



}
