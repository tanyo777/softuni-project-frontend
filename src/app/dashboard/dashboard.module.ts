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
import { CreateprojectComponent } from './createproject/createproject.component';
import { MatDialogModule } from "@angular/material/dialog";
import { CreateissueComponent } from './createissue/createissue.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from "@angular/material/select";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ParticipantIconComponent } from './participant-icon/participant-icon.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SystemComponent } from './system/system.component';

import { TaskComponent } from './task/task.component';
import { MatMenuModule } from '@angular/material/menu';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { DraganddropComponent } from './draganddrop/draganddrop.component';
import { ShowTaskComponent } from './show-task/show-task.component';
import { InnerSectionComponent } from './profile/inner-section/inner-section.component';
import { EditComponent } from './profile/edit/edit.component';
import { IssuebtnComponent } from './issuebtn/issuebtn.component';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    DashboardComponent,
    UserProjectsComponent,
    ProfilepicComponent,
    ProfileComponent,
    ProjectComponent,
    CreateprojectComponent,
    CreateissueComponent,
    ParticipantIconComponent,
    SystemComponent,
    TaskComponent,
    DraganddropComponent,
    ShowTaskComponent,
    InnerSectionComponent,
    EditComponent,
    IssuebtnComponent,

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatDialogModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatMenuModule,
    DragDropModule,
    MatDatepickerModule,
    MatNativeDateModule,

  ],
  exports: [

  ]
})
export class DashboardModule { }
