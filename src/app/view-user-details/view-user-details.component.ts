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
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-view-user-details',
  templateUrl: './view-user-details.component.html',
  styleUrls: ['./view-user-details.component.css']
})
export class ViewUserDetailsComponent implements OnInit {
  userDetails;
  userId;
  allUsersNames = [];
  userFullName;
  userEmail;
  userPassword;
  userRole;
  userTable=true;
  oneUserDetails=false;
  userImage;
  photo;
  constructor(private router: Router, private formBuilder: FormBuilder,private IotAccountsService:IotAccountsService,private http: Http) { }

  ngOnInit() {
    this.getUserDetails();

  }
getUserDetails(){


  let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.userId=userInfo.user_id;
    this.IotAccountsService.geUserDetails(this.userId).then(details => {
     
      this.userDetails=details.json();
     console.log(this.userDetails);
      for (var count = 0; count < this.userDetails.data.length; count++) {
   this.allUsersNames.push({
    fullName: this.userDetails.data[count].Fname + ' ' + this.userDetails.data[count].Lname,
    userEmail:this.userDetails.data[count].email,
    userPassword:this.userDetails.data[count].password,
    userRole:this.userDetails.data[count].Role,
    userImage:this.userDetails.data[count].image
  });
} 
console.log("arrat",this.allUsersNames);
    });

 
}
viewReadyDetails(item) {
  console.log(item.userImage);
  
  this.userTable = false;
  this.oneUserDetails = true;

  this.userFullName = item.fullName;
  this.userEmail =item.userEmail;
  this.userPassword =item.userPassword;
  this.userImage=item.userImage;
  this.userRole=item.userRole;
 
  this.http.get("./assets/config.json")
  .subscribe((data) => {
    this.photo=data.json().APIBasePath + data.json().uploadedLogoPath+this.userImage;
   });
 // console.log("imagesss", this.userImage)
}
backtoNameList(){
  this.oneUserDetails = false;
  this.userTable = true;
}
}
