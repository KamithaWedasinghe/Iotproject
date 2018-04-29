
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { ConfigService } from '../config/index';
import { CommonService } from './common.service';
import alertify from 'alertify.js';

@Injectable()
export class AuthenticationService {
  isLoggedIn = false;
  reDirectURL: string;
  userAccessLevel:string="";
  isScreenLoggedIn=false;
  userinfoforPreRequirments;

  constructor(private http:Http,private config:ConfigService,private commonsService:CommonService,private router:Router) { }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('userInfo');
      this.isLoggedIn = false;
  }

  login(username,loggedTime,token,userAcess){
    //remove user from local storage
    localStorage.setItem('userInfo', '{"username": "' + username + '", "loggedTimestamp": "' + loggedTime + '", "loginId": "' + token + '"}');
    this.isLoggedIn = true;
    //set user Access
    if(userAcess==8)
    this.userAccessLevel = "Admin";
    if(userAcess==12)
    this.userAccessLevel = "operator";
    if(userAcess==11)
    this.userAccessLevel = "clerk";

    this.router.navigate(['/dashboard']);

 }

  getToken() {
        let body = {"email": "admin@serp.org", "password": "admin"};
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        
        return this.http.post(this.config.getAPIBasePath() + 'public/token', body, {headers: headers})
            .map((response: Response) => {
                return response.json();
                    
            });
    }

    getTokenWithPromise(): Promise<any> {
        let body = {"email": "admin@serp.org", "password": "admin"};
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        return this.http.post(this.config.getAPIBasePath() + 'public/token', body, {headers: headers})
            .map((response: Response) => {
                return response.json();
            })
            .toPromise();
    }

    getLoginStatus(loginDetails: any, token: string): Observable<boolean> {
        let requestHeaders = new Headers();
        requestHeaders.append('Content-Type', 'application/json');
        requestHeaders.append('Authorization', 'Bearer ' + token);
        
        return this.http.post(this.config.getAPIBasePath() + 'public/iot/v1/login', loginDetails, {headers: requestHeaders})
            .map((response: Response) => {
                this.isLoggedIn = false;
                let result = response.json();
               console.log("RES555f", result);

                if (result.status == 1) {
                        if(result.Role == 8){
                        this.isLoggedIn = true;
                        localStorage.setItem('userInfo', '{"username": "' + result.username + '","user_id": "' + result.User_id + '","useraccess": "' + result.Role + '","firstName": "' + result.Fname + '" ,"lastName": "' + result.Lname + '","image": "' + result.image + '","loggedTimestamp": "' + result.loggedTime + '", "loginId": "' + token + '"}');
                        let user = JSON.parse(localStorage.getItem('userInfo'));
                        // if(user.user_id!=localStorage.getItem('previosAdminId')){
                        //     localStorage.removeItem('firstDateTime');
                        //     localStorage.removeItem('secondDateTime');
                        //     localStorage.removeItem('thirdDateTime');
                        //     localStorage.removeItem('fourthDateTime');
                        //     localStorage.removeItem('fifthDateTime');
                        //     localStorage.removeItem('sixthDateTime');
                        //     localStorage.removeItem('seventhDateTime');
                        //     localStorage.removeItem('eightthDateTime');
                        //     localStorage.removeItem('firstTimecomponent0');
                        //     localStorage.removeItem('secondTimecomponent1');
                        //     localStorage.removeItem('thirdTimecomponent2');
                        //     localStorage.removeItem('fourthTimecomponent3');
                        //     localStorage.removeItem('fifthTimecomponent4');
                        //     localStorage.removeItem('sixthTimecomponent5');
                        //     localStorage.removeItem('seventhTimecomponent6');
                        //     localStorage.removeItem('eightthTimecomponent7');
                        // }
                        // localStorage.removeItem('previosAdminId');
                      
                        
                        return this.isLoggedIn;
                        }
                }else{
                    this.isLoggedIn = false;
                    return this.isLoggedIn;
                }

                
            });
    }


    
}
