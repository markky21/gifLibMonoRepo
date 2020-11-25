import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { Subject } from "rxjs";
import { take } from "rxjs/operators";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

import { LibraryType } from "../../features/gif-library/shared/library.type";
import { GIFObject } from "../../core/types/gif-object.type";
import { LibrarySaveSnackComponent } from "../components/library-save-snack/library-save-snack.component";
import { NotificationService } from "./notification-service";

@Injectable({
  providedIn: "root",
})
export class MainService {
  public libraryUpdate = new Subject<void>();
  public saveState = new Subject<boolean>();
  public spinner = new Subject<boolean>();
  public progress = new Subject<number>();

  private library: LibraryType | {} = {};
  private firebaseLibrary: AngularFirestoreDocument;

  constructor(
    private fireDB: AngularFirestore,
    private notificationService: NotificationService
  ) {}

  public transferToLibrary(category: string, item: GIFObject): any {
    const categories = Object.entries(this.library).map((entry) => entry[0]);

    if (categories.indexOf(category) < 0) {
      this.library[category] = {
        allImages: [],
        searchDate: new Date().toLocaleString("pl-PL"),
      };
    }

    this.library[category].allImages.push(item);
    this.library[category].searchDate = new Date().toLocaleString("pl-PL");
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
    this.spinner.next(true);
    this.firebaseLibrary = this.fireDB.doc("user/kuba/data/library");

    this.firebaseLibrary
      .get()
      .pipe(take(1))
      .subscribe((firebaseData) => {
        this.library = { ...firebaseData.data().library };
        this.libraryUpdate.next();
        this.saveState.next(false);
        this.spinner.next(false);
      });
  }

  public notifyMessage(message: string, config?: MatSnackBarConfig): void {
    this.notificationService.simpleNotification(message, "Close", config);
  }

  public saveNotify(): void {
    this.notificationService.notificationWithGif(LibrarySaveSnackComponent);
  }

  public saveLibraryToFirebase(): void {
    const library = this.library;
    const batch = this.fireDB.firestore.batch();
    const fireLibraryRef = this.fireDB.firestore.doc("user/kuba/data/library");

    batch
      .set(fireLibraryRef, { library })
      .commit()
      .then(() => {
        this.saveNotify();
      })
      .catch((error) => {
        console.log(error);
      });

    this.saveState.next(false);
  }

  public getImage(category: string, id: number): any {
    return this.library[category].allImages[id];
  }

  public deleteImage(category: string, image: GIFObject): void {
    const imageToRm = this.library[category].allImages.findIndex(
      (inLibrary) => inLibrary.id === image.id
    );

    this.library[category].allImages.splice(imageToRm, 1);
    this.libraryUpdate.next();
  }
}
