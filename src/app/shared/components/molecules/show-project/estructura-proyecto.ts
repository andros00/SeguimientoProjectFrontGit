import { ComponenteProyecto } from './componente-proyecto';
import { DatosSubproyecto } from './datos-subproyecto';
import { ComponenteMacroproyecto } from './componente-macroproyecto';
import { InformacionGeneralProyecto } from './informacion-general-proyecto';
import { TextoDescriptivo } from './texto-descriptivo';
import { AportanteProyecto } from './aportante-proyecto';
import { CompromisoProyecto } from './compromiso-proyecto';
import { CondicionFormalPorEvaluacion } from './condicion-formal-por-evaluacion';
import { EvaluacionTecnica } from './evaluacion-tecnica';
import { ActividadProyecto } from './actividad-proyecto';
import { ParticipanteProyecto } from './participante-proyecto';
import { EvaluadorRecomendado } from './evaluador-recomendado';
import { DocumentoProyecto } from './documento-proyecto';
import { TablaPresupuestal } from './tabla-presupuestal';

export interface EstructuraProyecto {
    informacionGeneralProyecto: InformacionGeneralProyecto;
    textosDescriptivos: TextoDescriptivo[];
    aportantesProyecto: AportanteProyecto[];
    compromisoProyecto: CompromisoProyecto[];
    condicionFormalPorEvaluacion: CondicionFormalPorEvaluacion[];
    planesDeTrabajo: TextoDescriptivo[];
    evaluacionTecnica: EvaluacionTecnica;
    actividadesProyecto: ActividadProyecto[];
    participantes: ParticipanteProyecto[];
    evaluadores: EvaluadorRecomendado[];
    documentos: DocumentoProyecto[];
    presupuesto: TablaPresupuestal;
    componentes: ComponenteMacroproyecto[];
    componenteProyecto: ComponenteProyecto;
    datosSubproyecto: DatosSubproyecto;
}
