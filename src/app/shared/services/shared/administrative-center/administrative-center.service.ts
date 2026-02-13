import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ENDPOINTS } from 'src/app/utils/url/endpoints-url';
import { IAdministrativeCenterDTO } from 'src/app/core/interfaces/IAdministrativeCenterDTO';

/**
 * Service class for managing operations related to administrative centers.
 *
 * This service provides methods to interact with the backend for fetching
 * and managing administrative center data. It is available application-wide due to
 * its root-level provider configuration.
 */
@Injectable({
  providedIn: 'root'
})
export class AdministrativeCenterService {

  private readonly url = `${environment.route}/${ENDPOINTS.V1.SHARED_URL.ADMINISTRATIVE_CENTER_LIST}`;

  /**
   * Constructor to inject the HttpClient dependency for making HTTP requests.
   *
   * @param http - An Angular service to handle HTTP communications.
   */
  constructor(private http: HttpClient) { }

  getAll(skip: number, limit: number): Observable<IAdministrativeCenterDTO[]> {
    const params = new HttpParams()
      .set('skip', skip.toString())
      .set('limit', limit.toString());

      return this.http.get<IAdministrativeCenterDTO[]>(this.url, { params });
  }
}
