import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DocumentoProyecto } from '../documento-proyecto';
import { TipoDocumento } from '../tipo-documento';
import { ProyectoLocalService } from 'src/app/shared/services/show-project/proyecto-local.service';
import { DocumentoSoporteProyectoService } from 'src/app/shared/services/show-project/documento-soporte-proyecto.service';
import { DocumentoSoporteProyectoLocalService } from 'src/app/shared/services/show-project/documento-soporte-proyecto-local.service';
import { FORMATO_FECHA } from '../angular-material.module';
import { DocumentoSoporte } from '../documento-soporte';
import { DocumentosSoporteConstantes } from '../documentos-soporte-constantes';

@Component({
  selector: 'app-agregar-documento-soporte-proyecto',
  templateUrl: './agregar-documento-soporte-proyecto.component.html',
  styleUrls: ['./agregar-documento-soporte-proyecto.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: FORMATO_FECHA },
  ]
})
export class AgregarDocumentoSoporteProyectoComponent implements OnInit {

  formularioAgregarDocumentoProyecto: FormGroup;
  maxFechaEmision: Date = new Date();
  enviado = false;
  maximo = false;
  mensajeErrorTamanno = false;
  tamannoNombreAdjunto = false;

  listaTipoDocumento: TipoDocumento[] = [];

  constructor(private formBuilder: FormBuilder,
    private modalAgregarDocumentoSoporte: MatDialogRef<AgregarDocumentoSoporteProyectoComponent>,
    private proyectoServicioLocal: ProyectoLocalService,
    private documentoSoporteServiciolocal: DocumentoSoporteProyectoLocalService,
    private documentoSoporteProyectoServicio: DocumentoSoporteProyectoService) {
    modalAgregarDocumentoSoporte.disableClose = true;
    this.formularioAgregarDocumentoProyecto = this.formBuilder.group({
      nombreDocumento: ['', [Validators.required, Validators.maxLength(DocumentosSoporteConstantes.TAMANO_MAXIMO_NOMBRE_DOCUMENTO)]],
      numeroDocumento: ['', [Validators.maxLength(DocumentosSoporteConstantes.TAMANO_MAXIMO_NUMERO_DOCUMENTO)]],
      emisor: ['', [Validators.required, Validators.maxLength(DocumentosSoporteConstantes.TAMANO_MAXIMO_EMISOR)]],
      fechaEmision: ['', [Validators.required]],
      descripcion: ['', [Validators.maxLength(DocumentosSoporteConstantes.TAMANO_MAXIMO_DESCRIPCION)]],
      documentoAdjunto: [[], [Validators.required]],
      tipoDocumento: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.consultarTiposDocumentos();
  }

  private consultarTiposDocumentos() {
    this.documentoSoporteProyectoServicio.consultarListaTipoDocumento()
      .subscribe(listaTipoDocumento => this.listaTipoDocumento = listaTipoDocumento);
  }

  cerrarModal() {
    this.modalAgregarDocumentoSoporte.close();
  }

  cambioArchivo() {
    this.mensajeErrorTamanno = false;
  }

  agregarDocumentoSoporte() {
    this.enviado = true;
    if (this.f.documentoAdjunto.value.length > 0) {
      const megas = this.f.documentoAdjunto.value[0].file.size / Math.pow(DocumentosSoporteConstantes.MEGAS,
        DocumentosSoporteConstantes.CUADRADO);
      if (megas > DocumentosSoporteConstantes.TAMANNO_MAXIMO_MB) {
        this.mensajeErrorTamanno = true;
        return;
      } else {
        this.mensajeErrorTamanno = false;
      }
      if (this.f.documentoAdjunto.value[0].file.name.length > DocumentosSoporteConstantes.TAMANNO_MAXIMO_NOMBRE_ADJUNTO_BD) {
        this.tamannoNombreAdjunto = true;
        return;
      } else {
        this.tamannoNombreAdjunto = false;
      }
    }
    if (this.formularioAgregarDocumentoProyecto.invalid) {
      return;
    }
    const fechaEmision = this.f.fechaEmision.value.toDate();
    const documentoProyecto: DocumentoProyecto = new DocumentoProyecto();
    documentoProyecto.identificador = 0;
    documentoProyecto.proyecto = this.proyectoServicioLocal.obtenerInformacionGeneralProyecto().codigo;
    const documentoSoporte: DocumentoSoporte = new DocumentoSoporte();
    documentoSoporte.identificador = 0;
    documentoSoporte.nombreDocumento = this.f.nombreDocumento.value;
    documentoSoporte.fechaEmision = fechaEmision.getTime().toString();
    documentoSoporte.numeroDocumento = this.f.numeroDocumento.value;
    documentoSoporte.nombreAdjunto = this.f.documentoAdjunto.value[0].file.name;
    documentoSoporte.emisor = this.f.emisor.value;
    documentoSoporte.descripcion = this.f.descripcion.value;
    documentoSoporte.tipo = this.f.tipoDocumento.value;
    const documentoAdjunto = this.f.documentoAdjunto.value[0].file;
    const reader = new FileReader();
    reader.readAsDataURL(documentoAdjunto);
    reader.onload = () => {
      documentoSoporte.documentoAdjunto = reader.result.toString().split(',')[1];
    };
    documentoProyecto.documentoSoporte = documentoSoporte;
    const listaDocumentosProyecto = this.documentoSoporteServiciolocal.obtenerListaDocumentosProyecto();
    listaDocumentosProyecto.push(documentoProyecto);
    this.documentoSoporteServiciolocal.agregarListaDocumentosProyecto(listaDocumentosProyecto);
    this.cerrarModal();
  }

  get f() {
    return this.formularioAgregarDocumentoProyecto.controls;
  }


}
