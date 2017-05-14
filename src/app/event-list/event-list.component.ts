import { Component, OnInit, OnDestroy } from '@angular/core';
import { Event } from '../event';
import { DbService } from '../db.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  events: Event[];

  constructor(private dbService: DbService,
              private router: Router) { }

  ngOnInit() {
    this.dbService.getEvents()
      .takeUntil(this.ngUnsubscribe).subscribe(events => this.events = events);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  goToDetail(event: any) {
    this.router.navigate(['events', event.$key]);
  }

}
