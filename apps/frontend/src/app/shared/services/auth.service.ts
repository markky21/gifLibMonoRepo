import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { auth as firebaseAuth, firestore, User } from 'firebase/app';
import { forkJoin, from, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { LoginErrorComponent } from '../../features/login/error/login-error/login-error.component';
import { NotificationService } from './notification-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private firestore: AngularFirestore,
    private angularFireAuth: AngularFireAuth,
    private notificationService: NotificationService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  public signInByEmailAndPass(email: string, password: string): void {
    const firebaseShot = this.createLibraryIfNotExistingForUser();

    from(this.angularFireAuth.signInWithEmailAndPassword(email, password))
      .pipe(
        map(({ user }) => user.uid),
        switchMap((userId: string) => firebaseShot(userId))
      )
      .subscribe(
        () => this.goToSearch(),
        (msg) => this.signInError(msg)
      );
  }

  public googleSignIn(): void {
    const firebaseShot = this.createLibraryIfNotExistingForUser();

    from(this.angularFireAuth.signInWithPopup(new firebaseAuth.GoogleAuthProvider()))
      .pipe(
        map(({ user }) => user.uid),
        switchMap((userId: string) => firebaseShot(userId))
      )
      .subscribe(() => this.goToSearch());
  }

  public facebookSignIn(): void {
    const firebaseShot = this.createLibraryIfNotExistingForUser();

    from(this.angularFireAuth.signInWithPopup(new firebaseAuth.FacebookAuthProvider()))
      .pipe(
        map(({ user }) => user.uid),
        switchMap((userId: string) => firebaseShot(userId))
      )
      .subscribe(() => this.goToSearch());
  }

  public goToSearch(): void {
    this.ngZone.run(() => {
      this.router.navigate(['search']);
    });
  }

  public signOut(): void {
    this.angularFireAuth.signOut().then(() => this.router.navigate(['signIn']));
  }

  public createUser(email: string, password: string): void {
    const firebaseShot = this.createLibraryIfNotExistingForUser();
    const sendVerification = this.verificationEmailResend();

    from(this.angularFireAuth.createUserWithEmailAndPassword(email, password))
      .pipe(switchMap(({ user }) => forkJoin(sendVerification(user), firebaseShot(user.uid))))
      .subscribe(
        () => {
          this.notificationService.simpleNotification('Verification email sent');
          this.router.navigate(['signIn']);
        },
        (msg) => this.signInError(msg)
      );
  }

  public signInError(msg): void {
    this.notificationService.notificationWithGif(LoginErrorComponent, {
      data: msg,
      duration: 8000,
    });
  }

  public sendResetPassword(email: string): void {
    this.angularFireAuth.sendPasswordResetEmail(email).then(() => this.resetPassNotification());
  }

  public verificationEmailResend(): any {
    return (user: User) => from(user.sendEmailVerification());
  }

  public noPassResetEmail(): void {
    this.notificationService.simpleNotification('Please fill email');
  }

  private resetPassNotification(): void {
    this.notificationService.simpleNotification('Password reset email sent, check your inbox.');
  }

  private createLibraryIfNotExistingForUser() {
    return (userId: string): Observable<firestore.DocumentSnapshot<firestore.DocumentData> | null> =>
      this.firestore
        .doc('users/' + userId)
        .get()
        .pipe(
          switchMap((data: firestore.DocumentSnapshot<firestore.DocumentData>) => {
            if (data.data()) {
              return of(null);
            } else {
              return from(
                this.firestore.firestore
                  .batch()
                  .set(this.firestore.firestore.doc('users/' + userId), {
                    library: {},
                  })
                  .commit()
              );
            }
          })
        );
  }
}
