import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { CommonService } from './common/common.service';

@Injectable()
export class IotAccountsService {
    constructor(private commonsService: CommonService) { }


    getDeviceDetails() {
        
         return this.commonsService.apiGet('iot', 'getDeviceDetails');
    }

    addUser(details) {
        // console.log("pppp",details);
        return this.commonsService.apiPost(details, 'iot', 'addUser');
    }
    checkUserEmail(email) {
        return this.commonsService.apiGet('iot', 'checkUserEmail/' +email);
    }  
    geUserDetails(userId){
        return this.commonsService.apiGet('iot', 'geUserDetails/' +userId);
    }

    

   
}
