import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { filter, map } from 'rxjs/operators';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class EmailVerifiedGuard implements CanActivate {
  constructor(private angularFire: AngularFireAuth, private router: Router) {}
  canActivate(): Observable<boolean | UrlTree> {
    return this.angularFire.authState.pipe(
      filter((user: User) => !!user),
      map((userInfo: User) => {
        if (!userInfo.emailVerified) {
          return this.router.parseUrl('/notVerified');
        }

        return userInfo.emailVerified;
      })
    );
  }
}
