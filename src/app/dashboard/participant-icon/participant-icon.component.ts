import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-participant-icon',
  templateUrl: './participant-icon.component.html',
  styleUrls: ['./participant-icon.component.scss']
})
export class ParticipantIconComponent implements OnInit {


  @Input('participant') participant: any;

  firstLetterOfTheName: string = "";

  constructor() { 
    
  }
  
  ngOnInit(): void {
    this.firstLetterOfTheName = this.participant.fullName[0];
    console.log(this.firstLetterOfTheName);
  }

}
