import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Category } from "src/model/category.model";
import { Item } from "src/model/item.model";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) {}

  getAllByCategory(categoryId: number): Observable<Array<Item>> {
    return this.http.get<Item[]>(environment.apiURL + 'category/' + categoryId + '/item')
  }

  createOrEditAndAttachToCategory(categoryId: number, item: Item): Observable<Category> {
    return this.http.put<Category>(environment.apiURL + 'category/' + categoryId + '/item', item);
  }

  removeFromCategory(categoryId: number, itemId: number): Observable<Category> {
    return this.http.delete<Category>(environment.apiURL + 'category/' + categoryId + '/item/' + itemId);
  }

}
