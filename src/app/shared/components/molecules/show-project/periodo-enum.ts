export class PeriodoEnum {
    static readonly MESES = new PeriodoEnum('mes', 'Meses');
    static readonly DIAS = new PeriodoEnum('dia', 'Días');
    static readonly SEMANAS = new PeriodoEnum('semana', 'Semanas');

    private constructor(public nombreDB: string, public nombre: string) {

    }
}
