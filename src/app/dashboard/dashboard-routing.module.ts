import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsloggedGuard } from '../guards/islogged.guard';
import { DashboardComponent } from './dashboard.component';
import { UserProjectsComponent } from './user-projects/user-projects.component';


const routes: Routes = [
  { path: '', canActivate: [IsloggedGuard], component: DashboardComponent, children: [
    { path: 'projects', component: UserProjectsComponent }
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
