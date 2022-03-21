import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IProject } from 'src/app/interfaces/project';
import { UserService } from 'src/app/services/user.service';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-user-projects',
  templateUrl: './user-projects.component.html',
  styleUrls: ['./user-projects.component.scss']
})
export class UserProjectsComponent implements OnInit {

  

  loading: boolean = false;

  displayedColumns: string[] = ['name', 'projectType', 'key'];

  dataSource: any;

  constructor(private titleService: Title, private userService: UserService) { }

  projects: IProject[] = [];


  ngOnInit(): void {
    this.titleService.setTitle("Projects");
    this.loading = true;
    this.userService.getUser().subscribe({
      next: (res: any) => {
        if(res.user) {
          this.projects = res.user.projects;
          this.dataSource = new MatTableDataSource(this.projects);
          this.loading = false;
        }
      }
    });
  }

}
