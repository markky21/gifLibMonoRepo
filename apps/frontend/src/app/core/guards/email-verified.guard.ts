import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";
import { Observable } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth";
import { filter, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EmailVerifiedGuard implements CanActivate {
  constructor(private angularFire: AngularFireAuth, private router: Router) {
  }
  canActivate(): Observable<boolean> {
    return this.angularFire.authState.pipe(
      filter(user => !!user),
      map(userInfo => {
        if (!userInfo.emailVerified) {
          return this.router.parseUrl('/notVerified');
        }

        return userInfo.emailVerified;
      }));
  }
}
