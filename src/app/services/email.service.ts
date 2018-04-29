import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { CommonService } from './common/common.service';

@Injectable()
export class EmailService {
    constructor(private commonsService: CommonService,private http:  Http) { }

sendingMails(obj){
    return this.commonsService.apiPost(obj, 'iot', 'sendingMails');
  }



}