import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
 
import {StartUpModalPage} from '../pages/start-up-modal/start-up-modal';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ActivityProvider } from '../providers/activity/activity';
import { HttpModule } from '@angular/http';
import { LocationInfoProvider } from '../providers/location-info/location-info';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
     
    StartUpModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    
    StartUpModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ActivityProvider,
    LocationInfoProvider

  ]
})
export class AppModule {}
