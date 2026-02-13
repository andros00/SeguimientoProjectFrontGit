import { EtapaSeleccion } from './etapa-seleccion';
import { InformacionGeneral } from './informacion-general';
import { CondicionFormal } from './condicion-formal';


export interface ProcesoSeleccionIngreso {
    informacionGeneral: InformacionGeneral;
    listaEtapasSeleccion: EtapaSeleccion[];
    listaCondicionesFormales:  CondicionFormal[];
}
