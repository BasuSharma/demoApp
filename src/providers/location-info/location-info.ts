import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Zone } from '../../models/zone';
import { Vehicle } from '../../models/Vehicle';
import { Observable } from 'rxjs/Rx';
import { Location } from '../../models/Location';


/*
  Author : Basu Sharma
  version: V0.0.1
  class: LocationInfoProvider
  Description: Generated class for the LocationInfoProvider provider. It contains methods required for location info related services.
  Methods: getZoneList,  getVehicleList, getVehicleList,  getVehicleLocation, getDistanceFromLatLonInKm, getCalculatedDistance, getNormalizedCoord 

  
*/
@Injectable()
export class LocationInfoProvider  {
	public serverUrl: string = 'http://205.147.102.105:9292';
	public cndCommandCenterLocation: Location = {lat:0, lng:0} ;
	public raidusOfMoon: number ;
	public vehicle: Vehicle;
	
  	constructor(public http: Http) {
    	//console.log('Hello LocationInfoProvider Provider');
    	this.cndCommandCenterLocation.lat = 0.681400; 	
		this.cndCommandCenterLocation.lng = 23.460550;
		this.raidusOfMoon = 1737;
  		}

  /**
	Method: getZoneList,
	param: data -JSON object contating the user info
	output: list of zones in json format
	description: This method fetches the zone list from the server using http calls

	**/

 getZoneList(data): Observable<Zone[]>{
  	return this.http.get(`${this.serverUrl}/zones?employeeId=${data.employeeId}`).map(zones => <Zone[]>zones.json());
  }

  /**
	Method: getVehicleList,
	param: data -JSON object contating the seleted zone number and user info
	output: list of vehicle in json format
	description: This method fetches the vehicle list based on the zone infor provided to it.

**/
  getVehicleList(data): Observable<Vehicle[]>{
  	return this.http.get(`${this.serverUrl}/vehicles?zone_id=${data.zone_id}`).map(vehicles => <Vehicle[]>vehicles.json());
  }

	/**
	Method: getVehicleLocation
	description: This method fetches the vehicle details with current location  by caling http://cndlunarlocator.herokuapp.com/vehicles
	parama: vehicleId - identifier for the vehicle to be located
	output:  vehicle details in json format
	
	**/
	getVehicleLocation(vehicleId: string): Observable<Vehicle>{
		console.log(vehicleId + "sdsdss");
		vehicleId = vehicleId.trim();
		return this.http.get(`http://cndlunarlocator.herokuapp.com/vehicles/${vehicleId}/locate.json`).map(vehicles => <Vehicle>vehicles.json());
	}  	

/**
	Method: getDistanceFromLatLonInKm,
	param: at1- type number,lon1- type number,lat2- type number,lon2 type number
	output: liner distance in number format
	description: This methods calulates the distance between two input co-ordinates. The distance is liner and doesn't contains info of deep and high altitude areas.

**/
   getDistanceFromLatLonInKm(lat1:number,lon1:number,lat2:number,lon2:number): number {
					  // Converts nummbers in to radiun
					  let  differenceInLattitude: number = this.deg2rad(lat2-lat1);
					  let differenceInLongitude:number = this.deg2rad(lon2-lon1);  
					  // calculate sines and cosines
					  let calculatdVar = 
					    Math.sin(differenceInLattitude/2) * Math.sin(differenceInLattitude/2) +
					    Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
					    Math.sin(differenceInLongitude/2) * Math.sin(differenceInLongitude/2);

					    //get liner distance beteen two points
					  let calculatedVar1 = 2 * Math.atan2(Math.sqrt(calculatdVar), Math.sqrt(1-calculatdVar)); 
					  // Distance in km
					  let calculaedVar2 = this.raidusOfMoon * calculatedVar1; 
					  // round of the distance for better usability
					  let distance = this.round(calculaedVar2,2);
					  console.log("distance : "+ distance);
					   
					  if(distance >= 0){
					  	return distance;
					  }
					  else {return 0;} 
					}


     /**
	Method: deg2rad,
	description: This methods converts a number in degree to radiun
	param: deg - degree as number which has to be converted to raidiun
	output: radiun number
	**/
	deg2rad(deg: number) : number {
				  return deg * (Math.PI/180)
				}

	 /**
	Method: round,
	description: This methods rounds off a number to the decimals provided in input
	param: value - number which has to be converted,  decimals - digits u to be wihich round off is required
	output: rounded off number
	 **/
	round(value:number, decimals:number) : number {
		 return Number(Math.round(Number(value+'e'+decimals))+'e-'+decimals);
	}

	 /**
	Method: getCalculatedDistance,
	description: A method for getting distance between vehicle location and apollo landing site
	param: lattitude - lattitude of vehicle ,  lattitude - lattitude of vehicle
	output:  return calculated distance
	 **/
	getCalculatedDistance(lattitude:number, longitude: number): number{
		return this.getDistanceFromLatLonInKm(lattitude, longitude , this.cndCommandCenterLocation.lat, this.cndCommandCenterLocation.lng );
	}

	  

}
