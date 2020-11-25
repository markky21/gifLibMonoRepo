import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "firebase";
import { Observable } from "rxjs";

@Component({
  selector: "mobile-navi",
  templateUrl: "./mobile-navi.component.html",
  styleUrls: ["./mobile-navi.component.scss"],
})
export class MobileNaviComponent implements OnInit {
  @Output("onToggleNavi") onToggleNavi = new EventEmitter<null>();
  loggedIn$: Observable<User>;

  constructor(private angularFireAuth: AngularFireAuth) {}

  ngOnInit(): void {
    this.loggedIn$ = this.angularFireAuth.authState;
  }

  toggleNavi(): void {
    this.onToggleNavi.emit();
  }
}
