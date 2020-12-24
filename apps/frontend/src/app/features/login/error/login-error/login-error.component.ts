import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'gif-lib-mono-repo-login-error',
  templateUrl: './login-error.component.html',
  styleUrls: ['./login-error.component.scss'],
})
export class LoginErrorComponent {
  public notificationImage = 'https://media.giphy.com/media/1xkOj5yXBd6N3GNXzc/giphy.gif';

  constructor(@Inject(MAT_SNACK_BAR_DATA) public msg: any) {}
}
