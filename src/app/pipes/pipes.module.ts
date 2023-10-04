import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroImagePipe } from './hero-image-pipe/hero-image.pipe';



@NgModule({
  declarations: [
    HeroImagePipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    HeroImagePipe
  ]
})
export class PipesModule { }
