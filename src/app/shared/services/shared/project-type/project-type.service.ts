import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ENDPOINTS } from 'src/app/utils/url/endpoints-url';
import { IProjectTypeDTO } from 'src/app/core/interfaces/IProjectTypeDTO';

/**
 * Service class for managing operations related to project types.
 *
 * This service provides methods to interact with the backend for fetching
 * and managing type-related data. It is provided at the root level of the Angular
 * application, making it accessible across all components and modules.
 */
@Injectable({
  providedIn: 'root'
})
export class ProjectTypeService {

  private readonly url = `${environment.route}/${ENDPOINTS.V1.SHARED_URL.PROJECT_TYPES_LIST}`;

  /**
   * Constructor to inject the HttpClient dependency for performing HTTP requests.
   *
   * @param http - An Angular service to make HTTP requests.
   */
  constructor(private http: HttpClient) { }


  getAll(skip: number, limit: number): Observable<IProjectTypeDTO[]> {
    const params = new HttpParams()
      .set('skip', skip.toString())
      .set('limit', limit.toString());

      return this.http.get<IProjectTypeDTO[]>(this.url, { params });
  }
}
