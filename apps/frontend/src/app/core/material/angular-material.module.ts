import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSliderModule } from "@angular/material/slider";

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    MatSliderModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatMenuModule,
    MatExpansionModule,
    MatIconModule,
    MatProgressBarModule,
  ],
})
export class AngularMaterialModule {}
