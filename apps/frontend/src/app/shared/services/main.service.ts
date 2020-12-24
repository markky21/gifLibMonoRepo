import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { from, Observable, of, Subject } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { MatSnackBarConfig } from '@angular/material/snack-bar';

import { LibraryType } from '../../features/gif-library/shared/library.type';
import { GIFObject } from '../../core/types/gif-object.type';
import { LibrarySaveSnackComponent } from '../components/library-save-snack/library-save-snack.component';
import { NotificationService } from './notification-service';
import { AngularFireAuth } from '@angular/fire/auth';
import { firestore, User } from 'firebase';
import { LoginErrorComponent } from '../../features/login/error/login-error/login-error.component';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  public libraryUpdate = new Subject<void>();
  public saveState = new Subject<boolean>();
  public spinner = new Subject<boolean>();
  public progress = new Subject<number>();

  private library: LibraryType | {} = {};
  private firebaseLibrary: AngularFirestoreDocument;

  constructor(
    private fireAuth: AngularFireAuth,
    private fireDB: AngularFirestore,
    private notificationService: NotificationService
  ) {}

  public transferToLibrary(category: string, item: GIFObject): any {
    const categories = Object.entries(this.library).map((entry) => entry[0]);

    if (categories.indexOf(category) < 0) {
      this.library[category] = {
        allImages: [],
        searchDate: new Date().toLocaleString('pl-PL'),
      };
    }

    this.library[category].allImages.push(item);
    this.library[category].searchDate = new Date().toLocaleString('pl-PL');
    this.libraryUpdate.next();
    this.saveState.next(true);
  }

  public getLibrary(): LibraryType | {} {
    return { ...this.library };
  }

  public deleteCategory(category: string): void {
    delete this.library[category];
    this.libraryUpdate.next();
    this.saveState.next(true);
  }

  public loadFirebaseData(): void {
    const firebaseShot = this.initLibraryIfEmpty();

    this.spinner.next(true);
    const fireBase = this.fireAuth.user.pipe(
      take(1),
      filter((usrData) => !!usrData),
      map((usrData: User) => usrData.uid),
      switchMap((userId: string) => firebaseShot(userId))
    );

    fireBase.subscribe((firebaseData) => {
      console.log(firebaseData);
      this.library = { ...firebaseData };
      this.libraryUpdate.next();
      this.saveState.next(false);
      this.spinner.next(false);
    });
  }

  public notifyMessage(message: string, config?: MatSnackBarConfig): void {
    this.notificationService.simpleNotification(message, 'Close', config);
  }

  public saveNotify(): void {
    this.notificationService.notificationWithGif(LibrarySaveSnackComponent);
  }

  public saveLibraryToFirebase(): void {
    const library = this.library;
    const batch = this.fireDB.firestore.batch();
    const fireLibraryRef = (userId: string) => this.fireDB.firestore.doc('users/' + userId);

    from(this.fireAuth.currentUser)
      .pipe(switchMap((user: User) => from(batch.set(fireLibraryRef(user.uid), { library }).commit())))
      .subscribe(
        () => {
          this.saveNotify();
          this.saveState.next(false);
        },
        (errorMsg) =>
          this.notificationService.notificationWithGif(LoginErrorComponent, {
            data: errorMsg,
            duration: 8000,
          })
      );
  }

  public getImage(category: string, id: number): any {
    return this.library[category].allImages[id];
  }

  public deleteImage(category: string, image: GIFObject): void {
    const imageToRm = this.library[category].allImages.findIndex((inLibrary) => inLibrary.id === image.id);

    this.library[category].allImages.splice(imageToRm, 1);
    this.libraryUpdate.next();
  }

  private initLibraryIfEmpty() {
    return (userId: string): Observable<firestore.DocumentSnapshot<firestore.DocumentData> | null> =>
      this.fireDB
        .doc('users/' + userId)
        .get()
        .pipe(
          switchMap((data: firestore.DocumentSnapshot<firestore.DocumentData>) => {
            if (data.data()) {
              return of(data.data().library);
            } else {
              return from(
                this.fireDB.firestore
                  .batch()
                  .set(this.fireDB.firestore.doc('users/' + userId), {
                    library: {},
                  })
                  .commit()
              );
            }
          })
        );
  }
}
