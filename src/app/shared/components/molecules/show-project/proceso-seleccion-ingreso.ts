import { EtapaSeleccion } from './etapa-seleccion';
import { InformacionGeneral } from './informacion-general';
import { CondicionFormal } from './condicion-formal';


export class ProcesoSeleccionIngreso {
    informacionGeneral: InformacionGeneral;
    listaEtapasSeleccion: EtapaSeleccion[];
    listaCondicionesFormales:  CondicionFormal[];
}
