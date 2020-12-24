import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, AngularMaterialModule],
  exports: [CommonModule, ReactiveFormsModule, FormsModule, AngularMaterialModule],
})
export class SharedModule {}
