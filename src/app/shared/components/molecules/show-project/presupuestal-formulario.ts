import { ModalidadesFormulario } from './modalidades-formulario';
import { RubroConvocatoriaFormulario } from './rubro-convocatoria-formulario';
import { RubroPreautorizadoFormulario } from './rubro-preautorizado-formulario';
import { PorcentajeMaximoFormulario } from './porcentaje-maximo-formulario';

export class PresupuestalFormulario {
    modalidadesFormulario: ModalidadesFormulario = new ModalidadesFormulario();
    rubroConvocatoriaFormulario: RubroConvocatoriaFormulario = new RubroConvocatoriaFormulario();
    rubroPreautorizadoFormulario: RubroPreautorizadoFormulario = new RubroPreautorizadoFormulario();
    porcentajeMaximoFormulario: PorcentajeMaximoFormulario = new PorcentajeMaximoFormulario();
}
