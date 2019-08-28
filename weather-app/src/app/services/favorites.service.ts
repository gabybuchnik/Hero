import { Injectable } from '@angular/core';
import { favorite } from '../models/favorites.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  favorites: favorite[];
  constructor() {
    this.favorites = [];
  }
  addToFavorites(item: favorite) {
    this.favorites.push(item);
  }
  getFavorites() {
    return this.favorites;
  }
  removeFromFavorites(id : string) {
    const index = this.favorites.findIndex(item => item.id === id);
    if(index !== -1){
      this.favorites.splice(index , 1);
    }
  }
  
  checkFavoritesExist(id: string) {
    const index = this.favorites.findIndex(item => {
      return item.id === id;
    });
    if (index !== -1) {
      return true;
    }
    else return false;
  }
}
