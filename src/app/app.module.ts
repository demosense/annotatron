import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { SharedModule } from '@app/shared/';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar.component';
import { MainComponent } from './containers/main.component';
import { ToolbarButtonComponent } from './components/toolbar-button.component';
import { PictureComponent } from './components/picture.component';
import { BoxListElementComponent } from './components/box-list-element.component';
import { LabelListElementComponent } from './components/label-list-element.component';
import { PictureButtonComponent } from './components/picture-button.component';
import { SidenavComponent } from './containers/sidenav.component';
import { SidenavElementComponent } from './components/sidenav-element.component';

import { services } from './services';
import { CustomSerializer, effects, metaReducers, reducers } from '@app/store';

import { environment } from '@env/environment';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule,
    SharedModule,
  ],
  declarations: [
    AppComponent,
    ToolbarComponent,
    MainComponent,
    ToolbarButtonComponent,
    PictureComponent,
    BoxListElementComponent,
    LabelListElementComponent,
    PictureButtonComponent,
    SidenavComponent,
    SidenavElementComponent
  ],
  providers: [
    ...services,
    { provide: RouterStateSerializer, useClass: CustomSerializer },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
