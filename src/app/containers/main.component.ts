import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { first, map, combineLatest, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import {Box, Label, Picture} from '@app/models';
import * as fromRoot from '@app/store';

import { LabelValue } from '@app/models/label';
import { PicturesService } from '@app/services';

@Component({
  selector: 'app-main',
  template: `
    <div fxLayout="row" fxLayoutAlign="start stretch" fxLayoutGap="10px" >

      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ (picture$ | async)?.file | slice:0:20 }}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <app-picture
            [picture]="picture$ | async"
            [pictureData]="pictureData$ | async"
            [boxes]="(picture$ | async)?.boxes"
            [selectedBox]="selectedBox$ | async"
            [boxesEntities]="boxEntities$ | async"
            (boxDrawn)="boxDrawn($event)">
          </app-picture>
        </mat-card-content>
        <mat-card-actions fxLayoutAlign="center center">
          <app-picture-button [icon]="'keyboard_arrow_left'"></app-picture-button>
          <app-picture-button [icon]="'keyboard_arrow_right'"></app-picture-button>
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
              [labelValues]="(picture$ | async)?.labels"
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
  boxEntities$: Observable<{ [id: number]: Box }>;
  labels$: Observable<Label[]>;
  picture$: Observable<Picture>;
  pictureData$: Observable<string>;
  selectedBox$: Observable<Box>;

  constructor(
    private store: Store<fromRoot.State>,
    private picturesService: PicturesService,
  ) {
    this.boxes$ = this.store.select(fromRoot.getAllBoxes);
    this.labels$ = this.store.select(fromRoot.getAllLabels);
    this.boxEntities$ = this.store.select(fromRoot.getBoxesEntities);
    this.picture$ = this.store.select(fromRoot.getSelectedPicture);
    this.selectedBox$ = this.store.select(fromRoot.getSelectedBox);
    this.pictureData$ = this.picturesService.getPictureData().pipe(
      combineLatest(this.picture$),
      map(([data, picture]) => picture ? data[picture.id] : ''),
    );
  }

  ngOnInit() {
  }

  private updateLabel(labelValue: LabelValue) {
    this.picture$.pipe(
      first(),
    ).subscribe(
      picture => this.store.dispatch(
        new fromRoot.UpdateLabel({ pictureId: picture.id, labelValue }))
    );
  }

  private selectBox(event: Box) {
    this.store.dispatch(new fromRoot.SelectedBox(event));
  }

  private boxDrawn({ x0, y0, x1, y1 }) {
    this.picture$.pipe(
      withLatestFrom(this.selectedBox$),
      first(),
    ).subscribe(
      ([picture, selectedBox]) =>
          this.store.dispatch(
            new fromRoot.UpdateBox( {
              pictureId: picture.id,
              boxValue: { id: selectedBox.id, x0, y0, x1, y1 },
            })
          )
    );
  }
}

