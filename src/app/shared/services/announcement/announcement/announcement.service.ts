import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAnnouncementDTO } from 'src/app/core/interfaces/IAnnouncementDTO';
import { ENDPOINTS } from 'src/app/utils/url/endpoints-url';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  private readonly url = `${environment.route}/${ENDPOINTS.V1.ANNOUNCEMENT_URL.ANNOUNCEMENT_LIST}`;

  constructor(private http: HttpClient) { }

  getAll(skip: number, limit: number): Observable<IAnnouncementDTO[]> {
    const params = new HttpParams()
      .set('skip', skip.toString())
      .set('limit', limit.toString());

    return this.http.get<IAnnouncementDTO[]>(this.url, { params });
  }
}
