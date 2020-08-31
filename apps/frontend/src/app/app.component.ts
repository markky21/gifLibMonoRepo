import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from "./shared/services/auth.service";
import { distinctUntilChanged, filter, tap } from "rxjs/operators";
import { NotificationService } from "./shared/services/notification-service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  libraryOpened = false;
  loggedIn$;

  constructor(
    private httpClient: HttpClient,
    private angularFireAuth: AngularFireAuth,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.loggedIn$ = this.angularFireAuth.authState;
  }

  public logOut() {
    this.authService.signOut();
  }
}
