/**
	Class : HomePage
	Author: Basu Sharma
	Version: V0.0.1
	Description: Class for default home page, which will allow users to enter zone and vehicle details for query and will enable them to locate and calculate distance. It will work like controller for the home page. 

**/

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular'; 
import {LocationInfoProvider } from '../../providers/location-info/location-info';
import { Vehicle } from '../../models/Vehicle';
import {} from '@types/googlemaps';
import { Location } from '../../models/Location';
import {StartUpModalPage} from '../../pages/start-up-modal/start-up-modal'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'       
})

export class HomePage {
         // variable for getting selected zone data from html.
			zoneData:Object ={};
		//  variable for showing zonelist 	
			zoneList: Object[] = [];
		// variable holds selected vehicle object 	
			selectedVehicle:  Vehicle;
		//  variable to get info of which vehicle was selected
			vehicleData: Object = {};
		// variable to show vehicle list 	
			vehicleList: Object[] =[];
		// variable to hold selected vehicle data  by user
			vehicleSelected: string = "";
		// flag to show or hide vehicle list	
			showVehicleList: boolean = true;
		// dummy value for vehicle
			tempVehicleValue: string = "XX";
		// location object to hodl current vehicle location			 
            vehicleLocation: Location;
        // flag to show/hide UI for vehicle 
            selectedVehicleStatus:boolean = false;;
        //  varaible to get data od user provided lattitude based distance calculation
            customLat:string ;
        //  varaible to get data user provided longituce based distance calculation
            customLong:string;
        //  variable to show distance from Apollo landing center to user provided co-ordinates     
            customDistance: string;
        // variable for holding map    
            map:google.maps.Map ;
        // variable to bound map area in viewing site of device    
            latlngbounds:google.maps.LatLngBounds;

        // constants
           	apolloCenterName: string = "CND command center";
            iconNasa: string = "img/appolo_nasa.png";
			iconRover: string = "img/rover.png";

/** 
constructor method to initialize variable values for futher use
**/

  constructor(public navCtrl: NavController,  public locationInfoProvider: LocationInfoProvider) {

  	this.selectedVehicleStatus = false;
  	this.zoneData = null;
  //	this.zoneList = [{id:"1", zoneName: "bright side of Moon"},{id: "2", zoneName:"dark side of Moon"}];
 locationInfoProvider.getZoneList({employeeId: "1121"}).subscribe(zoneList => {
 	//console.log(zoneList);
 	this.zoneList = zoneList}, error => {console.log(error)});
 /*this.vehicleList =[{
				vehicle_id: 0,
				lat: -88.57913126391475,
				long: 79.21747437674591,
				name: "Heuvos Rancheros",
				model:"Rover TX 5",
				power_level_percent: 85
				}, {
				vehicle_id: 1,
				lat: -88.57913126391475,
				long: 79.21747437674591,
				name: "Sprit Rancheros",
				model: "Rover TX 13",
				power_level_percent: 75
				},{
				vehicle_id: 2,
				lat: -88.57913126391475,
				long: 79.21747437674591,
				name: "Mini Rancheros",
				model: "Rover TX 10",
				power_level_percent: 85
				}];*/
	if(this.vehicleList.length <=0){
					this.showVehicleList =false;
				}
		//this.latlngbounds = new google.maps.LatLngBounds();
		this.latlngbounds = new google.maps.LatLngBounds();
		this.latlngbounds.extend(this.locationInfoProvider.cndCommandCenterLocation);
				}
  

  // Function get called when ionic view is loaded. We are initializing map once view is loaded fully to make sure map doesn't fails.
		ionViewDidLoad() {
			 //fetch saved user from local storage as login functionality is not there.
			let loginStaus = window.localStorage.getItem("authEmployeeId");
			if(loginStaus ==""|| loginStaus == null || loginStaus =="undefined"){
				this.navCtrl.push(StartUpModalPage);
			}

		   //// console.log('Home page view loaded now loading map');
		    this.initMap(this.locationInfoProvider.cndCommandCenterLocation );
		    this.addMarker(this.locationInfoProvider.cndCommandCenterLocation, this.map, this.apolloCenterName, this.iconNasa  );
		  }


  /** function name - openVehicleList
      Description -   function to get vehicle list filtered by zone selected by user
      params - zone selected by user
      output - A list of JSON of  vehicle properties with name, model, lattitue, longitude, vehicle_id, power_level_percent
  **/
  
	openVehicleList() {
		//console.log(JSON.stringify(this.zoneData));
		this.locationInfoProvider.getVehicleList({zone_id:this.zoneData}).subscribe(vehicleList => {
			//console.log("return vehicle List");
			///console.log(vehicleList);

			this.vehicleList = vehicleList;

			if(this.vehicleList.length >0){
				this.showVehicleList =true;
			}
			}, error => {console.log(error)});
		}



		checkDataEmpty(data:any){
			//console.log("checking empty");
			if(data == "" || data == null || data == "undefined"){
				return false;
			}else{
				return true;
			}
		}

  /** function name - showVehicleData
      Description -   function to get vehicle's real time details which was selected by user and initialzed the map according to location and puts a marker as well.
      params - vehicle id selected by user
      output - A   JSON object with  vehicle properties of name, model, lattitue, longitude, vehicle_id, power_level_percent 
  **/

		showVehicleData(){
			// console.log("entering showVehicleData : selected vehicle " + this.vehicleSelected);

			 	let flag  = this.checkDataEmpty(this.vehicleSelected);
			 	if(!flag){
			 				return;
			 			}

			 	//get current location fo vehicle through providers
				this.locationInfoProvider.getVehicleLocation(this.vehicleSelected)
						.subscribe(vehicleData => {this.selectedVehicle = <Vehicle>vehicleData;
 					console.log("lat long of selected vehicle - " + this.selectedVehicle.lat + 
 						"vehicle long" + this.selectedVehicle.long);
					this.vehicleLocation = {lat:Number(this.selectedVehicle.lat) ,
					 lng: Number(this.selectedVehicle.long) };
					//get distance from provider
					this.selectedVehicle.distanceFromCommandCenter = Number(this.locationInfoProvider
						.getCalculatedDistance(Number(this.selectedVehicle.lat),Number(this.selectedVehicle.long)));
					
					console.log(" selectedVehicle.distanceFromCommandCenter  "+ 
						this.selectedVehicle.distanceFromCommandCenter );

					this.selectedVehicleStatus = true;

					//iniitalize map with updated marker
					this.initMap(this.vehicleLocation);
					// put   markers 
					this.addMarker(this.vehicleLocation, this.map, this.selectedVehicle.name, this.iconRover);
 				    this.addMarker(this.locationInfoProvider.cndCommandCenterLocation, this.map,
 				    this.apolloCenterName, this.iconNasa);
 				    //making maps to fit to screen with autozoom
 					this.fitMaptoBounds(this.vehicleLocation);
				}, error => {console.log(error);
					 });

		}


		
		// function to hide/ show vehicle options on the basis of user selection			   
	    showSelectVehicle() {
	    	//console.log("hide vehicle select");
	    	this.selectedVehicleStatus= false;
	    }
      /** function name - caluclateDistance
	      Description -   function to get vehicle's real time distance form apollo landing site  by using locationInfoProvider's method and showcase on page.
	      params - customLat, customLng provided by user
	      output - distance in kilometer 
	  **/


		caluclateDistance(){
			if(this.customLat == ""|| this.customLat == null || this.customLat =="undefined" ){
				alert("Please enter lattitude");
				return;
			}
			if(this.customLong == ""|| this.customLong == null || this.customLong =="undefined" ){
				alert("Please enter lattitude");
				return;
			}
			this.customDistance = String(this.locationInfoProvider.getCalculatedDistance(Number(this.customLat), Number(this.customLong)));
		
		}

		/** function name - resetDetails
	      Description -   removes previous details of location provided by user
	      params - 
	      output - blank varaibles 
	  		**/
		resetDetails(){
			this.customLong = null;
			this.customLat = null;
			this.customDistance = null;
		}
		    
		  /**
			Method: getNormalizedCoord,
			description: This method converts google map based co-ordinates postion to normalized ones for display
			param: coord - coord of location ,  zoom - current zoom level of map
			output:  returns normalized co-ordinates
			 **/
		getNormalizedCoord(coord: google.maps.Point, zoom: number) {
								  let y = coord.y;
								  let x = coord.x;

								  // tile range in one direction range is dependent on zoom level
								  // 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
								  let tileRange = 1 << zoom;

								  // don't repeat across y-axis (vertically)
								  if (y < 0 || y >= tileRange) {
								    return null;
								  }

								  // repeat across x-axis
								  if (x < 0 || x >= tileRange) {
								    x = (x % tileRange + tileRange) % tileRange;
								  }

								  return {
								    x: x,
								    y: y
								  };
								}

		 /**
		Method: initMap,
		description: Initializes map based on the co-ordinates supplied with predefined options
		param: location - coord of location as center ,  zoom - current zoom level of map
		output:  initialzes map on  view
		 **/
		 initMap( location: Location ) {
		        this.map = new google.maps.Map(document.getElementById('map'), {
		          center: {lat: this.locationInfoProvider.cndCommandCenterLocation.lat, lng: this.locationInfoProvider.cndCommandCenterLocation.lng},
		          zoom: 3,
		          streetViewControl: false,
		          mapTypeControlOptions: {
		            mapTypeIds: ['moon']
		          }
		        });

		 let moonMapType = new google.maps.ImageMapType({
          getTileUrl: (coord: google.maps.Point, zoom:number) => {
              var normalizedCoord = this.getNormalizedCoord(coord, zoom);

              //console.log("normalized cord "+ JSON.stringify(normalizedCoord));
              if (!normalizedCoord) {
                return null;
              }
              var bound = Math.pow(2, zoom);
              return 'http://mw1.google.com/mw-planetary/lunar/lunarmaps_v1/clem_bw' +
                  '/' + zoom + '/' + normalizedCoord.x + '/' +
                  (bound - normalizedCoord.y - 1) + '.jpg';
          },
          tileSize: new google.maps.Size(256, 256),
          maxZoom: 9,
          minZoom: 0, 
          name: 'Moon'
        });
		this.map.mapTypes.set('moon', moonMapType);
        this.map.setMapTypeId('moon');
        
      }
	
 		 /**
			Method: addMarker,
			description: Adds a marker on the given map.
			param: location - coord of location as center ,  map - map object , name - title name of marker , icon - imge type of marker
			output:  initialzes a marker on map  
			 **/	 
     addMarker(location:Location, map:google.maps.Map, name:string, icon:string){
//console.log("adding markers");
        // Add the marker at the clicked location, and add the next-available label
        // from the array of alphabetical characters.
        
         let marker = new google.maps.Marker({
          position: location,
          title: name,
          icon: icon,
          map: map
        });
	  }

	  /**
			Method: fitMaptoBounds,
			description: this method does the auto zoom part and auto cecnter task for
			param: location - coord of location as center  
			output:     
			 **/
 
	 fitMaptoBounds(location:Location): void{
	 	 	 this.latlngbounds.extend(location);
			 this.map.fitBounds(this.latlngbounds);
			 this.map.panToBounds(this.latlngbounds);

		}

}  


