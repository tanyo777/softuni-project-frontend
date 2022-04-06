import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IUser } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { populateUser } from 'src/app/+store/actions/user';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  loading: boolean = false;

  user!: IUser;

  constructor(
    private userService: UserService,
    private store: Store
    ) { }

  ngOnInit(): void {
    this.loading = true;
    this.userService.getUser().subscribe({
      next: (user: any) => {
        this.user = user.user;
        this.store.dispatch(populateUser({ user: this.user }))
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      }
    })
  }
}
