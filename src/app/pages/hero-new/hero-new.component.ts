import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, filter, switchMap, tap } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { HeroesService } from '../../services/heroes.service';
import { Publisher, Hero } from 'src/app/models/hero.interface';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-hero-new',
  templateUrl: './hero-new.component.html',
  styleUrls: ['./hero-new.component.scss']
})
export class HeroNewComponent implements OnInit {

  public heroForm = new FormGroup({
    id:        new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>( Publisher.DCComics ),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img:    new FormControl(''),
  });

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];

  public loading: boolean = false;


  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
  ) {}

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  ngOnInit(): void {

    if ( !this.router.url.includes('edit') ) return;

    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.heroesService.getHeroById( id ) ),
      ).subscribe( hero => {

        if ( !hero ) {
          return this.router.navigateByUrl('/');
        }

        this.heroForm.reset( hero );
        return;
      });

  }



  onSubmit():void {

    if ( this.heroForm.invalid ) return;

    if ( this.currentHero.id ) {
      this.loading = true;
      this.heroesService.updateHero( this.currentHero ).pipe(
        delay(1500)
      )
        .subscribe( hero => {
          this.showSnackbar(`${ hero.superhero } updated!`);
        });
        this.loading = false;
        return;
      }

      this.heroesService.addHero( this.currentHero )
      .subscribe( hero => {
        this.router.navigate(['/heroes/edit', hero.id ]);
        this.showSnackbar(`${ hero.superhero } created!`);
      });
  }

  onDeleteHero() {
    if ( !this.currentHero.id ) throw Error('Hero id is required');

    const dialogRef = this.dialog.open( ConfirmDialogComponent, {
      data: this.heroForm.value
    });

    dialogRef.afterClosed()
      .pipe(
        filter( (result: boolean) => result ),
        switchMap( () => this.heroesService.deleteHeroById( this.currentHero.id )),
        filter( (wasDeleted: boolean) => wasDeleted ),
      )
      .subscribe(() => {
        this.router.navigate(['/heroes']);
      });
  }


  showSnackbar( message: string ):void {
    this.snackbar.open( message, 'done', {
      duration: 2500,
    })
  }

  mayus(e: any) {
    e.value = e.value.toUpperCase();
}

}
