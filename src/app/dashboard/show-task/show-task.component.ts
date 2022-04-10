import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ITask } from 'src/app/interfaces/task';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { Store } from '@ngrx/store';
import { deleteTask, editTaskProps } from 'src/app/+store/actions/projects';
import { dropdownsSelector } from 'src/app/+store/selectors/dropdowns';
import { IUser } from 'src/app/interfaces/user';
import { DatePipe } from '@angular/common';
import { IIssue, IPriority } from 'src/app/interfaces/issue';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-show-task',
  templateUrl: './show-task.component.html',
  styleUrls: ['./show-task.component.scss'],
})
export class ShowTaskComponent implements OnInit {
  task!: ITask;

  participants!: IUser[];


  editTaskForm: FormGroup = new FormGroup({
    summary: new FormControl('', [Validators.required]),
    issueType: new FormControl('', [Validators.required]),
    priority: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    createdAt: new FormControl(''),
    updatedAt: new FormControl(''),
    assignedTo: new FormControl('')
  });

  priorities!: IPriority[];

  issueTypes!: IIssue[];

  constructor(
    private dialog: MatDialog,
    private taskService: TaskService,
    private store: Store,
    private datePipe: DatePipe,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {


    this.store.select(dropdownsSelector).subscribe({
      next: (dropdowns) => {
        this.priorities = dropdowns.priorities;
        this.issueTypes = dropdowns.issueTypes;
      }
    });

    const updatedAt = this.datePipe.transform(this.task.updatedAt, "dd/MM/yyyy");
    const createdAt = this.datePipe.transform(this.task.createdAt, "dd/MM/yyyy");


    //  set controls values to match task props
    this.editTaskForm.controls['summary'].setValue(this.task.summary);
    this.editTaskForm.controls['issueType'].setValue(this.task.issueType);
    this.editTaskForm.controls['priority'].setValue(this.task.priority);
    this.editTaskForm.controls['description'].setValue(this.task.description);
    this.editTaskForm.controls['createdAt'].setValue(createdAt);
    this.editTaskForm.controls['updatedAt'].setValue(updatedAt);
    this.editTaskForm.controls['assignedTo'].setValue(this.task.assignedTo);

    
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

  editTask(): void {
    if(this.editTaskForm.valid) {
      const editValues = this.editTaskForm.value;
      const id = this.task._id;

      // request

      this.taskService.updateTask(id, editValues).subscribe({
        next: (res: any) => {
          let { summary, issueType, priority, description, createdAt, updatedAt, assignedTo } = editValues;

          // put the edited task to the store
          this.store.dispatch(editTaskProps({ id, summary, issueType, priority, description, createdAt, updatedAt, assignedTo}));
          this.closeDialog();
        },
        error: (error: Error) => {
          this._snackbar.open(error.message, "close");
          setTimeout(() => {
            this._snackbar.dismiss();
          }, 2500);
        }
      })
    }
  }

  deleteTaskHandler(id: string): void {
    this.taskService.deleteTaskById(id).subscribe({
      next: (res) => {
        this.store.dispatch(deleteTask({ id }));
        
        this.dialog.closeAll();
      },
      error: (error: Error) => {
        // console.log(error.message);
      },
    });
  }
}
