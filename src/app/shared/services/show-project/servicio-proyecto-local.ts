import { Observable } from 'rxjs';

export interface ServicioProyectoLocal {
    validar(): string;
    guardar(): Observable<any>;
    //postguardado(itemsGuardados: any);
}
