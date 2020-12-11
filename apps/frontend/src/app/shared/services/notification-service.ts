import { Component, Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { ComponentType } from "@angular/cdk/overlay";

// TODO: Fix notification style on mobiles

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  constructor(private notify: MatSnackBar) {}

  public notificationWithGif(
    component: ComponentType<any>,
    config?: MatSnackBarConfig
  ): void {
    this.notify.openFromComponent(component, {
      data: config ? config.data : "Error",
      duration: config ? config.duration : 5000,
    });
  }

  public simpleNotification(
    msg: string,
    action?: string,
    config?: MatSnackBarConfig
  ): void {
    this.notify.open(msg, action, {
      duration: config ? config.duration : 5000,
    });
  }

  public closeNotification(): void {
    this.notify.dismiss();
  }
}
