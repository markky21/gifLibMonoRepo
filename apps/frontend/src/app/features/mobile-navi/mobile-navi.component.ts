import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "firebase";
import { Observable } from "rxjs";
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: "mobile-navi",
  templateUrl: "./mobile-navi.component.html",
  styleUrls: ["./mobile-navi.component.scss"],
})
export class MobileNaviComponent implements OnInit {
  loggedIn$: Observable<User>;

  constructor(
    private authService: AuthService,
    private angularFireAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.loggedIn$ = this.angularFireAuth.authState;
  }

  public logOut(): void {
    this.authService.signOut();
  }
}
