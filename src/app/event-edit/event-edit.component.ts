import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DbService } from '../db.service';
import { Event } from '../event';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit {
  @Input() event: any;
  @Output() closeSender = new EventEmitter();

  constructor(private db: DbService) { }

  ngOnInit() {

  }

  closeEditForm() {
    this.closeSender.emit();
  }

}
