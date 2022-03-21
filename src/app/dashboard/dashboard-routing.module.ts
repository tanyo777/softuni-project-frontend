import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsloggedGuard } from '../guards/islogged.guard';
import { CreateprojectComponent } from './createproject/createproject.component';
import { DashboardComponent } from './dashboard.component';
import { ProjectComponent } from './project/project.component';
import { UserProjectsComponent } from './user-projects/user-projects.component';


const routes: Routes = [
  { path: '', canActivate: [IsloggedGuard], component: DashboardComponent, children: [
    { path: 'projects', component: UserProjectsComponent },
    { path: 'create-project', component: CreateprojectComponent },
    { path: "projects/:id", component: ProjectComponent}
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
