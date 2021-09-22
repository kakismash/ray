import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Image } from "src/model/image.model";

@Injectable({
  providedIn: 'root'
})
export class BucketService {

  constructor(private http: HttpClient) {}

  uploadFile(formData: FormData, storeName: string): Observable<Image> {
    return this.http.post<Image>(environment.apiURL + 'fileupload/' + storeName, formData);
  }

  deleteFile(url: string): Observable<any> {
    const params: HttpParams = new HttpParams();
    params.set('url', encodeURI(url));
    return this.http.delete<any>(environment.apiURL + 'deletefile', {params: params});
  }

  deleteFOlder(folderName: string): Observable<any> {const params: HttpParams = new HttpParams();
    params.set('url', encodeURI(folderName));
    return this.http.delete<any>(environment.apiURL + 'deletefolder', {params: params});
  }
}
