import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { CommonService } from './common/common.service';

@Injectable()
export class IotDetailsService {
    constructor(private commonsService: CommonService) { }


    getDeviceDetails(adminId) {
        
         return this.commonsService.apiGet('iot', 'getDeviceDetails/' +adminId);
    }

 
    setNewDeviceDetails(name,Address,adminId){
        let obj={
          
                deviceName:name,
                macAddress:Address,
                adminId:adminId
        }
        return this.commonsService.apiPost(obj, 'iot', 'setNewDeviceDetails');
    }
    getCountOfDivices() {
        
         return this.commonsService.apiGet('iot', 'getCountOfDivices');
    }
    registerAdmin(registerDetails){
        // localStorage.setItem('adminPassword',registerDetails.password);
        console.log(registerDetails);
        return this.commonsService.apiPost(registerDetails, 'iot', 'registerAdmin');
    }
    updateAdminPassword(password){
        let obj={
            password:password,
        }
        return this.commonsService.apiPost(obj, 'iot', 'updateAdminPassword');
    }
    
    checkAdminEmail(email) {
        return this.commonsService.apiGet('iot', 'checkAdminEmail/' +email);
    }    
    setComponentChart(obj){
     // console.log(obje);
        return this.commonsService.apiPost(obj, 'iot', 'setComponentChart');
    }
    updateComponentChart(obj){
        return this.commonsService.apiPost(obj, 'iot', 'updateComponentChart');
    }
    getdataForChart(adminId,day){
        let obj={
            adminId:adminId,
            day:day
        }
        return this.commonsService.apiPost(obj, 'iot', 'getdataForChart');
        
    }
    checkDeviceDetails(adminId){
        return this.commonsService.apiGet('iot', 'checkDeviceDetails/' +adminId);
    }
    checkcomponentChart(adminid,day){
        let obj={
            adminId:adminid,
            day:day
        }
        return this.commonsService.apiPost(obj, 'iot', 'checkcomponentChart');
        
    }
    setPreviosValous(obj){
        return this.commonsService.apiPost(obj, 'iot', 'setPreviosValous');
    }
    setCurrentValuesForSet(obj){
       
        console.log(obj);
        return this.commonsService.apiPost(obj, 'iot', 'setCurrentValuesForSet');
    }
    getPreviousDataChart(adminId,day){
        let obj={
            adminId:adminId,
            day:day
        }
        return this.commonsService.apiPost(obj, 'iot', 'getPreviousDataChart');
    }
    createTemporyTable(){
        return this.commonsService.apiGet('iot', 'createTemporyTable');
    }
    // getimageId(adminId){
    //     //console.log('adminId',adminId);
    //     return this.commonsService.apiGet('iot', 'getimageId/' +adminId);
    // }



    
    

   
}
