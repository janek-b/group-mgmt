import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../user';
import { Event } from '../event';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../auth.service';
import { DbService } from '../db.service';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  memberId: string;
  member: User;
  events: Event[];
  user: any = null;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private router: Router,
              private dbService: DbService,
              private authService: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.memberId = params['memberId'];
      this.dbService.getMember(this.memberId)
        .takeUntil(this.ngUnsubscribe).subscribe(member => this.member = member);
      this.dbService.getEventsByMember(this.memberId)
        .takeUntil(this.ngUnsubscribe).subscribe(events => this.events = events);
    });
    this.authService.getCurrentUser()
      .takeUntil(this.ngUnsubscribe).subscribe(currentUser => this.user = currentUser);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
