  import { LocationInfoProvider } from './location-info';
  import {Http }   from '@angular/http';
 import {} from 'jasmine';
 let http:Http;
 let locationInfo = null;

describe('Location Info service provide test cases ', () => {
 
 	 beforeEach(() => {
 	 	 
		      locationInfo = new LocationInfoProvider(http );
		    });
 
     it('initialize test', () => {
 
        expect(locationInfo).toBeTruthy();
 
    });
 
 	 it('check getDistanceFromLatLonInKm  function', () => {
 	 
 		 let data = locationInfo.getDistanceFromLatLonInKm(0.681400, 23.460550, 70.11171594198932, 91.56291974370983);
 		 
       expect(typeof data).toBe('number');
       expect(data>0).toBeTruthy();
 
    });

 	it('check deg2rad  function ', () => {
 	 
 		 let data = locationInfo.deg2rad(60);
 		 expect(data>0).toBeTruthy();
       expect(typeof data).toBe('number');
 
    });

    it('check round function  ', () => {
 	 
 		 let data = locationInfo.round(60.112122, 2);
 		 expect(data>0).toBeTruthy();
         expect(typeof data).toBe('number');
 
    });

     it('check getCalculatedDistance function  ', () => {
 	 
 		 let data = locationInfo.getCalculatedDistance(70.11171594198932, 91.56291974370983 );
 		 expect(data > 0).toBeTruthy();
          
 
    });



});