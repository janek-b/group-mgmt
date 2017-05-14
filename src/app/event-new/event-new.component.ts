import { Component, OnInit } from '@angular/core';
import { Event } from '../event';
import { DbService } from '../db.service';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-new',
  templateUrl: './event-new.component.html',
  styleUrls: ['./event-new.component.scss']
})
export class EventNewComponent implements OnInit {
  newEventForm: FormGroup;
  user: any = null;

  constructor(private dbService: DbService,
              private authService: AuthService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => this.user = user);
    this.newEventForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  addEvent() {
    var {name, location, date, description} = this.newEventForm.value;
    var newEvent = new Event(name, location, (new Date(date).toJSON()), description, this.user.uid);
    this.dbService.addEvent(newEvent);
    this.newEventForm.reset();

  }

}
