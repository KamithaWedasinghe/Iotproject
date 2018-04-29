import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
@Injectable()
export class ConfigService {
   api;
   constructor(private http: Http) {
       this.http.get("./assets/config.json")
           .subscribe((data) => {
               console.log(data.json())
               this.api = data.json().api;
               let wishlogo = data.json().wishlogo;
               let wishmotto = data.json().wishmotto;
               localStorage.setItem('configurationspr', '{"api": "' + this.api + '", "wishlogo": "' + wishlogo + '", "wishmotto": "' + wishmotto + '"}');
           });
   }

   getAPIBasePath(): string {
    return 'http://quadro.projects.mrt.ac.lk/api/';
}

   getapi() {
       this.http.get("./assets/config.json")
           .subscribe((data) => {
               console.log(data.json())
               this.api = data.json().api;
               let wishlogo = data.json().wishlogo;
               let wishmotto = data.json().wishmotto;
               localStorage.setItem('configurationspr', '{"api": "' + this.api + '", "wishlogo": "' + wishlogo + '", "wishmotto": "' + wishmotto + '"}');
           });
   }

   useWhichAPI(apiName: string): string {
       switch (apiName) {
           case 'accLab': {
               return 'acclab/v1/';
           }

           case 'sincere': {
               return 'sincere/v1/';
           }

           case 'cs': {
               return 'cs/v1/';
           }

           case 'pr': {
               return 'pr/v1/';
           }
           case 'iot': {
            return 'iot/v1/';
        }
           default: {
               return 'xxx';
           }
       }
   }

}