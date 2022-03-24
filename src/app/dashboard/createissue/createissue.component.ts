import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TaskService } from 'src/app/services/task.service';
import { userSelector} from "../../state/selectors/user";

interface IIssue {
  type: string;
  value: string;
  icon: string;
}


interface IPriority {
  type: string;
  value: string;
}


@Component({
  selector: 'app-createissue',
  templateUrl: './createissue.component.html',
  styleUrls: ['./createissue.component.scss']
})
export class CreateissueComponent implements OnInit {



  createIssueForm = new FormGroup({
    project: new FormControl("", [Validators.required]),
    issueType: new FormControl("", [Validators.required]),
    summary: new FormControl("", [Validators.required]),
    reporter: new FormControl("", [Validators.required]),
    description: new FormControl(""),
    priority: new FormControl("", [Validators.required])
  })

  // selectedType
  selectedType?: IIssue;

  // all issue types
  issueTypes?: IIssue[];


  // priorities
  priorities?: IPriority[];


  // selected priority
  seelectedPriority?: IPriority;


  projects: any[] = [];


  constructor(
    private store: Store, 
    private taskService: TaskService,
    private router: Router
  ) {
    this.issueTypes = [
      {type: "Bug", value: "Bug", icon: "<mat-icon>bug_report</mat-icon>"},
      {type: "Task", value: "Task", icon: "<mat-icon>bug_report</mat-icon>"},
      {type: "Story",  value: "Story", icon: "<mat-icon>bug_report</mat-icon>"},
      {type: "Epic",  value: "Epic", icon: "<mat-icon>bug_report</mat-icon>"},
      {type: "Test Case",  value: "Test Case", icon: "<mat-icon>bug_report</mat-icon>"},
      {type: "Test Run",  value: "Test Run", icon: "<mat-icon>bug_report</mat-icon>"},
      {type: "Test Scenario",  value: "Test Scenario", icon: "<mat-icon>bug_report</mat-icon>"},
    ];



    this.priorities = [
      { type: "Highest", value: "Highest"},
      { type: "Medium", value: "Medium"},
      { type: "High", value: "High"},
      { type: "Low", value: "Low"},
      { type: "Lowest", value: "Lowest"}
    ];
  }

  ngOnInit(): void {
    this.store.select(userSelector).subscribe({
      next: (res: any) => {
        console.log(res);
        this.projects = res.projects;
      }
    });
  }


  submitIssue() {
    if(this.createIssueForm.valid) {
      const payload = this.createIssueForm.value;
      this.taskService.postTask(payload).subscribe((res: any) => {
        if(res.msg) {
          this.router.navigate(['/dashboard/projects']);
        }
      });
    }
  }

}

