import { Disponibilidad } from './disponibilidad';
import { NivelProyecto } from './nivel-proyecto';
import { ClaseSubproyecto } from './clase-subproyecto';
import { TipoProyecto } from './tipo-proyecto';


export interface InformacionGeneral {
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
