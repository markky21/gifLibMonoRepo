import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "firebase";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  libraryOpened = false;
  loggedIn$: Observable<User>;

  constructor(private angularFireAuth: AngularFireAuth) {}

  ngOnInit() {
    this.loggedIn$ = this.angularFireAuth.authState;
  }
}
