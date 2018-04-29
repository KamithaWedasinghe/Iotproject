import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {IotDetailsService} from '../services/iotDetails.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import alertify from 'alertify.js';
import { AuthenticationService } from '../services/common/authentication.service';

@Component({
  selector: 'app-add-devices',
  templateUrl: './add-devices.component.html',
  styleUrls: ['./add-devices.component.css']
})
export class AddDevicesComponent implements OnInit {
  deviceName;
  macAddress;
  newDeviceDetails;
  adminId;
  constructor(private router: Router, private IotDetailsService: IotDetailsService,   private authenticationService:AuthenticationService,) { }

  ngOnInit() {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
   this.adminId=userInfo.user_id;

    
  }
  addNewDevice(){
    this.IotDetailsService.getCountOfDivices().then(details => {
      if(details.json().data[0].count<=5){
        this.IotDetailsService.setNewDeviceDetails(this.deviceName,this.macAddress, this.adminId).then(details => {
          if(details.json().error==false){
            alertify.delay(1000);
            alertify.logPosition("bottom right");
            alertify.success('Save successfully');
            let redirect = this.authenticationService.reDirectURL ? this.authenticationService.reDirectURL : '/dashboard';
            this.router.navigate([redirect]);
       
          }else{
            alertify.delay(1000);
            alertify.logPosition("bottom right");
            alertify.success('Please Enter Again');
            let redirect = this.authenticationService.reDirectURL ? this.authenticationService.reDirectURL : '/add-device';
            this.router.navigate([redirect]);
          }
          });
      }else{
        alertify.delay(1000);
        alertify.logPosition("bottom right");
        alertify.error('You can only Use Six Devices');
        let redirect = this.authenticationService.reDirectURL ? this.authenticationService.reDirectURL : '/dashboard';
        this.router.navigate([redirect]);
   
      }
  
      });



  }
  backHome(){
    let redirect = this.authenticationService.reDirectURL ? this.authenticationService.reDirectURL : '/dashboard';
    this.router.navigate([redirect]);

  }
  
}
