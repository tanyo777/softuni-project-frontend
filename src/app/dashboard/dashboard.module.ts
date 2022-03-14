import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from "@angular/material/sidenav";
import { UserProjectsComponent } from './user-projects/user-projects.component';
import { ProfilepicComponent } from './profilepic/profilepic.component';
import { ProfileComponent } from './profile/profile.component';
import { ProjectComponent } from './project/project.component';


@NgModule({
  declarations: [
    DashboardComponent,
    UserProjectsComponent,
    ProfilepicComponent,
    ProfileComponent,
    ProjectComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule
  ]
})
export class DashboardModule { }
