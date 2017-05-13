import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  members: User[];

  constructor(private dbService: DbService,
              private router: Router) { }

  ngOnInit() {
    this.dbService.getUsers().subscribe(users => this.members = users);
  }

  goToDetail(member: any) {
    this.router.navigate(['members', member.$key]);
  }

}
