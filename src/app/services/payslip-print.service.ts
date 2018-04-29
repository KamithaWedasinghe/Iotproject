import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { CommonService } from '../services/common/common.service';
//import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';


@Injectable()
export class PaySlipService {

    constructor() {

    }

    printPayslip(printSalaryDetail) {
        var wishHospitalInvoiceWindow = window.open('', '_blank');
        setTimeout(() => { this.printWishHospitalInvoice(wishHospitalInvoiceWindow, printSalaryDetail) }, 1000)
    }

    printWishHospitalInvoice(wishHospitalInvoiceWindow, printSalaryDetail) {
        let config = JSON.parse(localStorage.getItem('configurationspr'));
        let wishlogo = config.wishlogo;
        wishHospitalInvoiceWindow.focus();
        
        if(!printSalaryDetail.deductin){
            printSalaryDetail.deductin =0;
        }

        if(!printSalaryDetail.allowance){
            printSalaryDetail.allowance =0;
        }
        if(!config.monthlyAllowance){
            printSalaryDetail.monthlyAllowance =0;
        }
        if(!printSalaryDetail.monthlyDeduction){
            printSalaryDetail.monthlyDeduction =0;
        }
        if(! printSalaryDetail.netSalary){
            printSalaryDetail.netSalary =0;
        }
      


        wishHospitalInvoiceWindow.document.write(
      

            '<html>' +
            '<body style="height: 130mm;width: 160mm; padding-top: 50px;padding-left: 50px;padding-right: 50px">' +

            '<header  style="height:100px;">' +
            '<p style="font-size: 24pt "><b> '+printSalaryDetail.companyName +' </p>' +
            '<img src = "' + wishlogo + '" style="float: right; width: 110px;height: 110px; margin-top: -83px; margin-right:10px; " />' +
            '<p style="margin-top: -36px;">'+printSalaryDetail.companyAdress+'</p>' +
            '<p style="margin-top: -13px;">Tel : 077-186-2117/ 077-972-8799  </p>' +
            '<p style="margin-top: -16px;">E mail  : wishiuiivf@gmail.com </p>' +
            '<hr>' +
            '</header>' +
            '<h1>' + '</h1>' +

            '<article style="height:710px; margin-top:-20px">' +
            '<table style="width:100%; padding-top: 10px; margin-top: 50px">' + '<tr>' + '<td colspan="2" >' 
            + ' <b> Pay Slip for the month <b> &nbsp:' + ' &nbsp&nbsp&nbsp' + printSalaryDetail.createdDate + '</td>'
            + '</tr>' + '<tr style="margin-top: 200px"><tr></tr> <tr></tr> <tr></tr> <tr></tr> <tr></tr> <tr></tr> <tr></tr> <tr></tr> <tr></tr>' + '<td>' + 'Employee id &nbsp&nbsp : &nbsp' + printSalaryDetail.employeeid + '&nbsp' + '</td>' + '<td>' + 'Employee Name : ' + '&nbsp' + printSalaryDetail.firstName + ' ' + printSalaryDetail.lastName +
            '</td>' + '</tr>' + '<tr>' + '<td>' + ' Gross Salary &nbsp&nbsp&nbsp:' + '&nbsp&nbspRs&nbsp' + '<b>' + printSalaryDetail.netSalary.toFixed(2).replace(/./g, function (c, i, a) {
                return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
            }) + '</b>' + '</td>' + '<td>'
            + 'Net Salary &nbsp &nbsp &nbsp &nbsp &nbsp :' + '&nbsp&nbsp &nbspRs&nbsp'+ printSalaryDetail.netSalary.toFixed(2).replace(/./g, function (c, i, a) {
                return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
            }) + '</td>' + '</tr>' + '<tr>' + '<td>' + ' Basic Salary &nbsp&nbsp&nbsp:' + '&nbsp&nbsp&nbspRs&nbsp' + printSalaryDetail.basicSalary.toFixed(2).replace(/./g, function (c, i, a) {
                return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;}) + '</td>' + '<td>'
            + '</tr>' + '</table>'
            + ' <br/>' +




            '<table  style="width:100%">' + '<tr>' + '<th style="text-align:right">' + 'Earning&nbsp&nbsp' + '</th>' + '<th>' + '</th>' + '<th>' + '</th>' + '<th style="text-align:left">' + 'Deduction' + '</th>' + '</tr>' + '<tr>' +
            '<td>' + ' &nbsp&nbsp&nbsp&nbsp Description</td>' +
            '<td>' + 'Amount &nbsp(Rs)' + '</td>' +
            '<td style="text-align:right">' + ' Description ' + '</td>' +
            '<td style="text-align:right">' + 'Amount &nbsp(Rs)' + '</td>' +
            ' </tr>' +
            '<tr>' +
            '<td>' + 'Allowance ' + '</td>' +
            '<td>' + printSalaryDetail.allowance .toFixed(2).replace(/./g, function(c, i, a) {
                return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c; })  + '</td>' +
            '<td style="text-align:center">' + ' Deduction&nbsp ' + '</td>' +
            '<td style="text-align:right">' +  printSalaryDetail.deductin.toFixed(2).replace(/./g, function(c, i, a) {
                return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c; }) + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td>' + ' Monthly Allowance ' + '</td>' +
            '<td>'+'<u>'  + printSalaryDetail.monthlyAllowance.toFixed(2).replace(/./g, function(c, i, a) {
                return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c; })+'</u> '+'</td>' +
            '<td style="text-align:right">' + 'Monthly Deduction ' + '</td>' +
            '<td style="text-align:right">'+'<u>'  + printSalaryDetail.monthlyDeduction.toFixed(2).replace(/./g, function(c, i, a) {
                return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c; }) +'</u> '+'</td>' +
            '</tr>' +
            '<tr>' +
            '</tr>' +
            '<tr>' +
            '<td>' + ' <b>Total Earning <b> ' + '</td>' +
            '<td>' + printSalaryDetail.totalEarning.toFixed(2).replace(/./g, function(c, i, a) {
                return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c; })  + '</td>' +
            '<td style="text-align:right">' + '<b>Toatal Deduction&nbsp&nbsp  <b>' + '</td>' +
            '<td style="text-align:right">'+'<p style="text-decoration-style:double">'  + printSalaryDetail.totalDeduction.toFixed(2).replace(/./g, function(c, i, a) {
                return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c; })  +'</p> '+'</td>' +
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
            '</html>'
        );
        return focus;
    }


}