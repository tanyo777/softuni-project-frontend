import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsloggedGuard } from '../guards/islogged.guard';
import { CreateprojectComponent } from './createproject/createproject.component';
import { DashboardComponent } from './dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ProjectComponent } from './project/project.component';
import { SystemComponent } from './system/system.component';
import { UserProjectsComponent } from './user-projects/user-projects.component';


const routes: Routes = [
  { path: '', canActivate: [IsloggedGuard], component: DashboardComponent, children: [
    { path: '', component: SystemComponent},
    { path: 'projects', component: UserProjectsComponent },
    { path: 'create-project', component: CreateprojectComponent },
    { path: "projects/:id", component: ProjectComponent},
    { path: "profile", component: ProfileComponent}
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
