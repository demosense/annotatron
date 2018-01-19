import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Box, Label } from '@app/models';
import * as fromRoot from '@app/store';
import { LabelValue } from '@app/models/label';


@Component({
  selector: 'app-main',
  template: `
    <div fxLayout="row" fxLayoutAlign="start stretch" fxLayoutGap="10px" >

      <mat-card>
        <mat-card-header>
          <mat-card-title>Picture Title</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <app-picture></app-picture>
        </mat-card-content>
        <mat-card-actions>
          <app-picture-button [icon]="'favorite'"></app-picture-button>
          <app-picture-button icon="favorite"></app-picture-button>
        </mat-card-actions>
      </mat-card>

      <div fxLayout="column" fxLayoutAlign="start" fxLayoutGap="10px" >
        <mat-card>
          <mat-card-header>
            <mat-card-title>Boxes</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <app-box-list
            [boxes]="boxes$ | async"
            (select)="selectBox($event)">
            </app-box-list>
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-header>
            <mat-card-title>Labels</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <app-label-list
              [labels]="labels$ | async"
              (updates)="updateLabel($event)">
            </app-label-list>
          </mat-card-content>
        </mat-card>
      </div>

    </div>
  `,
  styles: []
})
export class MainComponent implements OnInit {

  boxes$: Observable<Box[]>;
  labels$: Observable<Label[]>;

  constructor(
    private store: Store<fromRoot.State>,
  ) {
    this.boxes$ = this.store.select(fromRoot.getAllBoxes);
    this.labels$ = this.store.select(fromRoot.getAllLabels);
  }

  ngOnInit() {
  }

  private updateLabel(labelValue: LabelValue) {
    // TODO: stub replace with actual picture id
    const pictureId = 0;
    this.store.dispatch(new fromRoot.UpdateLabel({ pictureId, labelValue }));
  }

  private selectBox(event: number) {
    console.log(event);
  }
}

