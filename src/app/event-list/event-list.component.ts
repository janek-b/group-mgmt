import { Component, OnInit } from '@angular/core';
import { Event } from '../event';
import { DbService } from '../db.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  events: Event[];

  constructor(private dbService: DbService) { }

  ngOnInit() {
    this.dbService.getEvents().subscribe(events => this.events = events);
  }

}
