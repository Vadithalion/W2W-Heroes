import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { Hero } from 'src/app/models/hero.interface';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent {

  public searchInput = new FormControl('')

  public heroes: Hero[] = [];
  public selectedHero?: Hero

  constructor (private heroesService: HeroesService, private router: Router) {

  }

  searchHero(): void {
    const value: string = this.searchInput.value || '';

    this.heroesService.onSearchHeroes(value).subscribe(
      heroes => this.heroes = heroes
    )
  }

  onSelectedOption(event: MatAutocompleteSelectedEvent): void {
    if (!event.option.value) {
      this.selectedHero = undefined;
      return;
    }

    const hero: Hero = event.option.value;
    this.searchInput.setValue(hero.superhero);
    this.selectedHero = hero;

    this.router.navigate(['/heroes', hero.id])
  }
}
