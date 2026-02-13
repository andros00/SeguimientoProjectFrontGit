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
    console.warn('agregarDocumentoSoporte deshabilitado en modo solo lectura (agregar-documento-soporte).');
  }

  get f() {
    return this.formularioAgregarDocumentoProyecto.controls;
  }


}
