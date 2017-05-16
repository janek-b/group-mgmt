import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { DbService } from '../db.service';
import { AuthService } from '../auth.service';
import { Event } from '../event';
import { User } from '../user';
import * as moment from 'moment';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit {
  @Input() event: any;
  @Input() user: any;
  @Output() closeSender = new EventEmitter();
  editEventForm: FormGroup;

  constructor(private db: DbService,
              private authService: AuthService,
              private fb: FormBuilder) { }

  ngOnInit() {
    // this.editEventForm = this.fb.group({
    //   name: [this.event.name, Validators.required],
    //   location: [this.event.location, Validators.required],
    //   date: [moment(this.event.date).format('DD MMMM, YYYY'), Validators.required],
    //   description: [this.event.description, Validators.required]
    // })
  }

  closeEditForm() {
    this.closeSender.emit();
  }

  updateEvent() {
    // var {name, location, date, description} = this.editEventForm.value;
    // var updateValues = {name: name, location: location, date: (new Date(date).toJSON()), description: description}
    // this.dbService.updateEvent(this.event.$key, updateValues);
    this.closeSender.emit();
  }

}
