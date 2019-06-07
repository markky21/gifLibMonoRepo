import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatButtonToggleModule,
  MatCardModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule, MatProgressBarModule, MatSliderModule
} from '@angular/material';
import { MatVideoModule } from 'mat-video';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    MatSliderModule,
    MatVideoModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatMenuModule,
    MatExpansionModule,
    MatIconModule,
    MatProgressBarModule
  ]
})
export class AngularMaterialModule { }
