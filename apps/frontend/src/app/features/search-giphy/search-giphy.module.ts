import { NgModule } from '@angular/core';
import { SearchGiphyComponent } from './search-giphy.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../core/shared.module';
import { SearchGiphyService } from './service/search-giphy.service';
import { DragDropModule } from '@angular/cdk/drag-drop';

const routes: Routes = [{ path: '', component: SearchGiphyComponent }];

@NgModule({
  declarations: [SearchGiphyComponent],
  imports: [SharedModule, RouterModule.forChild(routes), ReactiveFormsModule, DragDropModule],
  providers: [SearchGiphyService],
  exports: [RouterModule],
})
export class SearchGiphyModule {}
