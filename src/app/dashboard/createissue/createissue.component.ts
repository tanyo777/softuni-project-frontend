import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TaskService } from 'src/app/services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { IIssue, IPriority } from 'src/app/interfaces/issue';
import { UserService } from 'src/app/services/user.service';
import { projectSelector } from 'src/app/+store/selectors/project';
import { addIssueToSelectedProject } from 'src/app/+store/actions/projects';
import { dropdownsSelector } from 'src/app/+store/selectors/dropdowns';


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

  // selectedProject!: IProject;

  selectedProjectId!: string;

  constructor(
    private store: Store, 
    private taskService: TaskService,
    private router: Router,
    public dialog: MatDialog,
    private userService: UserService
  ) {
   
  }

  ngOnInit(): void {

    this.store.select(dropdownsSelector).subscribe({
      next: (dropdowns) => {
        this.issueTypes = dropdowns.issueTypes;
        this.priorities = dropdowns.priorities;
      }
    })

    this.userService.getUser().subscribe({
      next: (user: any) => {
        this.createIssueForm.controls['reporter'].setValue(user.user.username);
        this.projects = user.user.projects;
      }
    })

    this.store.select(projectSelector).subscribe({
      next: (res: any) => {
        this.selectedProjectId = res._id;
      }
    });
  }



  submitIssue() {
    if(this.createIssueForm.valid) {
      const payload = this.createIssueForm.value;
      this.taskService.postTask(payload).subscribe((res: any) => {
        if(res.msg) {
          const projectId = res.msg.project;
          if(this.selectedProjectId === projectId) {
            this.store.dispatch(addIssueToSelectedProject(res.msg));
          }
          this.dialog.closeAll();
          // this.router.navigate(['/dashboard/projects']);
        }
      });
    }
  }

  cancelCreateIssueModal(): void {
    this.dialog.closeAll();
  }

}

