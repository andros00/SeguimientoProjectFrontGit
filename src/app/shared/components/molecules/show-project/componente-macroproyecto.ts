import { PersonaNatural } from 'src/app/shared/modelo/persona-natural';
import { ComponenteProyecto } from './componente-proyecto';

export class ComponenteMacroproyecto {
    identificador: number;
    cantidadproyectos: number;
    descripcion: string;
    macroproyecto: string;
    personaNatural: PersonaNatural;
    titulo: string;

    proyectos: ComponenteProyecto[];
}
