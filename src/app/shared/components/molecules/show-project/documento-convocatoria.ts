import { DocumentoSoporte } from "./documento-soporte";

export interface DocumentoConvocatoria {
  identificador: number;
  convocatoria: number;
  documentoSoporte: DocumentoSoporte;
}
