import { Component, Inject, } from '@angular/core';
import { ActaServiceService } from 'src/app/shared/services/file/acta-service.service';

@Component({
  selector: 'app-formal-start-support-doc',
  // standalone: true,
  // imports: [],
  templateUrl: './formal-start-support-doc.component.html',
  styleUrl: './formal-start-support-doc.component.scss'
})
export class FormalStartSupportDocComponent {

  constructor(@Inject('projectCode') public projectCode: string,
    private actaService: ActaServiceService) { }

  selectedFile!: File;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  subirArchivo() {
    if (!this.selectedFile) {
      console.error('No hay archivo seleccionado');
      return;
    }

    const projectId = '123'; // dinámico en tu caso

    this.actaService.uploadActa(this.selectedFile, this.projectCode)
      .subscribe({
        next: () => console.log('Archivo subido correctamente'),
        error: (err) => console.error('Error al subir archivo', err)
      });
  }

}
