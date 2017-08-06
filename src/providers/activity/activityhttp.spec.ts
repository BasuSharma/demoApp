import { TestBed, inject, async } from '@angular/core/testing';
import { Http, HttpModule, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ActivityProvider } from './activity';
 import {} from 'jasmine';
describe('Provider: LocationInfoProvider', () => {
 
    beforeEach(async(() => {
 
        TestBed.configureTestingModule({
 
            declarations: [
 
            ],
 
            providers: [
                ActivityProvider,
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
 
    it('should have a non empty array called vehicle', inject([ActivityProvider, MockBackend], (activityProvider, mockBackend) => {
 
        const mockResponse = '{"data": "OK", "message": "updated"}  ';
 
        mockBackend.connections.subscribe((connection) => {
 
            connection.mockRespond(new Response(new ResponseOptions({
                body: mockResponse
            })));
 
        });
 
          activityProvider.logUserActivity('1').subscribe((data) => {
      
      expect(data.data == "OK").toBeTruthy();
      
       });
     }));
 
      

});