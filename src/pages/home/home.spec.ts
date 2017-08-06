import { TestBed, inject, async, ComponentFixture } from '@angular/core/testing';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { IonicModule, NavController } from 'ionic-angular'; 
import { DebugElement } from '@angular/core';
import {} from '@types/googlemaps';
import {MyApp}  from '../../app/app.component';
import { HomePage } from './home';
import {} from 'jasmine';
import {NavMock} from '../../mocks';
import {Location } from '../../models/Location';
import {LocationInfoProvider}  from '../../providers/location-info/location-info';
import { By } from '@angular/platform-browser';

let comp: HomePage;
let fixture: ComponentFixture<HomePage>;
let debugElement: DebugElement;
let element: HTMLElement;


describe('Page: Home Page', () => {
 
    beforeEach(async(() => {
 
        TestBed.configureTestingModule({
 
            declarations: [MyApp, HomePage],
             imports : [ IonicModule.forRoot(MyApp), HttpModule],
             providers: [LocationInfoProvider, 
                            {
                                provide: NavController,
                                useClass: NavMock
                            }],
       
        }).compileComponents();
 
    }));
 
    beforeEach(() => {
       fixture = TestBed.createComponent(HomePage);
        comp    = fixture.componentInstance;
 
    });

     afterEach(() => {
        
    });
 

    it('Home page is created', () => {
 
        expect(fixture).toBeTruthy();
        expect(comp).toBeTruthy();
 
          });

     it('Params are loaded and flag status ', () => {
 
          debugElement = fixture.debugElement.query(By.css('ion-title'));
          element = debugElement.nativeElement;  
          expect(fixture).toBeTruthy();
          expect(comp).toBeTruthy();
          comp.showSelectVehicle();
          expect(comp.selectedVehicleStatus).toBeFalsy();
          expect(comp.vehicleList.length).toBeGreaterThanOrEqual(0);
          expect(comp.zoneList).toBeGreaterThanOrEqual(0);

       
          });

       it('Custom distance functionality is okay ', () => {
          
         comp.customLat = "72.69453273019232" ;
         comp.customLong = "87.69924058406598" ;
         comp.caluclateDistance();
 
         expect( comp.customDistance).toBeGreaterThan(0);
         });


        

         it('Custom distance functionality is okay ', () => {
         comp.resetDetails();
         expect( comp.customLat ).toBeNull();
         expect(comp.customLong).toBeNull();
         expect(comp.customDistance).toBeNull();
          });

       it('Init map', () => {

          let loc: Location=  {lat:72.69453273019232 , lng:87.69924058406598};
          comp.initMap(loc);
          expect(comp.map).toBeTruthy();
          
         // expect( comp.fitMaptoBounds ).toHaveBeenCalled());
             
        });

       it('load vehcicle data ', ()=> {
            
           comp.vehicleSelected = "";
           comp.showVehicleData();
            
           expect(!comp.selectedVehicleStatus).toBeTruthy();
       });

        it('util', ()=> {
            
              expect(comp.checkDataEmpty(1)).toBeTruthy();
       });


});