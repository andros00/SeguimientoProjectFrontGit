import { RubroProyecto } from './rubro-proyecto';

export interface TablaPresupuestal {

    rubros: RubroProyecto[];
    subtotales: RubroProyecto;
    moneda: string;
}
