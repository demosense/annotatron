import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SidenavElement } from '@app/models/sidenav-element';

@Component({
  selector: 'app-sidenav-upload-files-element',
  template: `
    <a mat-list-item (click)="selectFile()">
      <mat-icon mat-list-icon>{{ sidenavElement.icon }}</mat-icon>
      <p mat-line>{{ sidenavElement.name }}</p>
      <input type="file" (change)="uploadPictures($event)" multiple #inputFiles>
    </a>
  `,
  styles: []
})
export class SidenavUploadFilesElementComponent implements OnInit {
  @Input() sidenavElement: SidenavElement;
  @Output() upload = new EventEmitter<any>();
  @ViewChild('inputFiles') nativeInputFile: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  public uploadPictures(event) {
    console.log(event);
    this.upload.emit(event);
  }

  public selectFile() {
    this.nativeInputFile.nativeElement.click();
  }
}
