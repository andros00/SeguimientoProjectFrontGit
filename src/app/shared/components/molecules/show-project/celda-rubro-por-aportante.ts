import { RubroAportante } from './rubro-aportante';

export interface CeldaRubroPorAportante {

    frescos: RubroAportante[];
    aportanteEnEspecie: RubroAportante;

    esUdea: boolean;
}
