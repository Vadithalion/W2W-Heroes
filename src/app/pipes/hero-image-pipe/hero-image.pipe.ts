import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from 'src/app/models/hero.interface';

@Pipe({
  name: 'heroImagePipe'
})
export class HeroImagePipe implements PipeTransform {

  transform( hero: Hero ): string {
    return hero.alt_img ? hero.alt_img : 'assets/no-image.png'
  }

}
