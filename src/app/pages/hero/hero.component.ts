import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from 'src/app/models/hero.interface';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit{

  public hero?: Hero

  constructor (private heroesSevice: HeroesService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
      this.activatedRoute.params.pipe(
        switchMap( ({id}) => this.heroesSevice.getHeroById(id))
      ).pipe(
        delay(1500)
      ).subscribe(
        hero => {
          if (!hero) return this.router.navigate(['/heroes/list'])

          this.hero = hero;
          return;
        }
      )
  }

  public goBack(): void {
    this.router.navigateByUrl('heroes/list');
  }
}
