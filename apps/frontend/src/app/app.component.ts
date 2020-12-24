import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  libraryOpened = false;
  mobileNaviSidenavOpened = false;
  loggedIn$: Observable<User>;

  constructor(private angularFireAuth: AngularFireAuth, private authService: AuthService) {}

  ngOnInit() {
    this.loggedIn$ = this.angularFireAuth.authState;
  }

  public toggleMobileNaviSideNav(): void {
    if (this.libraryOpened) {
      this.toggleLibrarySideNav();
    }
    this.mobileNaviSidenavOpened = !this.mobileNaviSidenavOpened;
  }

  public toggleLibrarySideNav(): void {
    if (this.mobileNaviSidenavOpened) {
      this.toggleMobileNaviSideNav();
    }

    this.libraryOpened = !this.libraryOpened;
  }
}
