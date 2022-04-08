import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ITask } from 'src/app/interfaces/task';
import { MatDialog } from '@angular/material/dialog';
import { ShowTaskComponent } from '../show-task/show-task.component';
import { TaskService } from 'src/app/services/task.service';
import { Store } from '@ngrx/store';
import { changeTaskStatus } from 'src/app/+store/actions/projects';
import { projectSelector } from 'src/app/+store/selectors/project';

@Component({
  selector: 'app-draganddrop',
  templateUrl: './draganddrop.component.html',
  styleUrls: ['./draganddrop.component.scss'],
})
export class DraganddropComponent implements OnInit {
  // @Input() tasks!: ITask[];
  tasks!: ITask[];

  todo: ITask[];

  inProgress: ITask[];

  done: ITask[];

  constructor(
    private dialog: MatDialog,
    private taskService: TaskService,
    private store: Store
  ) {
    this.todo = [];
    this.inProgress = [];
    this.done = [];
  }

  ngOnInit(): void {
    this.store.select(projectSelector).subscribe({
      next: (res: any) => {
        this.tasks = res.tasks;
        this.todo = this.tasks.filter((task) => task.status === 'To do');

        this.inProgress = this.tasks.filter(
          (task) => task.status === 'In Progress'
        );

        this.done = this.tasks.filter((task) => task.status === 'Done');
      },
    });
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // dragged task (id)
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const status: any =
        event.container.element.nativeElement.parentNode?.firstChild
          ?.textContent;

      console.log(status);

      const taskId = event.item.element.nativeElement.id;
      this.store.dispatch(changeTaskStatus({ status, id: taskId }));
      this.taskService.updateTaskStatus(taskId, status).subscribe({
        next: (res) => {},
      });
    }
  }

  showEditTask(task: ITask): void {
    const dialogRef = this.dialog.open(ShowTaskComponent);
    dialogRef.componentInstance.task = task;
  }
}
