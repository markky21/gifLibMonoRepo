import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public forgetPassStyle = {
    color: 'blue',
    cursor: 'pointer',
  };

  constructor(private auth: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  get email(): string {
    return this.loginForm.get('email').value;
  }

  get password(): string {
    return this.loginForm.get('password').value;
  }

  get formValid(): boolean {
    return this.loginForm.valid;
  }

  public signInEmailPass(): void {
    if (this.formValid) {
      this.auth.signInByEmailAndPass(this.email, this.password);
    }
  }

  public sendResetPassword(): void {
    if (this.email) {
      this.auth.sendResetPassword(this.email);
    } else {
      this.auth.noPassResetEmail();
    }
  }

  public googleLogin(): void {
    this.auth.googleSignIn();
  }

  public facebookLogin(): void {
    this.auth.facebookSignIn();
  }
}
