import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './features/about/about.component';
import { ImageDetailComponent } from './features/image-detail/image-detail.component';
import { UploadFileComponent } from './features/upload-file/upload-file.component';
import { LoginComponent } from './features/login/login.component';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RegisterComponent } from './features/register/register.component';
import { EmailVerifiedGuard } from './core/guards/email-verified.guard';
import { EmailNotVerifiedComponent } from './features/login/email-not-verified/email-not-verified.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['signIn']);
const redirectLoggedInToSearch = () => redirectLoggedInTo(['search']);

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'signIn' },
  {
    path: 'signIn',
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToSearch },
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToSearch },
  },

  {
    path: 'notVerified',
    canActivate: [AngularFireAuthGuard],
    component: EmailNotVerifiedComponent,
  },
  {
    path: 'search',
    canActivate: [AngularFireAuthGuard, EmailVerifiedGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    loadChildren: './features/search-giphy/search-giphy.module#SearchGiphyModule',
  },
  { path: 'about', component: AboutComponent },
  {
    path: 'images/:category/:id',
    canActivate: [AngularFireAuthGuard, EmailVerifiedGuard],
    component: ImageDetailComponent,
  },
  {
    path: 'upload',
    canActivate: [AngularFireAuthGuard, EmailVerifiedGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    component: UploadFileComponent,
  },
  {
    path: 'edit',
    canActivate: [AngularFireAuthGuard, EmailVerifiedGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    loadChildren: './features/edit-gif/edit-gif.module#EditGifModule',
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
