import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { CommonService } from '../services/common/common.service';
//import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import * as moment from 'moment';
import {PreRequirementsService} from '../services/preRequirements.service'
@Injectable()
export class MonthlyPaySlipService {
    companyName
    companyAdress
    phoneNumber
    email
    constructor(
        private PreRequirementsService:PreRequirementsService
    ) {
        this.PreRequirementsService.getCompanyDetails().then(response =>{
            let companyDetail = response.json().data;
            console.log('company',companyDetail)
            this.companyName = companyDetail[0].companyName;
            this.companyAdress = companyDetail[0].addressLineOne;
            this.phoneNumber = companyDetail[0].phoneNumber ;
            this.email = companyDetail[0].email 
          })
         

    }

    printAllMonthlyPayslip(SalaryDetail) {
        var wishHospitalInvoiceWindow = window.open('', '_blank');
        setTimeout(() => { this.printWishHospitalInvoice(wishHospitalInvoiceWindow, SalaryDetail) }, 1000)
    }

    printWishHospitalInvoice(wishHospitalInvoiceWindow, SalaryDetail) {
        let config = JSON.parse(localStorage.getItem('configurationspr'));
        let wishlogo = config.wishlogo;
        let print='';
        for(let a=0;a<SalaryDetail.length;a++){
            if(!SalaryDetail[a].netSalary){
                SalaryDetail[a].netSalary=0;
            }
            if(!SalaryDetail[a].basicSalary){
                SalaryDetail[a].basicSalary=0;
            }
            if(!SalaryDetail[a].allowanceTotal){
                SalaryDetail[a].allowanceTotal=0;
            }
            if(!SalaryDetail[a].deductionTotal){
                SalaryDetail[a].deductionTotal=0;
            }
            if(!SalaryDetail[a].MonthlyallowanceTotal){
                SalaryDetail[a].MonthlyallowanceTotal=0;
            }
            if(!SalaryDetail[a].MonthlydeductionTotal){
                SalaryDetail[a].MonthlydeductionTotal=0;
            }
            if(!SalaryDetail[a].MonthlydeductionTotal){
                SalaryDetail[a].MonthlydeductionTotal=0;
            }



            print=print+            '<div style="break-before: page;">' +
            '<body style="height: 130mm;width: 160mm; padding-top: 50px;padding-left: 50px;padding-right: 50px">' +

            '<header  style="height:100px;">' +
            '<p style="font-size: 24pt "><b>  '+this.companyName+' </p>' +
            '<img src = "' + wishlogo + '" style="float: right; width: 110px;height: 110px; margin-top: -83px; margin-right:10px; " />' +
            '<p style="margin-top: -36px;">'+ this.companyAdress+'</p>' +
            '<p style="margin-top: -13px;">Tel :'+ this.phoneNumber+'  </p>' +
            '<p style="margin-top: -16px;">E mail  : wishiuiivf@gmail.com </p>' +
            '<hr>' +
            '</header>' +
            '<h1>' + '</h1>' +

            '<article style="height:710px; margin-top:-20px">' +
            '<table style="width:100%; padding-top: 10px; margin-top: 50px">' + '<tr>' + '<td colspan="2" >' 
            + ' <b> Pay Slip for the month of <b> &nbsp:' + ' &nbsp&nbsp&nbsp' +moment(new Date(SalaryDetail[a].createdDate)).format("MMMM YYYY")  + '</td>'
            + '</tr>' + '<tr style="margin-top: 200px"><tr></tr> <tr></tr> <tr></tr> <tr></tr> <tr></tr> <tr></tr> <tr></tr> <tr></tr> <tr></tr>' + '<td>' + 'Employee id &nbsp&nbsp : &nbsp' +  SalaryDetail[a].employeeid  + '&nbsp' + '</td>' + '<td>' + 'Employee Name : ' + '&nbsp' + SalaryDetail[a].firstName + ' ' + SalaryDetail[a].lastName +
            '</td>' + '</tr>' + '<tr>' + '<td>' + ' Gross Salary &nbsp&nbsp&nbsp:' + '&nbsp&nbsp' + '<b>'+'Rs&nbsp' + SalaryDetail[a].netSalary.toFixed(2).replace(/./g, function (c, i, a) {
                return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
            })  
          + '</b>' + '</td>' + '<td>'
            + 'Net Salary &nbsp &nbsp &nbsp &nbsp &nbsp :' + '&nbsp&nbsp'+'Rs&nbsp' + SalaryDetail[a].netSalary.toFixed(2).replace(/./g, function (c, i, a) {
                return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
            })   + '</td>' + '</tr>' + '<tr>' + '<td>' + ' Basic Salary &nbsp&nbsp&nbsp:' + '&nbsp&nbsp&nbsp'+'Rs&nbsp' +SalaryDetail[a].basicSalary.toFixed(2).replace(/./g, function (c, i, a) {
                return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
            })   + '</td>' + '<td>'
            + '</tr>' + '</table>'
            + ' <br/>' +
            '<table  style="width:100%">' + '<tr>' + '<th style="text-align:right">' + 'Earning&nbsp&nbsp' + '</th>' + '<th>' + '</th>' + '<th>' + '</th>' + '<th style="text-align:left">' + 'Deduction' + '</th>' + '</tr>' + '<tr>' +
            '<td>' + ' &nbsp&nbsp&nbsp&nbsp Description</td>' +
            '<td>' + 'Amount (Rs) ' + '</td>' +
            '<td style="text-align:right">' + ' Description ' + '</td>' +
            '<td style="text-align:right">' + 'Amount (Rs) ' + '</td>' +
            ' </tr>' +
            '<tr>' +
            '<td>' + 'Allowance ' + '</td>' +
            '<td>' + SalaryDetail[a].allowanceTotal.toFixed(2).replace(/./g, function (c, i, a) {
                return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
            })   + '</td>' +
            '<td style="text-align:center">' + ' Deduction&nbsp ' + '</td>' +
            '<td style="text-align:right">' + SalaryDetail[a].deductionTotal.toFixed(2).replace(/./g, function (c, i, a) {
                return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
            })  + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td>' + ' Monthly Allowance ' + '</td>' +
            '<td>'+'<u>'  + SalaryDetail[a].MonthlyallowanceTotal.toFixed(2).replace(/./g, function (c, i, a) {
                return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
            })  +'</u> '+'</td>' +
            '<td style="text-align:right">' + 'Monthly Deduction ' + '</td>' +
            '<td style="text-align:right">'+'<u>'  +SalaryDetail[a].MonthlydeductionTotal.toFixed(2).replace(/./g, function (c, i, a) {
                return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
            })   +'</u> '+'</td>' +
            '</tr>' +
            '<tr>' +
            '</tr>' +
            '<tr>' +
            '<td>' + ' <b>Total Earning <b> ' + '</td>' +
            '<td>' + (SalaryDetail[a].MonthlyallowanceTotal+ SalaryDetail[a].allowanceTotal).toFixed(2).replace(/./g, function (c, i, a) {
                return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
            })    + '</td>' +
            '<td style="text-align:right">' + '<b>Toatal Deduction&nbsp&nbsp  <b>' + '</td>' +
            '<td style="text-align:right">'+'<p style="text-decoration-style:double">'  +  (SalaryDetail[a].MonthlydeductionTotal+ SalaryDetail[a].deductionTotal).toFixed(2).replace(/./g, function (c, i, a) {
                return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
            })   +'</p> '+'</td>' +
            '</tr>' +


            '</table>' +


            '</article>' +


            '<footer style="height:15px;">' +

           
            '<h3 style ="font-family: Cambria, Georgia, serif; text-align:right">Authorized Signature<h3>' +
            // '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<img src = "'+wishmotto+'" style="margin-left:80px ; width: 500px;height: 100px" />' +
            '<hr>' +
            '</body>' +
            '<script>' +
            'setTimeout(function () { window.print(); window.close(); }, 400);' +
            '</script>' +
            '</div>'
       
        }
        
        wishHospitalInvoiceWindow.focus();
        wishHospitalInvoiceWindow.document.write( '<html>'+print+'</html>');

        return focus;
    }


}