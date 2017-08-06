import { TestBed, inject, async } from '@angular/core/testing';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { LocationInfoProvider } from './location-info';
 import {} from 'jasmine';
describe('Provider: LocationInfoProvider', () => {
 
    beforeEach(async(() => {
 
        TestBed.configureTestingModule({
 
            declarations: [
 
            ],
 
            providers: [
                LocationInfoProvider,
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http, 
                    useFactory: (mockBackend, options) => {
                        return new Http(mockBackend, options);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                }
            ],
 
            imports: [
                HttpModule
            ]
 
        }).compileComponents();
 
    }));
 
    beforeEach(() => {
 
    });
 
    it('should have a non empty array called vehicle', inject([LocationInfoProvider, MockBackend], (locationInfoServices, mockBackend) => {
 
        const mockResponse = '{"vehicle_id":1,"lat":"-67.35154804801874","long":"-38.27990742300427","name":"Viking","model":"Tesla Kart","power_level_percent":"61"}  ';
 
        mockBackend.connections.subscribe((connection) => {
 
            connection.mockRespond(new Response(new ResponseOptions({
                body: mockResponse
            })));
 
        });
 
          locationInfoServices.getVehicleLocation('1').subscribe((data) => {
      
      expect(data.name.length).toBeTruthy();
      expect(data.lat.length).toBeTruthy();
      expect(data.long.length).toBeTruthy();
      expect(data.model.length).toBeTruthy();
      expect(data.power_level_percent.length).toBeTruthy();
       });
     }));
 
     it('should have a non empty array called vehicleList', inject([LocationInfoProvider, MockBackend], (locationInfoServices, mockBackend) => {
 
        const mockResponse = '[{"vehicle_id":1,"lat":"-67.35154804801874","long":"-38.27990742300427","name":"Viking","model":"Tesla Kart","power_level_percent":"61"},{"vehicle_id":"1","lat":"-38.988103727524866","long":"-97.7557310171378","name":"Viking","model":"Tesla Kart","power_level_percent":"70"}]  ';
 
        mockBackend.connections.subscribe((connection) => {
 
            connection.mockRespond(new Response(new ResponseOptions({
                body: mockResponse
            })));
 
        });
 
          locationInfoServices.getVehicleList('1').subscribe((data) => {
      expect(data.length).toBeGreaterThan(0);
      expect(data[0].name.length).toBeTruthy();
      expect(data[0].lat.length).toBeTruthy();
      expect(data[0].long.length).toBeTruthy();
      expect(data[0].model.length).toBeTruthy();
      expect(data[0].power_level_percent.length).toBeTruthy();
   
    });
   }));

 it('should have a non empty array called zoneList', inject([LocationInfoProvider, MockBackend], (locationInfoServices, mockBackend) => {
 
        const mockResponse = '[{"id":"1", "zoneName": "bright side of Moon"},{"id": "2", "zoneName":"dark side of Moon"}]  ';
 
        mockBackend.connections.subscribe((connection) => {
 
            connection.mockRespond(new Response(new ResponseOptions({
                body: mockResponse
            })));
 
        });
 
      locationInfoServices.getZoneList('1').subscribe((data) => {
      expect(data.length).toBeGreaterThan(0);
      expect(data[0].zoneName.length).toBeGreaterThan(0);
      expect(data[0].id.length).toBeGreaterThan(0);
   
   
    });
   }));



});