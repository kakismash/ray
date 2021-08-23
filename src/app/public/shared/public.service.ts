import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Public } from './public.model';

@Injectable()
export class PublicService {

	constructor(private http: HttpClient) { }

	getPublic(id: string): Observable<Public> {
		return  this.http
                .get<Public>(environment.apiURL + 'public/' + id);
	}
}
