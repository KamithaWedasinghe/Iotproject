import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IotDetailsService } from '../services/iotDetails.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import alertify from 'alertify.js';
import { AuthenticationService } from '../services/common/authentication.service';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PreRequirementsService } from '../services/preRequirements.service';
import {IotAccountsService} from '../services/iotAccounts.services';
import { EmailService } from '../services/email.service';
import { ConfigService } from '../services/config/index';
import { PayrollMasterService } from '../services/payrollMaster.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-user-accounts',
  templateUrl: './user-accounts.component.html',
  styleUrls: ['./user-accounts.component.css']
})
export class UserAccountsComponent implements OnInit {
  userForm;
  userStatus;
  sendMail=false;
  userReg=true;
  emailFrom;
  emailTo;
  loginPassword;
  subject;
  userName;
  imageUploadApiUrl;
  fileNameForTB;;
  constructor(private router: Router, private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private PreRequirementsService: PreRequirementsService,private IotAccountsService:IotAccountsService,private emailService:EmailService,private config: ConfigService,private location: Location) { 
    this.userForm = this.formBuilder.group({
      'firstname': ['', Validators.required],
      'last_name': ['', Validators.required],
      'role': ['', Validators.required],
      'email': ['', Validators.required],
      'password': ['', [Validators.required, Validators.minLength(5)]],
      'password_confirmation': ['', [Validators.required, Validators.minLength(5)]]
    });
    this.imageUploadApiUrl = this.config.getAPIBasePath() + 'public/' + this.config.useWhichAPI('iot') + 'uploadLogo';
  }

  ngOnInit() {
  }
  registerUser(userDetails) {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    let dataObj={
      firstname:userDetails.firstname,
      last_name:userDetails.last_name,
      role:userDetails.role,
      email:userDetails.email,
      password:userDetails.password,
      identifier:userInfo.user_id,
      image:this.fileNameForTB

    }
    this.IotAccountsService.checkUserEmail(userDetails.email).then(details => {
      this.userStatus = details.json().data[0].count;
      console.log(this.userStatus);
      if(this.userStatus == 0){
        this.IotAccountsService.addUser(dataObj).then(details => {
        //  console.log(details.json().error);
          if (details.json().error == false) {
            alertify.delay(3000);
            alertify.logPosition("bottom right");
            alertify.success('Save Successfuly Registration');
            this.emailFrom=userInfo.username;
            this.emailTo=userDetails.email;
            this.userName=userDetails.email;
            this.loginPassword=userDetails.password;
            this.subject="Registerd To IOT";
            this.userReg=false;
            this.sendMail=true;
            this.load();
          }else{
            alertify.delay(3000);
            alertify.logPosition("bottom right");
            alertify.success('Try Again');
            
          }
        });
      }else {
        alertify.delay(3000);
        alertify.logPosition("bottom right");
        alertify.error('Already Exists Acccount')
        
        }
    });
 

  }
  sendingEmail(){
    let obj={
      from:this.emailFrom,
      to: this.emailTo,
      username:this.userName,
      password:this.loginPassword,
      subject:this.subject 
    }
    this.emailService.sendingMails(obj).then(details => {
  });
}
imageUploaded(file) {
  
      let fname: String = file.serverResponse._body;
      this.fileNameForTB = fname.replace(/['"]+/g, '');
  console.log( this.fileNameForTB);
    }
    load() {
    setTimeout(function(){ location.reload(); }, 1000); }}
