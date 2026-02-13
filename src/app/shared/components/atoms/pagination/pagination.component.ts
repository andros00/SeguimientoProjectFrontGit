import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  template: `
    <mat-paginator
      [length]="length"
      [pageSize]="pageSize"
      [pageSizeOptions]="pageSizeOptions"
      (page)="pageChange.emit($event)"
      aria-label="Proyectos por página"
    >
    </mat-paginator>
  `,
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  /**
   * Total number of items.
   */
  @Input() length: number = 0;

  /**
   * Number of items per page.
   */
  @Input() pageSize: number = 10;

  /**
   * Page size options.
   */
  @Input() pageSizeOptions: number[] = [5, 10, 25, 50];

  /**
   * Event emitted when the page or page size changes.
   */
  @Output() pageChange = new EventEmitter<any>();
}
