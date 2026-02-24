import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsListComponent } from './pages/projects-list/projects-list.component';
import { FormalStartPagesComponent } from './pages/formal-start-pages/formal-start-pages.component';
import { CargadorProyectoComponent } from 'src/app/shared/components/molecules/show-project/cargador-proyecto/cargador-proyecto.component';
import { SteeperShowComponent } from 'src/app/shared/components/molecules/show-project/steeper-show/steeper-show.component';
import { ContenedorProyectoComponent } from 'src/app/shared/components/molecules/show-project/contenedor-proyecto/contenedor-proyecto.component';

const routes: Routes = [
  {
    path: 'seguimientoaproyectos',
    component: ProjectsListComponent
  },
  {
    path: 'seguimientoaproyectos/inicioformal/:id',
    component: FormalStartPagesComponent
  },
  { path: 'seguimientoaproyectos/proyecto', component: SteeperShowComponent },
  {
    path: 'seguimientoaproyectos/verproyecto/:proyecto',
    component: CargadorProyectoComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
