import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule }from '@angular/forms';
import { NgForm } from '@angular/forms';
import {  ReactiveFormsModule }   from '@angular/forms';
import { DatePipe } from '@angular/common';
import * as _ from "lodash";
import { NgxBarcodeModule } from 'ngx-barcode';
import { MyDatePickerModule } from 'mydatepicker';
import { SharedModule } from "./shared/shared.module";
import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routing';
import { CommonService } from './services/common/common.service';
import { ConfigService } from './services/config/config.service';
import { AuthenticationService } from './services/common/authentication.service';
import {PaySlipService} from './services/payslip-print.service';
import { PayrollService } from './services/Payroll.service';
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard }  from './services/common/auth-guard.service';
import {DataTableModule} from "angular2-datatable";
import { CommonModule } from '@angular/common';
import {PayrollMasterService} from './services/payrollMaster.service';
import { ImageUploadModule } from "angular2-image-upload";
import {PreRequirementsService} from './services/preRequirements.service';
import {PayrollDryRunService} from './services/payrollDryRun.service';
import { DataFilterPipe }   from './directive/data-filter-pipe';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MonthlyPaySlipService} from './services/monthlyPayslip-print.service';
import {IotAccountsService} from './services/iotAccounts.services';
import {IotDetailsService} from './services/iotDetails.service';
import { AddDevicesComponent } from './add-devices/add-devices.component';
import { RegisterEmployeeComponent } from './RegisterIotEmployee/RegisterEmployee.component';
import {FormGroup} from '@angular/forms';
import { UserAccountsComponent } from './user-accounts/user-accounts.component';
import { EmailService } from './services/email.service';
import { ViewUserDetailsComponent } from './view-user-details/view-user-details.component';


//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    HttpModule,
    NgxBarcodeModule,
    DataTableModule,
    CommonModule,
    MyDatePickerModule,
    SharedModule,
    ImageUploadModule.forRoot(),
    
   // BootstrapSwitchModule.forRoot(),
   NgbModule.forRoot(),
   
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    SimpleLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    LoginComponent,
    DataFilterPipe,
    RegisterEmployeeComponent,
    AddDevicesComponent,
    UserAccountsComponent,
    ViewUserDetailsComponent,

   
  ],
  providers: [
    {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
    
  },
    DatePipe,
    CommonService,
    ConfigService,
    PayrollService,
    PayrollMasterService,
    AuthenticationService,
    PreRequirementsService,
    PayrollDryRunService,
    IotDetailsService,
    AuthGuard,
    PaySlipService,
    MonthlyPaySlipService,
    IotAccountsService,
    EmailService,
    
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
