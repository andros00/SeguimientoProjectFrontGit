import { Component, OnInit, Input } from '@angular/core';
import { ComponenteMacroproyecto } from '../componente-macroproyecto';
import { Observable } from 'rxjs';
import { ComponenteProyectoLocalService } from 'src/app/shared/services/show-project/componente-proyecto-local.service';

@Component({
  selector: 'app-visor-componentes-proyecto',
  templateUrl: './visor-componentes-proyecto.component.html',
  styleUrls: ['./visor-componentes-proyecto.component.css']
})
export class VisorComponentesProyectoComponent implements OnInit {

  @Input() url!: string;

  componentes$!: Observable<ComponenteMacroproyecto[]>;

  constructor(private componentesLocalService: ComponenteProyectoLocalService) { }

  ngOnInit() {
    this.componentes$ = this.componentesLocalService.listaComponenteProyectoObservable;
  }
}
