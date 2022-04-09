import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IProject } from 'src/app/interfaces/project';
import { ProjectService } from 'src/app/services/project.service';
import { leaveProject } from 'src/app/+store/actions/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-leave-dialog-manager',
  templateUrl: './leave-dialog-manager.component.html',
  styleUrls: ['./leave-dialog-manager.component.scss']
})
export class LeaveDialogManagerComponent implements OnInit {

  project!: IProject;

  participantId!: string;

  leaveAndAssignManagerPrivilegesForm = new FormGroup({
    newManagerEmail: new FormControl("", [Validators.required, Validators.email])
  })

  constructor(
    private projectService: ProjectService,
    private store: Store,
    private router: Router,
    private matDialog: MatDialog,
    private _snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
  }

  leave(): void {
    const pmEmail = this.leaveAndAssignManagerPrivilegesForm.controls['newManagerEmail'].value;
    const projectId = this.project._id;
    if (this.leaveAndAssignManagerPrivilegesForm.valid) {
      this.projectService.leaveProjectManager(projectId, this.participantId, pmEmail).subscribe({
        next: (res: any) => {
          if(res.error) {
            // show snackbar
            this.openSnackBar(res.error, "close");

            setTimeout(() => {
              this._snackBar.dismiss();
            }, 3000)
          } else {
            console.log(res);
            this.store.dispatch(leaveProject({ id: projectId }));
            this.matDialog.closeAll();
            this.router.navigate(['/dashboard/projects']);
          }
        }
      })
    }
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
