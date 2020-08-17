import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const STORAGE_KEY  = 'favoriteFilms';'favoritePlanets';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private storage: Storage) {
  }

  getAllFavoriteFilms() {
    return this.storage.get(STORAGE_KEY);
  }

  getAllFavoritePlanets() {
    return this.storage.get(STORAGE_KEY);
  }

  isFavorite(filmId) {
    return this.getAllFavoriteFilms().then(result => {
      return result && result.indexOf(filmId) !== -1;
    });
  }

  isFavorite1(planetId) {
    return this.getAllFavoritePlanets().then(result => {
      return result && result.indexOf(planetId) !== -1;
    });
  }

  favoriteFilm(filmId) {
    return this.getAllFavoriteFilms().then(result => {
      result = result || [];
      result.push(filmId);
      return this.storage.set(STORAGE_KEY, result);
    });
  }

  favoritePlanet(planetId) {
    return this.getAllFavoritePlanets().then(result => {
      result = result || [];
      result.push(planetId);
      return this.storage.set(STORAGE_KEY, result);
    });
  }

  unfavoriteFilm(filmId) {
    return this.getAllFavoriteFilms().then(result => {
      if (result) {
        var index = result.indexOf(filmId);
        result.splice(index, 1);
        return this.storage.set(STORAGE_KEY, result);
      }
    })
  }
}