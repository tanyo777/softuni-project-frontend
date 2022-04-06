import { Component, OnInit } from '@angular/core';
import { IUser } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateissueComponent } from './createissue/createissue.component';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { populateUser } from '../state/actions/user';
import { userSelector } from '../state/selectors/user';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  user: IUser | undefined;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private titleService: Title,
    private store: Store
    ) { 
  }

  ngOnInit(): void {
    this.titleService.setTitle("Dashboard");
    this.userService.getUser().subscribe({
      next: (res: any) => {
        if(res.user) {
          this.user = res.user;
           this.store.dispatch(populateUser({ user: res.user }));
        } 
      }
    });
  }




  logoutUser() {
    this.userService.logoutUser();
  }

}
