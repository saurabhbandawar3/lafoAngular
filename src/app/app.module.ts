import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { firebaseConfig } from './firebase.config';


import { SignupComponent } from './signup/signup.component';
import { ReportFoundComponent } from './report-found/report-found.component';
import { ReportLostComponent } from './report-lost/report-lost.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { SearchFoundComponent } from './search-found/search-found.component';
import { SearchLostComponent } from './search-lost/search-lost.component';

import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {SlideshowModule} from 'ng-simple-slideshow';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'rlost',
    component: ReportLostComponent
  },
  {
    path: 'rfound',
    component: ReportFoundComponent
  },
  {
    path: 'slost',
    component: SearchLostComponent
  },
  {
    path: 'sfound',
    component: SearchFoundComponent
  },
  {
    path: 'about',
    component: AboutComponent
  }
];


@NgModule({

  declarations: [
    AppComponent,
    SignupComponent,
    ReportFoundComponent,
    ReportLostComponent,
    SearchLostComponent,
    SearchFoundComponent,
    AboutComponent,
    HomeComponent,
    SearchFoundComponent,
    SearchLostComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig  ),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    SlideshowModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // debugging purpose
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
