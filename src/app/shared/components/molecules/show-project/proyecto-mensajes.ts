export const ProyectoMensajes = {
    PASO_INFORMACION_GENERAL: 'Información general',
    PASO_ACTUALIZACION: 'Actualización',
    PASO_COMPLEMENTARIA: 'Información complementaria',
    PASO_CRONOGRAMA: 'Descripción cronograma',
    PASO_PRESUPUESTAL: 'Presupuestal',
    PASO_COMPONENTES: 'Componentes',
    PASO_PLAN_DE_TRABAJO: 'Plan de trabajo',
    PASO_PARTICIPANTES: 'Participantes',
    PASO_EVALUADORES_RECOMENDADOS: 'Evaluadores recomendados',
    PASO_COMPROMISOS_CONDICIONES: 'Compromisos y condiciones',
    PASO_DOCUMENTO_SOPORTE: 'Documento soporte',
    PASO_PUBLICAR: 'Enviar',
    PESTANA_CONDICIONES_FORMALES: 'Condiciones formales',
    PESTANA_DESCRIPCION: 'Descripción',
    PESTANA_CRONOGRAMA: 'Cronograma',
    PESTANA_PRESUPUESTO: 'Presupuesto',
    PESTANA_COMPLEMENTARIA: 'Complementaria',
    PESTANA_COFINANCIADORES: 'Cofinanciadores',
    PESTANA_COMPROMISOS: 'Compromisos',
    TITULO_ELIMINAR_APORTANTE: 'Eliminar aportante',
    TITULO_EDITAR_APORTANTE: 'Editar aportante',
    MENSAJE_ELIMINAR_APORTANTE: '¿Está seguro que desea eliminar este aportante?',
    MENSAJE_EDITAR_APORTANTE: '¿Está seguro que desea editar este aportante?',
    MENSAJE_EVALUACION_REGLA(porcentaje, rubro, personaJuridica) {
        return `Se ha excedido el ${porcentaje}% para el rubro `
            + `${rubro} definido por el financiador ${personaJuridica}.`;
    },
    MENSAJE_EVALUACION_MODALIDAD(nombreFinanciador, montoMaximoModalidad) {
        return `El financiador ${nombreFinanciador} supera el monto máximo`
            + ` definido en la modalidad seleccionada (${montoMaximoModalidad})`;
    },
    MENSAJE_VALIDACION_FINANCIADOR: `No se presenta registro de entidad participante con rol de financiador.`,
    MENSAJE_VALIDACION_INFO_COMPLEMENTARIA: `En información complementaria se debe seleccionar: `,
    MENSAJE_VALIDACION_PRESUPUESTAL: `El presupuesto del proyecto está incompleto.`
        + ` Debe ingresar rubros del presupuesto de su proyecto de acuerdo a los términos de la convocatoria.`,
    TITULO_ELIMNAR_PROYECTO: `Eliminar proyecto`,

    MENSAJE_ELIMINACION_PROYECTO(nombreProyecto: string) {
        return `¿Realmente desea eliminar el proyecto ${nombreProyecto}?
        El proyecto y todas sus secciones se perderán.`;
    },

    TITULO_ELIMINACION_PROYECTO_REALIZADA: 'Proyecto eliminado',
    ELIMINACION_PROYECTO_REALIZADO(nombreProyecto: string) {
        return `El proyecto ${nombreProyecto} ha sido eliminado con éxito.`;
    },

    TITULO_ALERTA_DEVOLVER_PROYECTO: 'Devolver proyecto',
    CONFIRMAR_DEVOLUCION_PROYECTO(nombreCortoProyecto: string) {
        return `¿Realmente desea devolver el proyecto ${nombreCortoProyecto} al investigador o coordinador?.
        El proyecto quedará en estado en elaboración hasta que el investigador o coordinador lo envíe de nuevo.`;
    },

    TITULO_ALERTA_EXITO_ACTUALIZAR: 'Éxito al actualizar proyecto',
    MENSAJE_ALERTA_EXITO_ACTUALIZAR(nombreCortoProyecto: string) {
        return `El proyecto ${nombreCortoProyecto} ha sido reabierto, el investigador o coordinador puede proceder a editarlo.`;
    },
    TITULO_ALERTA_ERROR_TIENE_CONDICIONES: 'Error devolviendo proyecto',
    MENSAJE_ALERTA_ERROR_TIENE_CONDICIONES: `El proyecto tiene condiciones formales asociadas,
    no puede realizar esta acción.`,
    TITULO_ALERTA_ERROR_ACTUALIZACION: 'Error actualizando proyecto',
    MENSAJE_ALERTA_ERROR_ACTUALIZACION: `El proyecto no cumple con las condiciones,
    no puede realizar esta acción.`,
    NO_CUMPLE_FECHA: 'No cumple con la fecha límite',
    MENSAJE_ALERTA_ERROR_FECHA(nombreCortoProyecto: string, fechaFin: string) {
        return `El proyecto ${nombreCortoProyecto} podía ser procesado en la etapa actual del proceso de ` +
        `aprobación hasta la fecha ${fechaFin}. No puede realizar más cambios a los ` +
        `evaluadores del proyecto.`;
    },
    NO_TIENE_CONFIGURADAS_ETAPA: 'No hay configuradas etapas',
    MENSAJE_ALERTA_ERROR_CONFIGURADAS: 'La etapa actual no permite asignar evaluadores para el proyecto seleccionado',
    TITULO_ALERTA: 'Alerta',
    MENSAJE_PERSONA_NATURAL_EXISTE: 'No se permite agregar la misma persona natural más de una vez.',
    TITULO_EXITO: 'Acción realizada con éxito',
    MENSAJE_ALERTA_EXITO_AL_ELIMINAR: 'El evaluador fue eliminado con éxito.'
};
