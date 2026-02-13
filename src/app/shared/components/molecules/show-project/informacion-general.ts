import { Disponibilidad } from './../../shared/modelo/disponibilidad';
import { NivelProyecto } from 'src/app/shared/modelo/nivel-proyecto';
import { ClaseSubproyecto } from 'src/app/shared/modelo/clase-subproyecto';
import { TipoProyecto } from 'src/app/shared/modelo/tipo-proyecto';


export class InformacionGeneral {
    identificador: number;
    estado: string;
    accion: string;
    nombre: string;
    descripcion: string;
    nivelProyecto: NivelProyecto;
    claseSubproyecto: ClaseSubproyecto;
    tipoProyecto: TipoProyecto;
    inicioVigencia: string;
    finVigencia: string;
    clasificacion: string;
    responsableListaEvaluadores: boolean;
    requeridoEvaluador: boolean;
    limitaDescripciones: boolean;
    requeridoDescripcion: boolean;
    requeridoParticipante: boolean;
    requeridoCronograma: boolean;
    requeridoPresupuesto: boolean;
    requeridoCompromiso: boolean;
    requeridoPlanTrabajo: boolean;
    requeridoInformacionComplementaria: boolean;
    subnivelProyecto: number;
    disponibilidad?: Disponibilidad;
}
