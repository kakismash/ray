import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from 'src/model/store.model';
import { User } from 'src/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor(private router: Router) { }

  loadStore(): Store {
    const store: Store = new Store();
    const strString = sessionStorage.getItem('store');

    if (strString) {
      const jsonStore = JSON.parse(strString);
      Object.assign(store, jsonStore);
    }

    return store;
  }

  loadUser(): User {
    const user: User = new User();
    const strString = sessionStorage.getItem('user');

    if (strString) {
      const jsonStore = JSON.parse(strString);
      Object.assign(user, jsonStore);
    }
    return user;
  }

  save(obj: Store | User): void {
    if (obj instanceof Store) {
      sessionStorage.setItem('store', JSON.stringify(obj));
    } else if (obj instanceof User) {
      sessionStorage.setItem('user', JSON.stringify(obj));
    }

  }

  remove(key: string): void {
    sessionStorage.removeItem(key);
  }

  hasToken(): boolean {
    const user = this.loadUser()
    return user && user.token !== undefined;
  }

  redirectToLogin(): void{
    this.router.navigate(['login']);
  }
}
