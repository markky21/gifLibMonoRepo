import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'gif-lib-mono-repo-email-not-verified',
  templateUrl: './email-not-verified.component.html',
  styleUrls: ['./email-not-verified.component.scss'],
})
export class EmailNotVerifiedComponent {
  constructor(private authService: AuthService) {}

  public resendVerification(): void {
    this.authService.verificationEmailResend();
  }
}
