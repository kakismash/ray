import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Store } from "src/model/store.model";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<Array<Store>> {
    return this.http.get<Array<Store>>(environment.apiURL + 'store');
  }

  getStore(storeId: number): Observable<Store> {
    return this.http.get<Store>(environment.apiURL + 'store/' + storeId)
  }

  create(store: Store): Observable<Store> {
    return this.http.post<Store>(environment.apiURL + 'store', store);
  }

  update(store: Store): Observable<Store> {
    return this.http.patch<Store>(environment.apiURL + 'store/' + store.id, store);
  }

  remove(storeId: number): Observable<void> {
    return this.http.delete<void>(environment.apiURL + 'store/' + storeId);
  }
}
