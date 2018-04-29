import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


import { ConfigService } from '../config/index';


@Injectable()
export class CommonService {

  constructor(private http: Http,private config: ConfigService) { }

    /**
     * 
     * @param requestBody |the body should be in a JSON format
     * @param apiToken 
     * @param apiURL 
     * @param whichAPI 
     */
    apiPost(requestBody: any, whichAPI: string, apiURL: string): Promise<Response> {
        let requestHeaders = new Headers();
        requestHeaders.append('Content-Type', 'application/json');
        let userInfo = JSON.parse(localStorage.getItem('userInfo'));
        requestHeaders.append('Authorization', 'Bearer ' + userInfo.loginId);

        return this.http
            .post(this.config.getAPIBasePath() + 'public/' + this.config.useWhichAPI(whichAPI) + apiURL, requestBody, {headers: requestHeaders})
            .toPromise()
            .then(
                (response: Response) => {
                    console.log('PROMISE', response);
                    let apiResponse = response.json();
                    console.log('FIRST===', apiResponse);
                    return response;
                }
            )
            .catch(
                (error: Response)  => {
                    if (error.status == 401) {
                        let tokenRequestBody = {
                            "email": "admin@serp.org", 
                            "password": "admin"
                        };

                        let tokenRequestHeaders = new Headers();
                        tokenRequestHeaders.append('Content-Type', 'application/json');
                        tokenRequestHeaders.append('Accept', 'application/json');

                        let firstCheck = this.http
                            .post(this.config.getAPIBasePath() + 'public/token', tokenRequestBody, {headers: tokenRequestHeaders})
                            .toPromise()
                            .then((response: Response) => {
                                let tokenApiResponse = response.json();
                                let secondCall = this.apiPost(requestBody, whichAPI, apiURL);
                                return response;
                            });

                        return firstCheck;

                    } else {
                        return error;
                    }
                }
            );
    }

    /**
     * 
     * @param requestBody |the body should be in a JSON format
     * @param apiToken 
     * @param apiURL 
     * @param whichAPI 
     */
    apiGet(whichAPI: string, apiURL: string): Promise<Response> {
        // let requestHeaders = new Headers();
        // requestHeaders.append('Content-Type', 'application/json');
        // let userInfo = JSON.parse(localStorage.getItem('userInfo'));
        // requestHeaders.append('Authorization', 'Bearer ' + userInfo.loginId);

        // return this.http.get(this.config.getAPIBasePath() + 'api/public/' + this.config.useWhichAPI(whichAPI) + apiURL);

        let requestHeaders = new Headers();
        requestHeaders.append('Content-Type', 'application/json');
        let userInfo = JSON.parse(localStorage.getItem('userInfo'));
        requestHeaders.append('Authorization', 'Bearer ' + userInfo.loginId);

        return this.http
            .get(this.config.getAPIBasePath() + 'public/' + this.config.useWhichAPI(whichAPI) + apiURL, {headers: requestHeaders})
            .toPromise()
            .then(
                (response: Response) => {
                  //  console.log('PROMISE', response);
                    let apiResponse = response.json();
                   // console.log('FIRST===', apiResponse);
                    return response;
                }
            )
            .catch(
                (error: Response)  => {
                    if (error.status == 401) {
                        let tokenRequestBody = {
                            "email": "admin@serp.org", 
                            "password": "admin"
                        };

                        let tokenRequestHeaders = new Headers();
                        tokenRequestHeaders.append('Content-Type', 'application/json');
                        tokenRequestHeaders.append('Accept', 'application/json');

                        let firstCheck = this.http
                            .post(this.config.getAPIBasePath() + 'public/token', tokenRequestBody, {headers: tokenRequestHeaders})
                            .toPromise()
                            .then((response: Response) => {
                                let tokenApiResponse = response.json();
                                let secondCall = this.apiGet(whichAPI, apiURL);
                                return response;
                            });

                        return firstCheck;

                    } else {
                        return error;
                        
                    }
                }
            );
    }
    apiDelete(whichAPI: string, apiURL: string): Promise<Response> {
        let requestHeaders = new Headers();
        requestHeaders.append('Content-Type', 'application/json');
        let userInfo = JSON.parse(localStorage.getItem('userInfo'));
        requestHeaders.append('Authorization', 'Bearer ' + userInfo.loginId);
    
        return this.http
        .delete(this.config.getAPIBasePath() + 'public/' + this.config.useWhichAPI(whichAPI) + apiURL, {headers: requestHeaders})
        .toPromise()
        .then(
            (response: Response) => {
                console.log('PROMISE', response);
                let apiResponse = response.json();
                console.log('FIRST===', apiResponse);
                return response;
            }
        )
        .catch(
            (error: Response)  => {
                if (error.status == 401) {
                    let tokenRequestBody = {
                        "email": "admin@serp.org", 
                        "password": "admin"
                    };

                    let tokenRequestHeaders = new Headers();
                    tokenRequestHeaders.append('Content-Type', 'application/json');
                    tokenRequestHeaders.append('Accept', 'application/json');

                    let firstCheck = this.http
                        .post(this.config.getAPIBasePath() + 'api/public/token',tokenRequestBody, {headers: tokenRequestHeaders})
                        .toPromise()
                        .then((response: Response) => {
                            let tokenApiResponse = response.json();
                            let secondCall = this.apiDelete(whichAPI, apiURL);
                            return response;
                        });

                    return firstCheck;

                } else {
                    return error;
                }
            }
        );
        
       
    }
    getFormattedDate(myDatePickerObject: any): string {
        return myDatePickerObject.year + '-' + myDatePickerObject.month + '-' + myDatePickerObject.day;
    }
}
