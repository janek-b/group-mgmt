import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';
import { User } from '../user';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  members: User[];

  constructor(private dbService: DbService) { }

  ngOnInit() {
    this.dbService.getUsers().subscribe(users => this.members = users);
  }

}
