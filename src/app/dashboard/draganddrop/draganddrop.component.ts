import { Component, Input, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ITask } from 'src/app/interfaces/task';
import { MatDialog } from '@angular/material/dialog';
import { ShowTaskComponent } from '../show-task/show-task.component';

@Component({
  selector: 'app-draganddrop',
  templateUrl: './draganddrop.component.html',
  styleUrls: ['./draganddrop.component.scss'],
})
export class DraganddropComponent implements OnInit {

  @Input() tasks!: ITask[];

  todo: ITask[];

  inProgress: ITask[];

  done: ITask[];

  constructor(private dialog: MatDialog) {
    this.todo = [];
    this.inProgress = [];
    this.done = [];
  }

  ngOnInit(): void {
    this.todo = this.tasks.filter((task) => task.status === 'To do');
    this.inProgress = this.tasks.filter(
      (task) => task.status === 'In Progress'
    );
    this.done = this.tasks.filter((task) => task.status === 'Done');
  }

  drop(event: CdkDragDrop<ITask[]>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }


  showEditTask(task: ITask): void {
    const dialogRef = this.dialog.open(ShowTaskComponent);
    dialogRef.componentInstance.task = task;

  }
}
