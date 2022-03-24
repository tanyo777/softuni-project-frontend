import { Component, OnInit } from '@angular/core';
import { state, transition, animate, trigger, style } from "@angular/animations";


@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss'],
  animations: [
    trigger("showHide", [
      state('show', style({
        opacity: 1,
        marginLeft: '0px'
      })),
      state('hide', style({
        opacity: 0,
        marginLeft: '20px'
      })),
      transition('show => hide', [
        animate('0.5s')
      ]),

      transition('hide => show', [
        animate('0.5s')
      ])
    ])
  ]
})
export class SystemComponent implements OnInit {


  loading: boolean;

  constructor() {
    this.loading = false;
  }

  ngOnInit(): void {
    this.loading = true;
    this.loading = false;
  }

}
