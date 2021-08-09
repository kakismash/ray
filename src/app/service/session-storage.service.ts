import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  saveStore(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }

  removeStore(key: string): void {
    sessionStorage.removeItem(key);
  }
}
