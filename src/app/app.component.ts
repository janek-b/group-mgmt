import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { AuthService } from './auth.service';
import { DbService } from './db.service';
import { MaterializeAction } from 'angular2-materialize';
import { Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  user: any = null;
  signedInMember: User;
  loginForm: FormGroup;
  currentPage: string[];

  loginModal = new EventEmitter<string|MaterializeAction>();

  constructor(private authService: AuthService,
              private dbService: DbService,
              private fb: FormBuilder,
              private router: Router) {}

  ngOnInit() {
    this.authService.getCurrentUser()
      .takeUntil(this.ngUnsubscribe).subscribe(currentUser => {
        this.user = currentUser
        if (this.user) {
          this.dbService.getMember(this.user.uid)
          .takeUntil(this.ngUnsubscribe).subscribe(member => this.signedInMember = member);
        }
      });
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]]
    })
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      this.currentPage = event['url'].split('/').filter(route => (route));
    })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  loginEmailPass() {
    var {email, password} = this.loginForm.value;
    this.authService.loginEmailPass(email, password).then(result => {
      this.loginForm.reset();
    }).catch((error) => {
      if (error['code'] === 'auth/user-not-found') {
        this.createAccount();
      }
    })
  }

  createAccount() {
    var {email, password} = this.loginForm.value;
    this.authService.createUser(email, password).then(result => {
      this.loginEmailPass();
    }).catch(error => {
      console.log(error);
    })
  }

  loginGoogle() {
    this.authService.loginGoogle();
  }

  logout() {
    this.authService.logout();
  }

  openModal() {
    this.loginModal.emit({action:"modal",params:['open']});
  }
  closeModal() {
    this.loginModal.emit({action:"modal",params:['close']});
  }
}
