import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StartUpModalPage } from './start-up-modal';

@NgModule({
  declarations: [
    StartUpModalPage,
  ],
  imports: [
    IonicPageModule.forChild(StartUpModalPage),
  ],
})
export class StartUpModalPageModule {}
