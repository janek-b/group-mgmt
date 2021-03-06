import { Component, OnInit, OnDestroy } from '@angular/core';
import { Event } from '../event';
import { DbService } from '../db.service';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-event-new',
  templateUrl: './event-new.component.html',
  styleUrls: ['./event-new.component.scss']
})
export class EventNewComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  newEventForm: FormGroup;
  user: any = null;

  constructor(private dbService: DbService,
              private authService: AuthService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.authService.getCurrentUser()
      .takeUntil(this.ngUnsubscribe).subscribe(user => this.user = user);
    this.newEventForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  addEvent() {
    var {name, location, date, description} = this.newEventForm.value;
    var newEvent = new Event(name, location, (new Date(date).toJSON()), description, this.user.uid);
    this.dbService.addEvent(newEvent);
    this.newEventForm.reset();
    this.router.navigate(['events']);
  }

}
