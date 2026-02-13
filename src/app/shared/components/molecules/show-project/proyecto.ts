import { InformacionGeneralProyecto } from './informacion-general-proyecto';
import { DatosSubproyecto } from './datos-subproyecto';
import { ComponenteProyecto } from './componente-proyecto';

export interface Proyecto {
    informacionGeneralProyecto: InformacionGeneralProyecto;
    datosSubproyecto: DatosSubproyecto;
    componenteProyecto: ComponenteProyecto;
}
