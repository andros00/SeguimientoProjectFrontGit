export const ENDPOINTS = {
  V1: {
    SHARED_URL: {
      ADMINISTRATIVE_CENTER_LIST: "compartido/centros-administrativos",
      PROJECT_TYPES_LIST: "compartido/tipos-proyecto",
    },

    PROJECT_URL: {
      STATUS_LIST: "compartido/estados-proyecto",
      FILTER: "proyectos/consultar",
      ETAPA: "proyecto/etapa",
      ACTIVIDAD: "proyecto/actividad",
      DETALLE:"/proyectos/detalle/"
    },

    ADMIN_URL: {
      FILTER_PROCESS_SELECTION_LIST: "compartido/filtro-proceso-seleccion"
    },

    ANNOUNCEMENT_URL: {
      ANNOUNCEMENT_LIST: "convocatoria/lista-convocatorias",
    },

    PARTICIPANT_URL: {
      PARTICIPANT_PROJECT_LIST: "participante/participantes-proyecto/",
      UPDATE_PARTICIPANT: "participante",
      VINCULO_PARTICIPANT: "participante/vinculo-participante",
      INSTITUCION: "participante/institucion-participante",
      GRUPO: "participante/grupo-participante",
      ROLE: "participante/rol-participante"
    },

    IFORMAL_URL: {
      PROJECT_IFORMAL: "inicioFormal/inicioFormal",
      PROJECT_IFORMAL_BY_CODE: "inicioFormal/consultar",
      PROJECT_IFORMAL_UPDATE: "inicioFormal/actualizar"
    },

    PERSONA_NATURAL: {
      PERSONA: "persona/persona-natual",
    },

    COMPROMISO_URL: {
      COMPROMISO_PROJECT_LIST: "compromiso/proyecto",
      COMPROMISO: "compromiso",
      NOTA_COMPROMISO: "compromiso/nota",
      COMPROMISO_FECHA: "/compromiso/fecha-estimada"
    },
    INVESTIGADOR: {
      JOVEN_INVESTIGADOR: "investigador/joven-investigador",
      GURDAR_JI: "investigador/guardar-joveninvest",
      NUEVO_JI: "investigador/nuevo-joven-investigador"
    },
    ACTA_URL: {
      GENERAR: "/acta-generar/generar"
    }

  }
};
