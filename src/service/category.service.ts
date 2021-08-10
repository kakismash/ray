import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Category } from "src/model/category.model";
import { Store } from "src/model/store.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {}

  getAllByStore(storeId: number): Observable<Array<Category>> {
    return this.http.get<Array<Category>>(environment.apiURL + 'store/' + storeId + '/category')
  }

  createOrEditAndAttachToStore(storeId: number, category: Category): Observable<Store> {
    return this.http.put<Store>(environment.apiURL + 'store/' + storeId + '/category', category);
  }

  removeFromStore(storeId: number, categoryId: number): Observable<Store> {
    return this.http.delete<Store>(environment.apiURL + 'store/' + storeId + '/category/' + categoryId);
  }

}
