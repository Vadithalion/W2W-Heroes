import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

import { Hero } from '../models/hero.interface';
import { enviroments } from 'src/enviroments/enviroments';


@Injectable({providedIn: 'root'})
export class HeroesService {

  public baseUrl: string = enviroments.baseUrl;

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${ this.baseUrl }/heroes`);
  }

  getHeroById(id: string): Observable<Hero | undefined> {
    return this.http.get<Hero>(`${ this.baseUrl }/heroes/${id}`).pipe(catchError(error => of(undefined)))
  }

  onSearchHeroes( params: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${ this.baseUrl }/heroes?q=${params}`)
  }

  addHero(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(`${this.baseUrl}/heroes`, hero);
  }

  updateHero(hero: Hero): Observable<Hero>{
    if (!hero.id) throw Error('Hero ID is required');

    return this.http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
  }

  deleteHero(hero: Hero): Observable<boolean>{
    return this.http.delete(`${this.baseUrl}/heroes/${hero.id}`).pipe(
      catchError( err => of(false)),
      map(resp => true)
    );
  }

  deleteHeroById( id: string ): Observable<boolean> {

    return this.http.delete(`${ this.baseUrl }/heroes/${ id }`)
      .pipe(
        map( resp => true ),
        catchError( err => of(false) ),
      );
  }
}
