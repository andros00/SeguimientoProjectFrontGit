import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SteeperShowComponent } from './shared/components/molecules/show-project/steeper-show/steeper-show.component';

const routes: Routes = [
  {
    path: 'tramitesadministrativos',
    loadChildren: () => import('./routes/projects/projects.module').then(m => m.ProjectsModule),
  },
  {
    path: '**',
    redirectTo: 'tramitesadministrativos/seguimientoaproyectos',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
