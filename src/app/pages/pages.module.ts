import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';

import { HeroesHomeComponent } from './heroes-home/heroes-home.component';
import { HeroesListComponent } from './hero-list/heroes-list.component';
import { HeroComponent } from './hero/hero.component';
import { HeroNewComponent } from './hero-new/hero-new.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';


@NgModule({
  declarations: [
    HeroesHomeComponent,
    HeroesListComponent,
    HeroComponent,
    HeroNewComponent,
    HeroSearchComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
    ComponentsModule,
    PipesModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
