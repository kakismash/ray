import { Category } from './../model/category.model';
import { Injectable } from '@angular/core';
import { Store } from 'src/model/store.model';
import { User } from 'src/model/user.model';

export interface sSO {
  store:    Store;
  user:     User;
  category: Category;
}

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  loadStore(): Store {
    const store: Store = new Store();
    const strString = sessionStorage.getItem('store');

    if (strString) {
      const jsonStore = JSON.parse(strString);
      Object.assign(store, jsonStore);
    }

    return store;
  }

  loadCategory(): Category {
    const category: Category = new Category();
    const strString = sessionStorage.getItem('category');

    if (strString) {
      const jsonStore = JSON.parse(strString);
      Object.assign(category, jsonStore);
    }

    return category;
  }

  save(obj: Store | User | Category): void {
    if (obj instanceof Store) {
      sessionStorage.setItem('store', JSON.stringify(obj));
    } else if (obj instanceof User) {
      sessionStorage.setItem('user', JSON.stringify(obj));
    } else if (obj instanceof Category) {
      sessionStorage.setItem('category', JSON.stringify(obj));
    }

  }

  remove(key: string): void {
    sessionStorage.removeItem(key);
  }
}
