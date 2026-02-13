import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENDPOINTS } from 'src/app/utils/url/endpoints-url';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusByUserService {

  private readonly url = `${environment.route}/${ENDPOINTS.V1.PROJECT_URL.STATUS_LIST}`;

  constructor(private http: HttpClient) { }

  getAllByUser(skip: number, limit: number): Observable<string[]> {
    const params = new HttpParams()
      .set('skip', skip.toString())
      .set('limit', limit.toString());
      return this.http.get<string[]>(this.url, { params });
  }
}
