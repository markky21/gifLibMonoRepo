import { Component, OnInit } from "@angular/core";
import { NotificationService } from "apps/frontend/src/app/shared/services/notification-service";

@Component({
  selector: "app-copied-notification",
  templateUrl: "./copied-notification.component.html",
  styleUrls: ["./copied-notification.component.scss"],
})
export class CopiedNotificationComponent {
  constructor(private notificationService: NotificationService) {}

  public close(): void {
    this.notificationService.closeNotification();
  }
}
