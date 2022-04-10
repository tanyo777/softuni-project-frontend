import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { addParticipant } from 'src/app/+store/actions/projects';

@Component({
  selector: 'app-invitedialog',
  templateUrl: './invitedialog.component.html',
  styleUrls: ['./invitedialog.component.scss']
})
export class InvitedialogComponent implements OnInit {


  projectId!: string;

  inviteForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email])
  })

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private store: Store
    ) { }

  ngOnInit(): void {
  }

  invite() {

    
    if(this.inviteForm.valid) {
      const email = this.inviteForm.controls['email'].value;
      this.userService.inviteUser(email, this.projectId).subscribe({
        next: (user: any) => {
          if(user.error) {
            this._snackBar.open(user.error, "close");

            setTimeout(() => {
              this._snackBar.dismiss();
            }, 3000)
            // show error message
          } else {
            // add the user in the store to the currentProject

            this.store.dispatch(addParticipant(user.user));

            this.dialog.closeAll();
          }
        },
        error: (err: Error) => {
          // console.log("error message", err.message);
          // show error to the user
        } 
      })
      // close the dialog after the request is done
    }
  }

  

}
