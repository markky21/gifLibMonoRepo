import { Component } from '@angular/core';
import { NotificationService } from '../../services/notification-service';

@Component({
  selector: 'app-library-save-snack',
  templateUrl: './library-save-snack.component.html',
  styleUrls: ['./library-save-snack.component.scss'],
})
export class LibrarySaveSnackComponent {
  public notificationImage = 'https://media.giphy.com/media/UBVE6ZGaZDX7a/giphy.gif';

  public close(): void {
    this.notificationService.closeNotification();
  }

  constructor(private notificationService: NotificationService) {}
}
