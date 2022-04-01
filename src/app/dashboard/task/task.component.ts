import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ITask } from 'src/app/interfaces/task';
import { ShowTaskComponent } from '../show-task/show-task.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  
  @Input() task!: ITask;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(ShowTaskComponent);
    dialogRef.componentInstance.task = this.task;
  }

}
