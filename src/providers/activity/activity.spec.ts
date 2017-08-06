  import { ActivityProvider } from './activity';
  import {Http }   from '@angular/http';
import {} from 'jasmine';
 let http:Http;
 let activityProvider = null;

describe('Location Info service provide test cases ', () => {
 
 	 beforeEach(() => {
 	 	 
		      activityProvider = new ActivityProvider(http);
		    });
 
     it('initialize test for activityProvider', () => {
 
        expect(activityProvider).toBeTruthy();
 
    });
 
});