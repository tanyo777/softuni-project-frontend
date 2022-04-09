import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { leaveProject } from 'src/app/+store/actions/user';
import { IProject } from 'src/app/interfaces/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-leave-dialog',
  templateUrl: './leave-dialog.component.html',
  styleUrls: ['./leave-dialog.component.scss']
})
export class LeaveDialogComponent implements OnInit {


  project!: IProject;

  participantId!: string;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private matDialog: MatDialog,
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  leaveHandler(): void {
    const projectId = this.project._id;
    console.log(projectId);
    console.log(this.participantId);
    this.projectService.leaveProjectParticipant(projectId, this.participantId).subscribe({
      next: (res) => {
        this.store.dispatch(leaveProject({ id: projectId }));
        this.matDialog.closeAll();
        this.router.navigate(['/dashboard/projects']);
      }
    })
  }

}
