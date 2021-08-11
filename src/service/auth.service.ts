import { environment } from './../environments/environment';
import { Observable } from 'rxjs';
import { User } from 'src/model/user.model';
import { SessionStorageService } from 'src/service/session-storage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:                  HttpClient,
              private sessionStorageService: SessionStorageService) { }

  login(user: User): Observable<User> {
    return this.http.post<User>(environment.apiURL + 'login', user);
  }
}
