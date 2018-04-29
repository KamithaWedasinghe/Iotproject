import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IotDetailsService } from '../services/iotDetails.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import alertify from 'alertify.js';
import { AuthenticationService } from '../services/common/authentication.service';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PreRequirementsService } from '../services/preRequirements.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfigService } from '../services/config/index';
import { PayrollMasterService } from '../services/payrollMaster.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-RegisterEmployee',
  templateUrl: './RegisterEmployee.component.html',
  styleUrls: ['./RegisterEmployee.component.css']
})
export class RegisterEmployeeComponent implements OnInit {
  deviceName;
  macAddress;
  newDeviceDetails;
  userForm;
  adminsStatus;
  imageUploadApiUrl;
  fileNameForTB;
 

  constructor(private router: Router, private IotDetailsService: IotDetailsService, private authenticationService: AuthenticationService, private PreRequirementsService: PreRequirementsService,private PayrollMasterService: PayrollMasterService, private formBuilder: FormBuilder, private config: ConfigService) {
    this.userForm = this.formBuilder.group({
      'firstname': ['', Validators.required],
      'last_name': ['', Validators.required],
      'email': ['', Validators.required],
      'password': ['', [Validators.required, Validators.minLength(5)]],
      'password_confirmation': ['', [Validators.required, Validators.minLength(5)]]
    });
    this.imageUploadApiUrl = this.config.getAPIBasePath() + 'public/' + this.config.useWhichAPI('iot') + 'uploadLogo';
  }

  ngOnInit() {

    this.authenticationService.getToken().subscribe(res => {
      let token = res.token
      localStorage.setItem('userInfo', '{"loginId": "' + token + '"}');

    })
  
  }
  registerUser(registerDetails) {
    
    this.IotDetailsService.checkAdminEmail(registerDetails.email).then(details => {
      this.adminsStatus = details.json().data[0].count;
      if (this.adminsStatus == 0) {
        console.log(registerDetails);
        let obj={
          firstname:registerDetails.firstname,
          lastName:registerDetails.last_name,
          registerEmail:registerDetails.email,
          password:registerDetails.password,
          imageId:this.fileNameForTB

        }
              this.IotDetailsService.registerAdmin(obj).then(details => {
        
                if (details.json().error == false) {
                      alertify.delay(3000);
                      alertify.logPosition("bottom right");
                      alertify.success('Save Successfuly Registration')
                      let redirect ='/login';
                      this.router.navigate([redirect]);
                  
                } else {
                  alertify.delay(3000);
                  alertify.logPosition("bottom right");
                  alertify.error('Registration Not Succesfuly')
                  let redirect ='/login';
                  this.router.navigate([redirect]);
                  
                }
              });
            }
            else {
              alertify.delay(3000);
              alertify.logPosition("bottom right");
              alertify.error('Already Exists Acccount')
              let redirect ='/login';
              this.router.navigate([redirect]);
              }

    });
   
  }
  imageUploaded(file) {
    
        let fname: String = file.serverResponse._body;
        this.fileNameForTB = fname.replace(/['"]+/g, '');
    console.log( this.fileNameForTB);
      }
}
