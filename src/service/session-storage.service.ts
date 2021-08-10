import { Injectable } from '@angular/core';
import { Store } from 'src/model/store.model';
import { User } from 'src/model/user.model';

export interface sSO {
  store: Store,
  user: User
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

  save(obj: Store | User): void {
    debugger
    if (obj instanceof Store) {
      sessionStorage.setItem('store', JSON.stringify(obj));
    } else {
      sessionStorage.setItem('user', JSON.stringify(obj));
    }

  }

  remove(key: string): void {
    sessionStorage.removeItem(key);
  }
}
