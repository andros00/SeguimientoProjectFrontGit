import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProcessSelectionDTO } from 'src/app/core/interfaces/IProcessSelectionDTO';
import { ENDPOINTS } from 'src/app/utils/url/endpoints-url';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilterProcessSelectionService {

  private readonly url = `${environment.route}/${ENDPOINTS.V1.ADMIN_URL.FILTER_PROCESS_SELECTION_LIST}`;

  constructor(private http: HttpClient) { }

  getAll(skip: number, limit: number): Observable<IProcessSelectionDTO[]> {
    const params = new HttpParams()
      .set('skip', skip.toString())
      .set('limit', limit.toString());
    return this.http.get<IProcessSelectionDTO[]>(this.url, { params });
  }
}
