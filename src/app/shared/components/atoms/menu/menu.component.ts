import { Component, Input } from '@angular/core';
import { IMenuItem } from 'src/app/core/interfaces/IMenuItems';

import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatButtonModule, MatIconModule],
  template: `
    <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="Dynamic menu button">
      <mat-icon>more_horiz</mat-icon>
    </button>
    <mat-menu #menu="matMenu">
      <button
        mat-menu-item
        *ngFor="let item of menuItems"
        [disabled]="item.disabled"
        (click)="item.action()"
      >
        <mat-icon>{{ item.icon }}</mat-icon>
        <span>{{ item.label }}</span>
      </button>
    </mat-menu>
  `,
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Input() menuItems: IMenuItem[] = [];
}
