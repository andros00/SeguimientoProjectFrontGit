import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-show-project-readonly',
  templateUrl: './show-project-readonly.component.html',
  styleUrls: ['./show-project-readonly.component.scss']
})
export class ShowProjectReadonlyComponent {
  @Input() proyecto: any | null = null;
}
