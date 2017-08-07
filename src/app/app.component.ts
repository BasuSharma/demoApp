import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ModalController } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
 
import {StartUpModalPage} from '../pages/start-up-modal/start-up-modal';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  authEmployeeId: string ;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public modalCtrl: ModalController) {
    this.initializeApp();
      console.log("constructor myapp");
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      ]; 
  }
    
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openModal() {
    console.log("opening model for setup");
    let myModal = this.modalCtrl.create(StartUpModalPage);
    myModal.present();
    return true;
  }

  logoutUser(){
    window.localStorage.setItem('authEmployeeId', "");
    alert("Logged out Successfully");

    this.nav.setRoot(HomePage);
    setTimeout(() => {window.location.reload();}, 1000);
    return true;
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
