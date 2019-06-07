import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './features/about/about.component';
import { ImageDetailComponent } from './features/image-detail/image-detail.component';
import { UploadFileComponent } from './features/upload-file/upload-file.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', loadChildren: './features/search-giphy/search-giphy.module#SearchGiphyModule'},
  {path: 'about', component: AboutComponent},
  {path: 'images/:category/:id', component: ImageDetailComponent },
  {path: 'upload', component: UploadFileComponent },
  {path: 'edit', loadChildren: './features/edit-gif/edit-gif.module#EditGifModule'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
