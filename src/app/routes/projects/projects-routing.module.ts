import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsListComponent } from './pages/projects-list/projects-list.component';
import { FormalStartPagesComponent } from './pages/formal-start-pages/formal-start-pages.component';
import { CargadorProyectoComponent } from 'src/app/shared/components/molecules/show-project/cargador-proyecto/cargador-proyecto.component';

const routes: Routes = [
  {
    path: 'seguimientoaproyectos',
    component: ProjectsListComponent
  },
  {
    path: 'seguimientoaproyectos/inicioformal/:id',
    component: FormalStartPagesComponent
  },
  {
    path: 'seguimientoaproyectos/verproyecto/:id',
    component: CargadorProyectoComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
