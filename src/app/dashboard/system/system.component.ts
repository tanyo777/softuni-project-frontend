import { Component, OnInit } from '@angular/core';
// import { state, transition, animate, trigger, style } from "@angular/animations";
import { Store } from '@ngrx/store';
import { userSelector } from 'src/app/+store/selectors/user';
import { IUser } from 'src/app/interfaces/user';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss'],
  // animations: [
  //   trigger("showHide", [
  //     state('show', style({
  //       opacity: 1,
  //       marginLeft: '0px'
  //     })),
  //     state('hide', style({
  //       opacity: 0,
  //       marginLeft: '20px'
  //     })),
  //     transition('show => hide', [
  //       animate('0.5s')
  //     ]),

  //     transition('hide => show', [
  //       animate('0.5s')
  //     ])
  //   ])
  // ]
})
export class SystemComponent implements OnInit {


  accountCreatedOn: string;

  loading: boolean;

  constructor(
    private store: Store
  ) {
    this.loading = false;
    this.accountCreatedOn = "";
  }

  ngOnInit(): void {
    this.store.select(userSelector).subscribe({
      next: (userData: IUser) => {
        console.log(userData);
        this.accountCreatedOn = userData.createdAt;
      }
    });
    // this.loading = true;
    // this.loading = false;
  }

}
