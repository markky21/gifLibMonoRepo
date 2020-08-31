import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { auth as firebaseAuth } from "firebase/app";

import { LoginErrorComponent } from "../../features/login/error/login-error/login-error.component";
import { NotificationService } from "./notification-service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private angularFireAuth: AngularFireAuth,
    private notificationService: NotificationService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  public signInByEmailAndPass(email: string, password: string): void {
    this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => this.goToSearch())
      .catch((msg) => this.signInError(msg));
  }

  public googleSignIn(): void {
    this.angularFireAuth
      .signInWithPopup(new firebaseAuth.GoogleAuthProvider())
      .then(() => this.goToSearch());
  }

  public facebookSignIn(): void {
    this.angularFireAuth
      .signInWithPopup(new firebaseAuth.FacebookAuthProvider())
      .then(() => this.goToSearch());
  }

  public goToSearch(): void {
    this.ngZone.run(() => {
      this.router.navigate(['search']);
    });
  }

  public signOut(): void {
    this.angularFireAuth.signOut().then(() => this.router.navigate(["signIn"]));
  }

  public createUser(email: string, password: string): void {
    this.angularFireAuth.createUserWithEmailAndPassword(email, password)
      .then(() => this.verificationEmailResend())
      .catch((msg) => this.signInError(msg));
  }

  public signInError(msg): void {
    this.notificationService.notificationWithGif(LoginErrorComponent, {
      data: msg,
      duration: 8000
    });
  }

  public sendResetPassword(email: string): void {
    this.angularFireAuth
      .sendPasswordResetEmail(email).then(() => this.resetPassNotification());
  }

  public verificationEmailResend(): void {
    this.angularFireAuth.currentUser.then((user) => {
      user.sendEmailVerification().then(() =>
        this.notificationService.simpleNotification('Verification email sent'));
        this.router.navigate(
          ['signIn']);
    });
  }

  public noPassResetEmail(): void {
    this.notificationService.simpleNotification('Please fill email');
  }

  private resetPassNotification(): void {
    this.notificationService.simpleNotification('Password reset email sent, check your inbox.');
  }
}
