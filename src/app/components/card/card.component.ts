import { Component, Input, OnInit } from '@angular/core';
import { Hero } from 'src/app/models/hero.interface';

@Component({
  selector: 'hero-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() hero!: Hero;

  ngOnInit(): void {
      if (!this.hero) throw Error('Hero property is required')
  }

}
