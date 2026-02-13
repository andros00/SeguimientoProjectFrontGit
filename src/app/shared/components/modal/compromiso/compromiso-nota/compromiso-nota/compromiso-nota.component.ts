import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CompromisoNotaDTO } from 'src/app/core/interfaces/CompromisoNotaDTO';
import { CompromisoNotaService } from 'src/app/shared/services/compromiso/nota/compromiso-nota.service';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatCard } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-compromiso-nota',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, CommonModule, MatProgressSpinner, MatDialogContent, MatListModule, MatInputModule, MatCard, MatIcon],
  templateUrl: './compromiso-nota.component.html',
  styleUrl: './compromiso-nota.component.scss'
})
export class CompromisoNotaComponent {

  notas: CompromisoNotaDTO[] = [];
  formNota: FormGroup;
  cargando = false;


  constructor(
    private fb: FormBuilder,
    private compromisoService: CompromisoNotaService,
    public dialogRef: MatDialogRef<CompromisoNotaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { idCompromisoProyecto: number }
  ) {

    this.formNota = this.fb.group({
      nota: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarNotas();
  }

  cargarNotas() {
    this.cargando = true;
    this.compromisoService.buscarPoridCompromisoProyecto(this.data.idCompromisoProyecto).subscribe({
      next: (resp) => {
        this.notas = resp;
        this.cargando = false;
      },
      error: () => (this.cargando = false)
    });
  }

  guardarNota() {
    if (this.formNota.invalid) return;

    const nuevaNota: CompromisoNotaDTO = {
      idCompromisoProyecto: this.data.idCompromisoProyecto,
      nota: this.formNota.value.nota,
      usuarioCrea: '8061494', // luego puedes reemplazarlo por el real
      fechaCrea: new Date()
    };

    this.compromisoService.agregarNota(nuevaNota).subscribe({
      next: () => {
        this.formNota.reset();
        this.cargarNotas();
      },
      error: (err) => console.error(err)
    });
  }

  cerrar() {
    this.dialogRef.close();
  }

}
