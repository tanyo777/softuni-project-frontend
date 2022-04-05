import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-inner-section',
  templateUrl: './inner-section.component.html',
  styleUrls: ['./inner-section.component.scss']
})
export class InnerSectionComponent implements OnInit {


  @Input() header!: string;

  @Input() sectionValue: string | undefined = "";

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }


  changeUserProfileProperty(): void {
    const dialog = this.dialog.open(EditComponent);
    const instance = dialog.componentInstance;
    instance.label = this.header;
  }

}
