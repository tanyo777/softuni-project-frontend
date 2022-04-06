import { Component, OnInit } from '@angular/core';
import { IUser } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { populateUser } from '../+store/actions/user';
import { Priority } from '../interfaces/enumPriority';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user: IUser | undefined;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private titleService: Title,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Dashboard');
    this.userService.getUser().subscribe({
      next: (res: any) => {
        if (res.user) {
          this.user = res.user;
          this.store.dispatch(populateUser({ user: res.user }));
          // this.store.dispatch(
          //   populateTaskDropdowns({
          //     priorities: [
          //       { type: 'Highest', value: Priority.Highest },
          //       { type: 'Medium', value: Priority.Medium },
          //       { type: 'High', value: Priority.High },
          //       { type: 'Low', value: Priority.Low },
          //       { type: 'Lowest', value: Priority.Lowest },
          //     ],
          //     statuses: ['To do', 'In Progress', 'Done'],
          //     issueTypes: [
          //       {
          //         type: 'Bug',
          //         value: 'Bug',
          //         icon: '<mat-icon>bug_report</mat-icon>',
          //       },
          //       {
          //         type: 'Task',
          //         value: 'Task',
          //         icon: '<mat-icon>bug_report</mat-icon>',
          //       },
          //       {
          //         type: 'Story',
          //         value: 'Story',
          //         icon: '<mat-icon>bug_report</mat-icon>',
          //       },
          //       {
          //         type: 'Epic',
          //         value: 'Epic',
          //         icon: '<mat-icon>bug_report</mat-icon>',
          //       },
          //       {
          //         type: 'Test Case',
          //         value: 'Test Case',
          //         icon: '<mat-icon>bug_report</mat-icon>',
          //       },
          //       {
          //         type: 'Test Run',
          //         value: 'Test Run',
          //         icon: '<mat-icon>bug_report</mat-icon>',
          //       },
          //       {
          //         type: 'Test Scenario',
          //         value: 'Test Scenario',
          //         icon: '<mat-icon>bug_report</mat-icon>',
          //       },
          //     ],
          //   })
          // );
        }
      },
    });
  }

  logoutUser() {
    this.userService.logoutUser();
  }
}
