import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ITask } from 'src/app/interfaces/task';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-show-task',
  templateUrl: './show-task.component.html',
  styleUrls: ['./show-task.component.scss']
})
export class ShowTaskComponent implements OnInit {


  task!: ITask;

  editTaskForm: FormGroup = new FormGroup({
    summary: new FormControl("", [Validators.required]),
    issueType: new FormControl("", [Validators.required]),
    priority: new FormControl("", [Validators.required]),
    status: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    createdAt: new FormControl(""),
    updatedAt: new FormControl(""),
  });


  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    //  set controls values to match task props
    this.editTaskForm.controls['summary'].setValue(this.task.summary);
    this.editTaskForm.controls['issueType'].setValue(this.task.issueType);
    this.editTaskForm.controls['priority'].setValue(this.task.priority);
    this.editTaskForm.controls['status'].setValue(this.task.status);
    this.editTaskForm.controls['description'].setValue(this.task.description);
    this.editTaskForm.controls['createdAt'].setValue(this.task.createdAt);
    this.editTaskForm.controls['updatedAt'].setValue(this.task.updatedAt);
  }


  closeDialog(): void {
    this.dialog.closeAll();
  }


  editTask(): void {

  }

}
