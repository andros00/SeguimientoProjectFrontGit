import { InformacionGeneralProyecto } from './informacion-general-proyecto';
import { NivelProyecto } from './nivel-proyecto';
import { PersonaNatural } from './persona-natural';
import { EstadoProyecto } from './estado-proyecto';
import { ProyectoNombreCodigo } from './proyecto-nombre-codigo';

export class ResultadoProyecto {

    informacionGeneralProyecto?: InformacionGeneralProyecto;
    personaNatural?: PersonaNatural;
    nivelProyecto?: NivelProyecto;
    proyectoVinculado?: ProyectoNombreCodigo;
    hic?: boolean;
    estado?: EstadoProyecto;
}
