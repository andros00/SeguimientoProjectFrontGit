import { PersonaNatural } from './persona-natural';
import { ComponenteProyecto } from './componente-proyecto';

export interface ComponenteMacroproyecto {
    identificador: number;
    cantidadproyectos: number;
    descripcion: string;
    macroproyecto: string;
    personaNatural: PersonaNatural;
    titulo: string;

    proyectos: ComponenteProyecto[];
}
