import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompromisoService } from '../../../../../services/compromiso/compromiso.service';
import { MatFormFieldModule } from "@angular/material/form-field";
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { CompromisoFechaRequest } from 'src/app/core/request/CompromisoFechaRequest';
import { MatCard } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-compromiso-fecha',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, CommonModule, MatInputModule, MatCard, MatIcon],
  templateUrl: './compromiso-fecha.component.html',
  styleUrl: './compromiso-fecha.component.scss'
})
export class CompromisoFechaComponent {

  form: FormGroup;
  guardando = false;

  constructor(
    private fb: FormBuilder,
    private compromisoService: CompromisoService,
    private dialogRef: MatDialogRef<CompromisoFechaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number; usuario: string; }
  ) {
    this.form = this.fb.group({
      nuevaFecha: [null, Validators.required]
    });
  }

  guardar(): void {
    if (this.form.invalid) return;
    this.guardando = true;

    const nuevaFecha: CompromisoFechaRequest = {
          nuevaFecha: this.form.value.nuevaFecha,
          id: this.data.id,
          usuario: this.data.usuario, // luego puedes reemplazarlo por el real
        };

    this.compromisoService.actualizarFechaEstimada(nuevaFecha
    ).subscribe({
      next: () => {
        this.guardando = false;
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Error actualizando fecha estimada', err);
        this.guardando = false;
      }
    });
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }

  private formatearFecha(fecha: Date): string {
    const f = new Date(fecha);
    return f.toISOString().slice(0, 23); // yyyy-MM-ddTHH:mm:ss.SSS
  }
}
