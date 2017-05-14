import { Component, OnInit } from '@angular/core';
import { Event } from '../event';
import { DbService } from '../db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  events: Event[];

  constructor(private dbService: DbService,
              private router: Router) { }

  ngOnInit() {
    this.dbService.getEvents().subscribe(events => this.events = events);
  }

  goToDetail(event: any) {
    this.router.navigate(['events', event.$key]);
  }

}
