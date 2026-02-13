import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PersonaNatural } from '../../components/molecules/show-project/persona-natural';

@Injectable({
  providedIn: 'root'
})
export class PersonaNaturalLocalService {

  private personaNaturalSubject: BehaviorSubject<PersonaNatural> = new BehaviorSubject<PersonaNatural>(BehaviorSubject.create());

  constructor() { }

  guardarSeleccionPersonaNatural(personaNatural: PersonaNatural) {
    this.personaNaturalSubject.next(personaNatural);
  }

  obtenerPersonaNatural(): Observable<PersonaNatural> {
    return this.personaNaturalSubject.asObservable();
  }

  eliminarPersonaNatural(): void {
    this.personaNaturalSubject = new BehaviorSubject<PersonaNatural>(BehaviorSubject.create());
  }

}
