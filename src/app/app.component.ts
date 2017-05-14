import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { AuthService } from './auth.service';
import { MaterializeAction } from 'angular2-materialize';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user: any = null;
  loginForm: FormGroup;
  currentPage: string[];

  loginModal = new EventEmitter<string|MaterializeAction>();

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private location: Location,
              private router: Router) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(currentUser => {
      this.user = currentUser;
    });
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]]
    })
    // this.location.subscribe(location => {
    //   console.log(location)
    // })
    // console.log(this.location.path().split('/'));
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      this.currentPage = event['url'].split('/').filter(route => (route));
    })
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
