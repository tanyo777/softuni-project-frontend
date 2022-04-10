import { Component, OnInit } from '@angular/core';
import { IUser } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { populateUser } from '../+store/actions/user';
import { populateDropdowns } from '../+store/actions/dropdowns';
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
          this.store.dispatch(
            populateDropdowns({
              priorities: [
                { type: 'Highest', value: Priority.Highest },
                { type: 'Medium', value: Priority.Medium },
                { type: 'High', value: Priority.High },
                { type: 'Low', value: Priority.Low },
                { type: 'Lowest', value: Priority.Lowest },
              ],
              issueTypes: [
                {
                  type: 'Bug',
                  value: 'Bug',
                },
                {
                  type: 'Task',
                  value: 'Task',
                },
                {
                  type: 'Story',
                  value: 'Story',
                },
                {
                  type: 'Epic',
                  value: 'Epic',
                },
                {
                  type: 'Test Case',
                  value: 'Test Case',
                },
                {
                  type: 'Test Run',
                  value: 'Test Run',
                },
                {
                  type: 'Test Scenario',
                  value: 'Test Scenario',
                },
              ],
            })
          );
        }
      },
    });
  }

  logoutUser() {
    this.userService.logoutUser();
  }
}
