import { Injectable } from '@angular/core';
import { CommonService } from '../services/common/common.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http'


@Injectable()
export class PreRequirementsService {
    output;
    reDirectURL;
    constructor(private commonsService: CommonService) {

    }
    checkPreRequirments(){
       
        return this.commonsService.apiGet('pr','checkPreRequirments');
    }
    addPreRequirementsToTB(details){
        return this.commonsService.apiPost(details,'pr','setPreRequirments');
    }
    getCompanyDetails(){
        return this.commonsService.apiGet('pr','getCompanyDetails');
    }

    
}