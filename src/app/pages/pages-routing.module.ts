import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HeroesHomeComponent } from './heroes-home/heroes-home.component';
import { HeroNewComponent } from './hero-new/hero-new.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { HeroesListComponent } from './hero-list/heroes-list.component';
import { HeroComponent } from './hero/hero.component';

const routes: Routes = [
  {
    path: '',
    component: HeroesHomeComponent,
    children: [
      { path: 'new-hero', component: HeroNewComponent },
      { path: 'search', component: HeroSearchComponent },
      { path: 'edit/:id', component: HeroNewComponent },
      { path: 'list', component: HeroesListComponent },
      { path: ':id', component: HeroComponent },
      { path: '**', redirectTo: 'list' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
