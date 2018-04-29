import { Component } from '@angular/core';
//import { WishHospitalService } from '../services/wishHospital.service';
import { AuthenticationService } from '../services/common/authentication.service';
import { Router } from '@angular/router';
import alertify from 'alertify.js';
import { Directive, ElementRef, HostListener, Input } from'@angular/core';
import {PreRequirementsService} from '../services/preRequirements.service';

@Component({
  selector:'login',
  templateUrl: 'login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent {
preRequirementsStatus:any;
  constructor(
    //private wishHospitalservice:WishHospitalService,
    private router:Router,
    private authenticationService:AuthenticationService,
    private PreRequirementsService:PreRequirementsService
  ){}

  password="";
  username="";


submitLogin(){
this.generateTokenForLogin();


}

ngOnInit() {
  this.authenticationService.logout();
 
 
}


//generating token to check login
generateTokenForLogin() {
  this.authenticationService.getToken()
      .subscribe(
          (response) => {
              if (true) {
                  this.checkLogin(response.token);
              }
          },
          error => {
              console.log("error generating token")
          }
      );
}


checkLogin(token: string): void {
  let loginDetails = {
    "username": this.username,
    "password": this.password
  };
  this.authenticationService.getLoginStatus(loginDetails, token)
  .subscribe(
      () => {
        console.log("pppoo",this.authenticationService.isLoggedIn)
        if (this.authenticationService.isLoggedIn) {
           let redirect = '/dashboard';
           this.router.navigate([redirect]);
       }else{
           console.log('error login');
           alertify.delay(2000);
           alertify.logPosition("bottom right");
           alertify.error('Invalid Username or Password');
       }
       }
      ,
      error => {
        console.log('error in login');
        alertify.delay(2000);
        alertify.logPosition("bottom right");
        alertify.error('Enter Username & Password');
      }
  );

}
keyTab(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        const inputs = Array.prototype.slice.call(document.querySelectorAll("input"))
        const index = (inputs.indexOf(document.activeElement) + 1) % inputs.length
        const input = inputs[index]
        input.focus()
    }
}
registerUser(){
  console.log("ok");
  let redirect = this.authenticationService.reDirectURL ? this.authenticationService.reDirectURL : '/registerIotEmp';
  this.router.navigate([redirect]);

}

}