import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';
import { DbService } from '../db.service';
import { User } from '../user';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
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
  }

}
