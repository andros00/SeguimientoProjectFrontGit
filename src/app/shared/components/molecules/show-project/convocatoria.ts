import { PorcentajeMaximoRubros } from './porcentaje-maximo-rubros';
import { EstructuraProyecto } from './estructura-proyecto';
import { InformacionGeneralConvocatoria } from './informacion-general-convocatoria';
import { CronogramaConvocatoria } from './cronograma';
import { DocumentoConvocatoria } from './documento-convocatoria';
import { CondicionFormalConvocatoria } from './condicion-formal-convocatoria';
import { Compromiso } from './compromiso';
import { RubroPreautorizado } from './rubro-preautorizado';
import { ModalidadConvocatoria } from './modalidad-convocatoria';
import { RubroConvocatoria } from './rubro-convocatoria';

export interface Convocatoria {
    informacionGeneral?: InformacionGeneralConvocatoria;
    cronogramaConvocatoria?: CronogramaConvocatoria;
    listaRubrosPreautorizados?: RubroPreautorizado[];
    listaCompromisos?: Compromiso[];
    estructuraProyecto?: EstructuraProyecto;
    listaDocumentosConvocatoria?: DocumentoConvocatoria[];
    listaCondicionesFormalesConvocatoria?: CondicionFormalConvocatoria[];
    listaModalidadesConvocatoria?: ModalidadConvocatoria[];
    listaRubroConvocatoria?: RubroConvocatoria[];
    listaPorcentajeMaximoRubro?: PorcentajeMaximoRubros[];
    estadoConvocatoria?: string;
    proyectosAsociados?: number;
}
