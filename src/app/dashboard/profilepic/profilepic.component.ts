import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/interfaces/user';
import { userSelector } from 'src/app/state/selectors/user';

@Component({
  selector: 'app-profilepic',
  templateUrl: './profilepic.component.html',
  styleUrls: ['./profilepic.component.scss'],
})
export class ProfilepicComponent implements OnInit {
  // firstLetter: string;

  user!: Observable<IUser>;


  constructor(private store: Store) {
    // this.firstLetter = "";
    this.user = this.store.select(userSelector);
  }
  ngOnInit(): void {}
}
