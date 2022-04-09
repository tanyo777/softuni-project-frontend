import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { setLastViewedProject } from 'src/app/+store/actions/projects';
import { projectSelector } from 'src/app/+store/selectors/project';
import { userSelector } from 'src/app/+store/selectors/user';
import { IUser } from 'src/app/interfaces/user';
import { ProjectService } from 'src/app/services/project.service';
import { InvitedialogComponent } from './invitedialog/invitedialog.component';
import { LeaveDialogManagerComponent } from './leave-dialog-manager/leave-dialog-manager.component';
import { LeaveDialogComponent } from './leave-dialog/leave-dialog.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, OnDestroy {


  projectSubscription!: Subscription;


  currentLoggedUser!: IUser;

  loading: boolean;

  projectId: string;

  projectData: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private projectService: ProjectService,
    private store: Store,
    private dialog: MatDialog
  ) {
    this.projectId = "";
    this.loading = false;
  }

  ngOnInit(): void {

    this.loading = true;
    // get route params
    this.activatedRoute.params.subscribe(param => {
      this.projectId = param['id'];
    })

    this.store.select(userSelector).subscribe({
      next: (res) => {
        this.currentLoggedUser = res;
      }
    })


    // make request to get the project with Tasks model populations
    this.projectSubscription = this.projectService.getProjectById(this.projectId).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.titleService.setTitle(res.project.name);
        this.store.dispatch(setLastViewedProject(res.project));
        this.store.select(projectSelector).subscribe({
          next: (res) => {
            this.projectData = res;
          }
        })
      }
    })
  }



  showLeaveDiloag(): void {
    if (this.currentLoggedUser._id === this.projectData.lead._id) {
      let dialogRefManager = this.dialog.open(LeaveDialogManagerComponent);
      let instance = dialogRefManager.componentInstance;
      instance.participantId = this.currentLoggedUser._id;
      instance.project = this.projectData;
    } else {
      let dialogRefParticipant = this.dialog.open(LeaveDialogComponent);
      let instance = dialogRefParticipant.componentInstance;
      instance.participantId = this.currentLoggedUser._id;
      instance.project = this.projectData;
    }
  }

  showInviteDialog(): void {
    let dialogRef = this.dialog.open(InvitedialogComponent);
    let instance = dialogRef.componentInstance;
    instance.projectId = this.projectData._id;
  }


  ngOnDestroy(): void {
    this.projectSubscription.unsubscribe();
  }

}
