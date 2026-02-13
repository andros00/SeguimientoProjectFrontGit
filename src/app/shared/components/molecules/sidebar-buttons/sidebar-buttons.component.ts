import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-buttons',
  template: `
    <div class="button-container">
      <app-button-secondary [label]="'LIMPIAR FILTROS'" />
      <app-button-primary [label]="'CONSULTAR'" [icon]="'search'" [type]="'button'" />
    </div>
  `,
  styleUrls: ['./sidebar-buttons.component.scss']
})
export class SidebarButtonsComponent { }
