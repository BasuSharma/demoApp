import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../models/user';
import {ActivityProvider} from '../../providers/activity/activity';
import {HomePage } from '../../pages/home/home';
/**
 * Generated class for the StartUpModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-start-up-modal',
  templateUrl: 'start-up-modal.html',
})
export class StartUpModalPage {
	private activity : FormGroup;
	  user: User[];
	  userInput: User;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,  private formBuilder: FormBuilder, public activityProvider: ActivityProvider) {
     

    this.activity = this.formBuilder.group({
      user_id: ['', Validators.required]
      //description: [''],
    });


  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad StartUpModalPage');
  

  }


  logForm(){
    
    this.userInput =  this.activity.value;

    this.userInput.action_name = "new_session_start";
    this.userInput.action_details = " user Logged in at "+ new Date();
    this.userInput.user_type = "staff";
    console.log(this.userInput);
    window.localStorage.setItem('authEmployeeId', this.userInput.user_id );
    console.log("sveed valuee - "+window.localStorage.getItem('authEmployeeId') + "local calue"+this.userInput.user_id );
    this.activityProvider.logUserActivity(this.userInput).subscribe(user => {this.user=user; 
															  				 console.log(user);
															  				 this.viewCtrl.dismiss();
															  				 

															  				}, error => {
															  					console.log("error " + error);
															  				  this.viewCtrl.dismiss();
															  				});
  }
  closeModal() {
    this.viewCtrl.dismiss();
  }

}
