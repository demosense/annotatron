import { Component, OnInit } from '@angular/core';
import {SidenavElement} from '@app/models/sidenav-element';

import { Store } from '@ngrx/store';
import * as fromStore from '../store';
import { Picture } from '@app/models';

@Component({
  selector: 'app-sidenav',
  template: `
    <mat-sidenav-container class="mat-elevation-z6">
      <mat-sidenav mode="side" opened="true" class="mat-elevation-z6">
        <mat-nav-list>
          <app-sidenav-upload-files-element
            [sidenavElement]="sidenavElements[0]"
            (upload)="onUploadPictures($event)">
          </app-sidenav-upload-files-element>
          <app-sidenav-remove-files-element
            [sidenavElement]="sidenavElements[1]"
            (remove)="onRemovePictures()">
          </app-sidenav-remove-files-element>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content fxLayout="row" fxLayoutAlign="center stretch" fxLayoutGap="10px">
        <ng-content></ng-content>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    mat-sidenav-container {
      height: 100vh;
      padding-top: 15px;
    }
  `]

})
export class SidenavComponent implements OnInit {

  sidenavElements: SidenavElement[] = [
    {
      name: 'Upload Pictures',
      icon: 'image'
    },
    {
      name: 'Remove Pictures',
      icon: 'delete'
    }
  ];

  constructor(private store: Store<fromStore.State>) { }

  ngOnInit() {
  }

  onUploadPictures(event: any) {
    const uploadFiles = [];
    // for (const f of event.target.files) {
    //   const reader = new FileReader();
    //   reader.readAsDataURL(f);
    //   reader.onload = (e: any) => {
    //     const o = { name: '', data: '' };
    //     uploadFiles.push('');
    //   };
    // }
    //
    // event.target.file.map(f => {
    //   const reader = new FileReader();
    //     reader.readAsDataURL(f);
    //     reader.onload = (e: any) => {
    //       const o = { name: '', data: '' };
    //       uploadFiles.push('');
    //     };
    // });
    // this.store.dispatch(new fromStore.LoadPictures(uploadFiles));
  }

  onRemovePictures() {
    return;
  }
}
