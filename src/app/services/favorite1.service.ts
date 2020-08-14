import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const STORAGE_KEY  = 'favoritePerson';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private storage: Storage) {
  }

  getAllFavoritePerson() {
    return this.storage.get(STORAGE_KEY);
  }

  isFavorite(personId) {
    return this.getAllFavoritePerson().then(result => {
      return result && result.indexOf(personId) !== -1;
    });
  }

  favoritePerson(personId) {
    return this.getAllFavoritePerson().then(result => {
      result = result || [];
      result.push(personId);
      return this.storage.set(STORAGE_KEY, result);
    });
  }

  unfavoritePerson(personId) {
    return this.getAllFavoritePerson().then(result => {
      if (result) {
        var index = result.indexOf(personId);
        result.splice(index, 1);
        return this.storage.set(STORAGE_KEY, result);
      }
    })
  }
}
