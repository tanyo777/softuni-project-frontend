import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, OnDestroy {


  projectSubscription!: Subscription;

  changeTasksViewToTales: boolean = false;

  loading: boolean;

  projectId: string;

  projectData: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private projectService: ProjectService
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
        this.projectData = res.project;
        this.loading = false;
        this.titleService.setTitle(res.project.name);
      }
    })
  }


  changeTasksViewToTalesHandler(): void {
    this.changeTasksViewToTales = !this.changeTasksViewToTales;
  }

  ngOnDestroy(): void {
      this.projectSubscription.unsubscribe();
  }

}
