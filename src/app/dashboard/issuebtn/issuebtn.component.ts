import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { userSelector } from 'src/app/state/selectors/user';
import { CreateissueComponent } from '../createissue/createissue.component';

@Component({
  selector: 'app-issuebtn',
  templateUrl: './issuebtn.component.html',
  styleUrls: ['./issuebtn.component.scss']
})
export class IssuebtnComponent implements OnInit {


  projectsLength!: number;

  constructor(
    private store: Store, 
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.store.select(userSelector).subscribe({
      next: (res) => {
        this.projectsLength = res.projects.length;
      }
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateissueComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
