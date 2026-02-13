import { InformacionGeneralConvocatoriaFormulario } from './informacion-general-convocatoria-formulario';
import { CronogramaFormulario } from './cronograma-formulario';
import { PresupuestalFormulario } from './presupuestal-formulario';
import { EstructuraProyectoFormulario } from './estructura-proyecto-formulario';
import { DocumentoSoporteFormulario } from './documento-soporte-formulario';
import { CompromisosCondicionesFormulario } from './compromisos-condiciones-formulario';

export class ConvocatoriaFormulario {
    informacionGeneralFormulario: InformacionGeneralConvocatoriaFormulario = new InformacionGeneralConvocatoriaFormulario();
    cronogramaFormulario: CronogramaFormulario = new CronogramaFormulario();
    presupuestalFormulario: PresupuestalFormulario = new PresupuestalFormulario();
    compromisosCondiciones: CompromisosCondicionesFormulario = new CompromisosCondicionesFormulario();
    estructuraProyectoFormulario: EstructuraProyectoFormulario = new EstructuraProyectoFormulario();
    documentoSoporteFromulario: DocumentoSoporteFormulario = new DocumentoSoporteFormulario();
}
