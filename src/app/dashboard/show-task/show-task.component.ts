import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ITask } from 'src/app/interfaces/task';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { Store } from '@ngrx/store';
import { deleteTask, editTaskProps } from 'src/app/+store/actions/projects';
import { dropdownsSelector } from 'src/app/+store/selectors/dropdowns';
import { IUser } from 'src/app/interfaces/user';


@Component({
  selector: 'app-show-task',
  templateUrl: './show-task.component.html',
  styleUrls: ['./show-task.component.scss'],
})
export class ShowTaskComponent implements OnInit {
  task!: ITask;

  participants!: IUser[];

  dropdowns!: {issueTypes: [{type: string, value: string}]};

  editTaskForm: FormGroup = new FormGroup({
    summary: new FormControl('', [Validators.required]),
    issueType: new FormControl('', [Validators.required]),
    priority: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    createdAt: new FormControl(''),
    updatedAt: new FormControl(''),
    assignedTo: new FormControl('')
  });

  constructor(
    private dialog: MatDialog,
    private taskService: TaskService,
    private store: Store
  ) {}

  ngOnInit(): void {

    console.log(this.task);

    this.store.select(dropdownsSelector).subscribe({
      next: (dropdowns) => {
        this.dropdowns = dropdowns;
        console.log(dropdowns);
      }
    });
    //  set controls values to match task props
    this.editTaskForm.controls['summary'].setValue(this.task.summary);
    this.editTaskForm.controls['issueType'].setValue(this.task.issueType);
    this.editTaskForm.controls['priority'].setValue(this.task.priority);
    this.editTaskForm.controls['description'].setValue(this.task.description);
    this.editTaskForm.controls['createdAt'].setValue(this.task.createdAt);
    this.editTaskForm.controls['updatedAt'].setValue(this.task.updatedAt);
    this.editTaskForm.controls['assignedTo'].setValue(this.task.assignedTo);

    
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

  editTask(): void {
    if(this.editTaskForm.valid) {
      const editValues = this.editTaskForm.value;
      const id = this.task._id;


      console.log(editValues);
      // request

      this.taskService.updateTask(id, editValues).subscribe({
        next: (res: any) => {
          let { summary, issueType, priority, description, createdAt, updatedAt, assignedTo } = editValues;

          // put the edited task to the store
          this.store.dispatch(editTaskProps({ id, summary, issueType, priority, description, createdAt, updatedAt, assignedTo}));
          this.closeDialog();
        },
        error: (error: Error) => {
          console.log(error.message);
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
        console.log(error.message);
      },
    });
  }
}
