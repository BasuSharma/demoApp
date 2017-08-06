import { TestBed, inject, async, ComponentFixture } from '@angular/core/testing';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { HomePage } from './home';
 import {} from 'jasmine';


let comp: HomePage;
let fixture: ComponentFixture<HomePage>;


describe('Component: HomePage', () => {
 
    beforeEach(async(() => {
 
        TestBed.configureTestingModule({
 
            declarations: [HomePage],
             imports : [HomePage],
       
        }).compileComponents();
 
    }));
 
    beforeEach(() => {
       fixture = TestBed.createComponent(HomePage);
        comp    = fixture.componentInstance;
 
    });

     afterEach(() => {
        fixture.destroy();
        comp = null;
    });
 

    it('Home page is created', () => {
 
        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();
 
    });
 
   /* it('should have a non empty array called vehicle', inject([HomePage, MockBackend], (homePage, mockBackend) => {
 
        const mockResponse = '{"vehicle_id":1,"lat":"-67.35154804801874","long":"-38.27990742300427","name":"Viking","model":"Tesla Kart","power_level_percent":"61"}  ';
 
        mockBackend.connections.subscribe((connection) => {
 
            connection.mockRespond(new Response(new ResponseOptions({
                body: mockResponse
            })));
 
        });
 
          homePage.getVehicleLocation('1').subscribe((data) => {
      
      expect(data.name.length).toBeTruthy();
      expect(data.lat.length).toBeTruthy();
      expect(data.long.length).toBeTruthy();
      expect(data.model.length).toBeTruthy();
      expect(data.power_level_percent.length).toBeTruthy();
       });
     }));*/

});