import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';
import { DbService } from '../db.service';
import { User } from '../user';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  
  @Input() member: any;
  editForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private router: Router,
              private dbService: DbService,
              private authService: AuthService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.editForm = this.fb.group({
      displayName: [''],
      photoURL: [''],
      bio: ['']
    })
    this.editForm.reset({
      displayName: this.member.displayName,
      photoURL: this.member.photoURL,
      bio: this.member.bio
    })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  updateMember() {
    var {displayName, photoURL, bio} = this.editForm.value;
    this.authService.updateUserProfile(displayName, photoURL).then(() => {
      this.dbService.updateMember(this.member.$key, this.editForm.value);
    });
  }

}
