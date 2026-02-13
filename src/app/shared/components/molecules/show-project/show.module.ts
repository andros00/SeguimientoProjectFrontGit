import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMaterialModule } from './angular-material.module';
import { ShowProjectReadonlyComponent } from './show-project-readonly/show-project-readonly.component';

@NgModule({
  declarations: [ShowProjectReadonlyComponent],
  imports: [CommonModule, SharedModule, AngularMaterialModule],
  exports: [ShowProjectReadonlyComponent]
})
export class ShowModule { }
