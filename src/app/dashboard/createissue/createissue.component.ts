import { Component, OnInit } from '@angular/core';


interface IIssue {
  type: string;
  value: string;
  icon: string;
}


interface IPriority {
  type: string;
  value: string;
}


@Component({
  selector: 'app-createissue',
  templateUrl: './createissue.component.html',
  styleUrls: ['./createissue.component.scss']
})
export class CreateissueComponent implements OnInit {


  // selectedType
  selectedType?: IIssue;

  // all issue types
  issueTypes?: IIssue[];


  // priorities
  priorities?: IPriority[];


  // selected priority
  seelectedPriority?: IPriority;


  constructor() {
    this.issueTypes = [
      {type: "Bug", value: "Bug", icon: "<mat-icon>bug_report</mat-icon>"},
      {type: "Task", value: "Task", icon: "<mat-icon>bug_report</mat-icon>"},
      {type: "Story",  value: "Story", icon: "<mat-icon>bug_report</mat-icon>"},
      {type: "Epic",  value: "Epic", icon: "<mat-icon>bug_report</mat-icon>"},
      {type: "Test Case",  value: "Test Case", icon: "<mat-icon>bug_report</mat-icon>"},
      {type: "Test Run",  value: "Test Run", icon: "<mat-icon>bug_report</mat-icon>"},
      {type: "Test Scenario",  value: "Test Scenario", icon: "<mat-icon>bug_report</mat-icon>"},
    ];



    this.priorities = [
      { type: "Highest", value: "Highest"},
      { type: "Medium", value: "Medium"},
      { type: "High", value: "High"},
      { type: "Low", value: "Low"},
      { type: "Lowest", value: "Lowest"}
    ];
  }

  ngOnInit(): void {
  }

}

