export class ElementosSeleccionados {
    constructor(
        public proyecto: string = '',
        public agenda?: number,
        public subagenda?: number,
        public objetivo?: number
    ) {}

    static transformarObjeto(objetoOriginal: any): ElementosSeleccionados {
        if (!objetoOriginal) {
            return new ElementosSeleccionados();
        }
        return new ElementosSeleccionados(
            objetoOriginal.proyecto || '',
            objetoOriginal.agenda || undefined,
            objetoOriginal.subagenda || undefined,
            objetoOriginal.objetivo || undefined
        );
    }
}