import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'gif-lib-mono-repo-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;

  constructor(private auth: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  get email(): string {
    return this.registerForm.get('email').value;
  }

  get password(): string {
    return this.registerForm.get('password').value;
  }

  get formValid(): boolean {
    return this.registerForm.valid;
  }

  public registerUser(): void {
    if (this.formValid) {
      this.auth.createUser(this.email, this.password);
    }
  }
}
