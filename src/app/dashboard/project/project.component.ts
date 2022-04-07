import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { setLastViewedProject } from 'src/app/+store/actions/projects';
import { projectSelector } from 'src/app/+store/selectors/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, OnDestroy {


  projectSubscription!: Subscription;


  loading: boolean;

  projectId: string;

  projectData: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private projectService: ProjectService,
    private store: Store
  ) { 
    this.projectId = "";
    this.loading = false;
  }

  ngOnInit(): void {

    this.loading = true;
    // get route params
    this.activatedRoute.params.subscribe(param => {
      this.projectId = param['id'];
    })



    // make request to get the project with Tasks model populations

    this.projectSubscription = this.projectService.getProjectById(this.projectId).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.titleService.setTitle(res.project.name);
        this.store.dispatch(setLastViewedProject(res.project));
        this.store.select(projectSelector).subscribe({
          next: (res) => {
            this.projectData = res;
            console.log("store", this.projectData);
          }
        })
      }
    })
  }



  ngOnDestroy(): void {
      this.projectSubscription.unsubscribe();
  }

}
