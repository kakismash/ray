import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "src/model/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<Array<User>> {
    return this.http.get<Array<User>>(environment.apiURL + 'user');
  }

  getStore(userId: number): Observable<User> {
    return this.http.get<User>(environment.apiURL + 'user/' + userId)
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(environment.apiURL + 'user', user);
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(environment.apiURL + 'user/' + user.id, user);
  }

  remove(userId: number): Observable<void> {
    return this.http.delete<void>(environment.apiURL + 'user/' + userId);
  }
}
