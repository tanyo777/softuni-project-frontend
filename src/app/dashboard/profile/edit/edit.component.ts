import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {


  label: string;

  constructor() { 
    this.label = "";
  }

  ngOnInit(): void {
  }

  editUserProperty(): void {

  }

}
