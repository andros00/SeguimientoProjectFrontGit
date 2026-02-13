import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsListComponent } from './pages/projects-list/projects-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormalStartPagesComponent } from './pages/formal-start-pages/formal-start-pages.component';
import { ShowModule } from 'src/app/shared/components/molecules/show-project/show.module';


@NgModule({
  declarations: [
    ProjectsListComponent,
    FormalStartPagesComponent,
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule,

    ShowModule
  ]
})
export class ProjectsModule { }
