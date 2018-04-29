import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { PreRequirementsService } from '../services/preRequirements.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {IotDetailsService} from '../services/iotDetails.service';
import alertify from 'alertify.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.css']
})
export class FullLayoutComponent implements OnInit {
  companyInfo;
  companyName;
  LogoName;
  companyLogo;
  companyDetails;
  companyInfoToView;
  NameOfCompany;
  fistLater;
  secondLater=" ";
  photo;
  adminId;
  fullName;
  image
  constructor(
    private router: Router,
    private IotDetailsService: IotDetailsService, 
    private PreRequirementsService: PreRequirementsService,
    private http: Http
  ) { }
  public disabled = false;
  public status: { isopen: boolean } = { isopen: false };

  public toggled(open: boolean): void {
   // console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  ngOnInit(): void {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.adminId = userInfo.user_id;
    this.image=userInfo.image;
    this.fullName=userInfo.firstName+' '+userInfo.lastName;
    this.http.get("./assets/config.json")
        .subscribe((data) => {
          this.photo=data.json().APIBasePath + data.json().uploadedLogoPath+this.image;
         });
      
    
 
  }

  loginPage() {
  
      // confirm dialog
      let self=this;
  alertify.confirm("Do you want to Logout", function () {
    let redirect =  '/login';
    self.router.navigate([redirect]);
  });
      
  // refreshPage() :void {
  //   window.location.reload();
  // }
    
  

  }


}
