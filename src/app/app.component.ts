import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user: any = null;
  loginForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(currentUser => this.user = currentUser);
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]]
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
}
