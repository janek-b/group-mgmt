import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../auth.service';
import { DbService } from '../db.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {
  memberId: string;
  member: User;
  user: any = null;

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private dbService: DbService, private authService: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.memberId = params['memberId'];
      this.dbService.getMember(this.memberId).subscribe(member => this.member = member);
    });
    this.authService.getCurrentUser().subscribe(currentUser => {
      this.user = currentUser;
    });
  }

}
