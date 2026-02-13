import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EvaluadorConstantes } from '../../components/molecules/show-project/evaluador-constantes';

@Injectable({
  providedIn: 'root'
})
export class TokenLocalService {

  private tokenSubject = new BehaviorSubject<string>('');
  tokenObservable = this.tokenSubject.asObservable();

  constructor() { }

  actualizarToken(token: string) {
    this.tokenSubject.next(token);
  }

  getToken(): string {
    return this.tokenSubject.getValue();
  }

  construirEncabezadoToken(): { [key: string]: string } {
    const valorToken = this.getToken();
    const headers = {};
    if (!!valorToken) {
      headers[EvaluadorConstantes.NOMBRE_ENCABEZADO_TOKEN] = valorToken;
      headers['Cache-Control'] = 'no-cache';

    }
    return headers;
  }
}
