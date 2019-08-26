import { Component, OnInit } from '@angular/core';
import {FavoritesService} from '../favorites.service';
import { favorite } from '../favorites.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  constructor(private favoritesService : FavoritesService) { }
  favorites : favorite[];
  ngOnInit() {
    this.favorites = this.favoritesService.getFavorites();
  }

}
