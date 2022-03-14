import { Component, OnInit } from '@angular/core';
import { IUser } from '../interfaces/user';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  user: IUser | undefined;

  constructor(private userService: UserService) { 
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (res: any) => {
        if(res.user) {
          this.user = res.user;
        }
      }
    });;
  }



  logoutUser() {
    this.userService.logoutUser();
  }

}
