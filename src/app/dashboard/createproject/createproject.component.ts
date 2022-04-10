import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import { populateUser } from 'src/app/+store/actions/user';

@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html',
  styleUrls: ['./createproject.component.scss']
})
export class CreateprojectComponent implements OnInit {


  loading: boolean = false;

  newProjectForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    key: new FormControl("", [Validators.required]),
    projectType: new FormControl("", [Validators.required]),
    projectCategory: new FormControl("", [Validators.required]),
    description: new FormControl(""),
  });

  constructor(
    private titleService: Title, 
    private projectsService: ProjectService,
    private router: Router,
    private userService: UserService,
    private store: Store
    ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Create Project");
  }


  createProject() {
    if(this.newProjectForm.valid) {
      this.loading = true;

      this.projectsService.postProject(this.newProjectForm.value).pipe(
        switchMap(data => this.userService.getUser())
      ).subscribe({
        next: (res: any) => {
          const user = res.user;

          this.store.dispatch(populateUser({ user }));

          this.loading = false;
          this.router.navigate(['/dashboard/projects']);
        },
        error: () => {
          this.loading = false;
        }
      })

    }
  }
}
