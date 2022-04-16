import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-inner-section',
  templateUrl: './inner-section.component.html',
  styleUrls: ['./inner-section.component.scss']
})
export class InnerSectionComponent implements OnInit {


  @Input() header!: string;

  @Input() sectionValue: string | undefined = "";

  constructor() {
  }

  ngOnInit(): void {
  }
}
