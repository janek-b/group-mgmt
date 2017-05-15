import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DbService } from '../db.service';
import { AuthService } from '../auth.service';
import { Event } from '../event';
import { User } from '../user';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  members: User[];
  events: Event[];
  user: any = null;
  signedInMember: User;

  eventFilter: string = 'all';
  eventToEdit: Event = null;

  eventEditModal = new EventEmitter<string|MaterializeAction>();

  constructor(private route: ActivatedRoute,
              private location: Location,
              private dbService: DbService,
              private authService: AuthService) { }

  ngOnInit() {
    this.dbService.getMembers()
      .takeUntil(this.ngUnsubscribe).subscribe(members => this.members = members);
    this.dbService.getEvents()
      .takeUntil(this.ngUnsubscribe).subscribe(events => this.events = events);
    this.authService.getCurrentUser()
      .takeUntil(this.ngUnsubscribe).subscribe(currentUser => {
        this.user = currentUser;
        this.dbService.getMember(this.user.uid)
          .takeUntil(this.ngUnsubscribe).subscribe(member => this.signedInMember = member);
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  addAdmin(memberId: string) {
    this.dbService.addAdmin(memberId);
  }

  removeAdmin(memberId: string) {
    this.dbService.removeAdmin(memberId);
  }

  toggleAdmin(checked: boolean, memberId: string) {
    if (checked) {
      this.addAdmin(memberId)
    } else {
      this.removeAdmin(memberId);
    }
  }

  deleteMember(member: User) {
    if (confirm("Are you sure you want to delete this member's account?")) {
      this.dbService.deleteMember(member);
    }
  }

  editEvent(event: Event) {
    this.eventToEdit = event;
    this.openModal();
  }

  deleteEvent(event: Event) {
    if (confirm("Are you sure you want to delete this event?")) {
      this.dbService.deleteEvent(event);
    }
  }

  closeEditForm() {
    this.eventToEdit = null;
    this.closeModal();
  }

  openModal() {
    this.eventEditModal.emit({action:"modal",params:['open']});
  }
  closeModal() {
    this.eventEditModal.emit({action:"modal",params:['close']});
  }

}
