export interface IProject {

  codigo: string;
  estado: string;
  nombreCorto: string;
  nombreSubnivelProyecto: string;
  nombreCortoConvocatoria: string;
  nombreCompleto: number;
  ipCoordinadorProyecto: string;
  nombreProcesoSeleccion: string;
  responsable: string;
  nombreCompletoResponsable: string;
  tipoProyectoNombre: string;
  fechaInicioFinalizacionFormal: string;
  fechaInicioInicioFormal: string;
  duracion: number;
  convocatoria: number;
  procesoSeleccion: number;
  selected: boolean;
  fechaAprobacionRechazo: string;
  codigoInterno: string;

}
