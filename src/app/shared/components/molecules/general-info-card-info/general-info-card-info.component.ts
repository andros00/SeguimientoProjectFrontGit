import { Component } from '@angular/core';

@Component({
  selector: 'app-general-info-card-info',
  template: `
    <mat-card class="info-card">
      <div class="header">
        <div class="avatar">
          <img src="assets/avatar.png" alt="Avatar">
        </div>
        <div class="title">Centro administrativo</div>
        <mat-icon matTooltip="Más información">info</mat-icon>
      </div>

      <div class="content">
        <mat-icon class="email-icon">mail</mat-icon>
        <div class="email-text">
          <span class="email-title">Correo electrónico</span>
          <span class="email">sandra.zabala.udea.edu.co</span>
        </div>
      </div>
    </mat-card>
  `,
  styleUrls: ['./general-info-card-info.component.scss']
})
export class GeneralInfoCardInfoComponent { }
