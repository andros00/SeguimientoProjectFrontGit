import { Component, Inject } from '@angular/core';
import { ActaServiceService } from 'src/app/shared/services/file/acta-service.service';

@Component({
  selector: 'app-formal-start-minutes',
  // standalone: true,
  // imports: [],
  templateUrl: './formal-start-minutes.component.html',
  styleUrl: './formal-start-minutes.component.scss'
})
export class FormalStartMinutesComponent {


  constructor(@Inject('projectCode') public projectCode: string,
    private actaService: ActaServiceService) { }

  descargarActa(): void {

this.actaService.generarActa(this.projectCode).subscribe((pdfBlob: Blob) => {
  const fileURL = URL.createObjectURL(pdfBlob);
  window.open(fileURL, '_blank');
});



    // this.actaService.generarActa(this.projectCode).subscribe({
    //   next: (pdfBlob) => {
    //     const url = window.URL.createObjectURL(pdfBlob);
    //     const a = document.createElement('a');
    //     a.href = url;
    //     a.download = 'acta.pdf';
    //     document.body.appendChild(a);
    //     a.click();
    //     document.body.removeChild(a);
    //     window.URL.revokeObjectURL(url);
    //   },
    //   error: (err) => console.error('Error descargando el acta:', err)
    // });
  }
}


