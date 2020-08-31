import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AboutComponent } from "./features/about/about.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModule } from "./core/shared.module";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { GifLibraryComponent } from "./features/gif-library/gif-library.component";
import { AngularFireModule } from "@angular/fire";
import { environment } from "../environments/environment";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularMaterialModule } from "./core/material/angular-material.module";
import { LibrarySortPipe } from "./features/gif-library/library-sort.pipe";
import { LoadingIndicatorComponent } from "./shared/components/loading-indicator/loading-indicator.component";
import { AngularLoadingBarModule } from "@loadingio/angular-loading-bar";
import { ImageDetailComponent } from "./features/image-detail/image-detail.component";
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarModule,
} from "@angular/material/snack-bar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { LibrarySaveSnackComponent } from "./shared/components/library-save-snack/library-save-snack.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { UploadFileComponent } from "./features/upload-file/upload-file.component";
import { LibraryImageComponent } from "./features/gif-library/library-image/library-image.component";
import { CopiedNotificationComponent } from "./features/gif-library/library-image/shared/copied-notification.component";
import { LoginComponent } from "./features/login/login.component";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireAuthGuardModule } from "@angular/fire/auth-guard";
import { RegisterComponent } from "./features/register/register.component";
import { LoginErrorComponent } from './features/login/error/login-error/login-error.component';
import { EmailNotVerifiedComponent } from './features/login/email-not-verified/email-not-verified.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageDetailComponent,
    AboutComponent,
    GifLibraryComponent,
    LibrarySortPipe,
    LoadingIndicatorComponent,
    LibrarySaveSnackComponent,
    UploadFileComponent,
    LibraryImageComponent,
    CopiedNotificationComponent,
    LoginComponent,
    RegisterComponent,
    LoginErrorComponent,
    EmailNotVerifiedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    AngularMaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    AngularFirestoreModule,
    AngularLoadingBarModule,
    MatSnackBarModule,
    MatSidenavModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
  ],
  entryComponents: [LibrarySaveSnackComponent, CopiedNotificationComponent],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: GifInterceptor, multi: true },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3000 } },
  ],
  bootstrap: [AppComponent],
  exports: [SharedModule],
})
export class AppModule {}
