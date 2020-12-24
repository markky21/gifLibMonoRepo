import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../core/shared.module';

import { EditGifComponent } from './edit-gif.component';

const routes: Routes = [{ path: '', component: EditGifComponent }];

@NgModule({
  declarations: [EditGifComponent],
  imports: [SharedModule, RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class EditGifModule {}
