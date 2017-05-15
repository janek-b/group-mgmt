import { Component, OnInit, OnDestroy } from '@angular/core';
import { DbService } from '../db.service';
import { User } from '../user';
import { Router } from '@angular/router';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  members: User[];
  memberFilter: string = 'all';

  constructor(private dbService: DbService,
              private router: Router) { }

  ngOnInit() {
    this.dbService.getMembers()
      .takeUntil(this.ngUnsubscribe).subscribe(members => this.members = members);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  goToDetail(member: any) {
    this.router.navigate(['members', member.$key]);
  }

}
