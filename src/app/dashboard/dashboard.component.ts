import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IotDetailsService } from '../services/iotDetails.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { routerTransition } from './../router.animations';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
  deviceDetails;
  detailArrayLength;
  device01=false;
  device02=false;
  device03=false;
  device04=false;
  device05=false;
  device06=false;
  diviceStatus=false;
  currentDateTime;
  startedDateTime;
  adminId;
  firstSencerVal;
  secondSencerVal;
  thirdSencerVal;
  fourthSencerVal;
  fifthSencerVal;
  sixthSencerVal;
  setTime;
  obje;
  nextDateTime;
  currentTime;
  setNextDateTime;
  current;
  thirdDateTime;
  fourthDateTime;
  secondDateTime;
  fifthDateTime;
  sixthDateTime;
  seventhDateTime;
  eightthDateTime;
  firstTime;
  secondTime;
  thirdTime;
  fourthTime;
  fifthTime;
  sixthTime;
  seventhTime;
  eighthTime;
  //devicesArray = [];
  currentDay;
  currentDayData;
  previousData;
  MacAddress0="Not set";
  unit0=0;
  MacAddress1="Not set";
  unit1=0;
  MacAddress2="Not set";
  unit2=0;
  MacAddress3="Not set";
  unit3=0;
  MacAddress4="Not set";
  unit4=0;
  MacAddress5="Not set";
  unit5=0;
  

  time;
  total;
  // lineChart
public lineChartData01: Array<any> =[
    { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Present Day' },
    { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Previous Day' }
    
  ];
  public lineChartData02: Array<any> =[
    { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Present Day' },
    { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Previous Day' }
    
  ];
  public lineChartData03: Array<any>=[
    { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Present Day' },
    { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Previous Day' }
    
  ];
  public lineChartData04: Array<any> =[
    { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Present Day' },
    { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Previous Day' }
    
  ];
  public lineChartData05: Array<any> =[
    { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Present Day' },
    { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Previous Day' }
    
  ];
  public lineChartData06: Array<any> =[
    { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Present Day' },
    { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Previous Day' }
    
  ];

  public lineChartLabels: Array<any> = [
    '0h',
    '3h',
    '6h',
    '9h',
    '12h',
    '15h',
    '18h',
    '21h'
  ];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    {
      // dreen
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'green',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    {
      // red
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
    
    //   // grey
    //   backgroundColor: 'rgba(148,159,177,0.2)',
    //   borderColor: 'rgba(148,159,177,1)',
    //   pointBackgroundColor: 'rgba(148,159,177,1)',
    //   pointBorderColor: '#fff',
    //   pointHoverBackgroundColor: '#fff',
    //   pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    // }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';



  constructor(private router: Router, private IotDetailsService: IotDetailsService) {

    this.currentDateTime = {
      "date": {
        year: moment().year(),
        month: (moment().month() + 1),
        day: moment().date(),
        hour: moment().hours(),
        minutes: moment().minutes(),
        seconds: moment().seconds()
      }
    }
    this.startedDateTime = (this.currentDateTime.date.year + '-' + this.currentDateTime.date.month + '-' + this.currentDateTime.date.day + ' ' + this.currentDateTime.date.hour + ':' + this.currentDateTime.date.minutes + ':' + this.currentDateTime.date.seconds);
    this.currentDay = (this.currentDateTime.date.year + '-' + this.currentDateTime.date.month + '-' + this.currentDateTime.date.day + ' ' + '00' + ':' + '00' + ':' + '00');

  }




  ngOnInit() {
    //this.viewPeviousDetails();
   // this.viewDeviceDetils();
    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.adminId = userInfo.user_id;
    this.setNextDateTime = {
      "date": {
        year: moment().year(),
        month: (moment().month() + 1),
        day: moment().date(),
        hour: moment().hours(),
        // hour: moment().add(3,'hours').hours(),
        minutes: moment().add(1, 'minutes').minutes(),
        seconds: moment().seconds()
      }
    }
   // this.viewDeviceDetils();
   
    this.IotDetailsService.checkDeviceDetails(this.adminId).then(details => {
      if(details.json().data[0].count!=0){
        this.viewPeviousDetails();
        this.getDeviceDetails();
      }
      else{
        this.diviceStatus=true;
      }
    });
  }




  getDeviceDetails() {
    this.strtupFuntion();
  }
  strtupFuntion(){
    if (!localStorage.getItem('firstDateTime')) {
      this.IotDetailsService.createTemporyTable().then(details => {
        if(details.json().error==false){
          console.log("created table");
          this.getfirstly();
        }
      });
     
    }
  }
getfirstly() {
 
    //localStorage.setItem('previosAdminId',this.adminId);
    localStorage.setItem('firstDateTime', this.startedDateTime);
    this.IotDetailsService.getDeviceDetails(this.adminId).then(details => {

      let result = details.json();
console.log("dataofff",details.json().data);
      this.IotDetailsService.checkcomponentChart(this.adminId,this.currentDay).then(details => {
          if(details.json().data[0].count==0){
            for (var i = 0; i < result.data.length; i++) {
              localStorage.setItem('firstTimecomponent' + i, '{"Component_id": "' + result.data[i].Component_id + '","name": "' + result.data[i].name + '","Current_value": "' + result.data[i].Current_value + '", "MacAddress": "' + result.data[i].MacAddress + '", "Unit": "' + result.data[i].Unit + '"}');
              this.time = 'firstTimecomponent' + i;
              let sencerComponent = JSON.parse(localStorage.getItem( this.time));
             let count=1;
             
              let obj={
                Component_id:sencerComponent.Component_id,
                Current_value:sencerComponent.Current_value,
                adminId:this.adminId,
                count:count,
                day:this.currentDay,
                MacAddress:sencerComponent.MacAddress,
                Unit:sencerComponent.Unit
              }

              this.IotDetailsService.setComponentChart(obj).then(details => {
               
              });
           
            }
          }else{
            for (var i = 0; i < result.data.length; i++) {
              localStorage.setItem('firstTimecomponent' + i, '{"Component_id": "' + result.data[i].Component_id + '","name": "' + result.data[i].name + '","Current_value": "' + result.data[i].Current_value + '", "MacAddress": "' + result.data[i].MacAddress + '", "Unit": "' + result.data[i].Unit + '"}');
              this.time = 'firstTimecomponent' + i;
              let sencerComponent = JSON.parse(localStorage.getItem( this.time));
              let count=1;
             
              let obj={
                Component_id:sencerComponent.Component_id,
                Current_value:sencerComponent.Current_value,
                adminId:this.adminId,
                count:count,
                day:this.currentDay
              }
              this.IotDetailsService.updateComponentChart(obj).then(details => {
               
              });
              
                
              
                
            }
          }
      });

      
      
   
      this.secondDateTime = (this.setNextDateTime.date.year + '-' + this.setNextDateTime.date.month + '-' + this.setNextDateTime.date.day + ' ' + this.setNextDateTime.date.hour + ':' + this.setNextDateTime.date.minutes + ':' + this.setNextDateTime.date.seconds);
      localStorage.setItem('secondDateTime', this.secondDateTime);
      this.viewPeviousDetails();
      this.viewDeviceDetils();
  
    });
  }
  refreshData() {
   
   
    this.current = {
      "date": {
        year: moment().year(),
        month: (moment().month() + 1),
        day: moment().date(),
        hour: moment().hours(),
        minutes: moment().minutes(),
        seconds: moment().seconds()
      }
    }
    this.currentTime = (this.current.date.year + '-' + this.current.date.month + '-' + this.current.date.day + ' ' + this.current.date.hour + ':' + this.current.date.minutes + ':' + this.current.date.seconds);


    if (localStorage.getItem('secondDateTime')) {

      if (localStorage.getItem('secondDateTime') <= this.currentTime) {
        //this.devicesArray = [];
        this.callSeondTimer();
      }

    } else if (localStorage.getItem('thirdDateTime')) {

      if (localStorage.getItem('thirdDateTime') <= this.currentTime) {
        //this.devicesArray = [];
        this.callThirdTimer();

      }

    } else if (localStorage.getItem('fourthDateTime')) {

      if (localStorage.getItem('fourthDateTime') <= this.currentTime) {
        //this.devicesArray = [];
        this.callFourthTimer();
      }

    } else if (localStorage.getItem('fifthDateTime')) {

      if (localStorage.getItem('fifthDateTime') <= this.currentTime) {
       // this.devicesArray = [];
        this.callFifthTimer();
      }

    }
    else if (localStorage.getItem('sixthDateTime')) {

      if (localStorage.getItem('sixthDateTime') <= this.currentTime) {
      //  this.devicesArray = [];
        this.callSixthTimer();
      }

    }
    else if (localStorage.getItem('seventhDateTime')) {

      if (localStorage.getItem('seventhDateTime') <= this.currentTime) {
       // this.devicesArray = [];
        this.callSeventhTimer();
      }

    }
    else if (localStorage.getItem('eightthDateTime')) {

      if (localStorage.getItem('eightthDateTime') <= this.currentTime) {
       // this.devicesArray = [];
        this.callEightthTimer();
      }

    }else{

    }
    this.viewDeviceDetils();
  }



  callSeondTimer() {
    this.setNextDateTime = {
      "date": {
        year: moment().year(),
        month: (moment().month() + 1),
        day: moment().date(),
        hour: moment().hours(),
        // hour: moment().add(3,'hours').hours(),
        minutes: moment().add(1, 'minutes').minutes(),
        seconds: moment().seconds()
      }
    }
    this.IotDetailsService.getDeviceDetails(this.adminId).then(details => {

      let result = details.json();
      
      for (var i = 0; i < result.data.length; i++) {
        localStorage.setItem('secondTimecomponent' + i, '{"Component_id": "' + result.data[i].Component_id + '","name": "' + result.data[i].name + '","Current_value": "' + result.data[i].Current_value + '", "MacAddress": "' + result.data[i].MacAddress + '", "Unit": "' + result.data[i].Unit + '"}');
        this.time = 'secondTimecomponent' + i;
        let sencerComponent = JSON.parse(localStorage.getItem( this.time));
       let count=2;
        let obj={
          Component_id:sencerComponent.Component_id,
          Current_value:sencerComponent.Current_value,
          adminId:this.adminId,
          count:count,
          day:this.currentDay
        }
        this.IotDetailsService.updateComponentChart(obj).then(details => {
          
        });
        
      }
      this.viewDeviceDetils();
      this.thirdDateTime = (this.setNextDateTime.date.year + '-' + this.setNextDateTime.date.month + '-' + this.setNextDateTime.date.day + ' ' + this.setNextDateTime.date.hour + ':' + this.setNextDateTime.date.minutes + ':' + this.setNextDateTime.date.seconds);
      localStorage.setItem('thirdDateTime', this.thirdDateTime);
      localStorage.removeItem('secondDateTime');
     // this.viewPeviousDetails();
      
    });
    //this.sencersArray();
  }

  callThirdTimer() {
    this.setNextDateTime = {
      "date": {
        year: moment().year(),
        month: (moment().month() + 1),
        day: moment().date(),
        hour: moment().hours(),
        // hour: moment().add(3,'hours').hours(),
        minutes: moment().add(1, 'minutes').minutes(),
        seconds: moment().seconds()
      }
    }
    // console.log("third");
    this.IotDetailsService.getDeviceDetails(this.adminId).then(details => {

      let result = details.json();
      
      for (var i = 0; i < result.data.length; i++) {
        localStorage.setItem('thirdTimecomponent' + i, '{"Component_id": "' + result.data[i].Component_id + '","name": "' + result.data[i].name + '","Current_value": "' + result.data[i].Current_value + '", "MacAddress": "' + result.data[i].MacAddress + '", "Unit": "' + result.data[i].Unit + '"}');
        this.time = 'thirdTimecomponent' + i;
        let sencerComponent = JSON.parse(localStorage.getItem( this.time));
       let count=3;
        let obj={
          Component_id:sencerComponent.Component_id,
          Current_value:sencerComponent.Current_value,
          adminId:this.adminId,
          count:count,
          day:this.currentDay
        }
        this.IotDetailsService.updateComponentChart(obj).then(details => {
          
        });
       
      }
     
      this.fourthDateTime = (this.setNextDateTime.date.year + '-' + this.setNextDateTime.date.month + '-' + this.setNextDateTime.date.day + ' ' + this.setNextDateTime.date.hour + ':' + this.setNextDateTime.date.minutes + ':' + this.setNextDateTime.date.seconds);
      localStorage.setItem('fourthDateTime', this.fourthDateTime);
      localStorage.removeItem('thirdDateTime');
     // this.viewPeviousDetails();
      this.viewDeviceDetils();
    });
    // this.sencersArray();
  }

  callFourthTimer() {
    this.setNextDateTime = {
      "date": {
        year: moment().year(),
        month: (moment().month() + 1),
        day: moment().date(),
        hour: moment().hours(),
        // hour: moment().add(3,'hours').hours(),
        minutes: moment().add(1, 'minutes').minutes(),
        seconds: moment().seconds()
      }
    }
    //console.log("third");
    this.IotDetailsService.getDeviceDetails(this.adminId).then(details => {

      let result = details.json();
      
      for (var i = 0; i < result.data.length; i++) {
        localStorage.setItem('fourthTimecomponent' + i, '{"Component_id": "' + result.data[i].Component_id + '","name": "' + result.data[i].name + '","Current_value": "' + result.data[i].Current_value + '", "MacAddress": "' + result.data[i].MacAddress + '", "Unit": "' + result.data[i].Unit + '"}');
        this.time = 'fourthTimecomponent' + i;
        let sencerComponent = JSON.parse(localStorage.getItem( this.time));
       let count=4;
        let obj={
          Component_id:sencerComponent.Component_id,
          Current_value:sencerComponent.Current_value,
          adminId:this.adminId,
          count:count,
          day:this.currentDay
        }
        this.IotDetailsService.updateComponentChart(obj).then(details => {
          
        });
       // localStorage.setItem('prevesDayDatilsComponent04)', '{"Component_id": "' + sencerComponent.Component_id + '","Current_value": "' + sencerComponent.Current_value + '","adminId": "' + this.adminId + '", "count": "' + count + '", "day": "' + this.currentDay + '"}');
      }
    
      this.fifthDateTime = (this.setNextDateTime.date.year + '-' + this.setNextDateTime.date.month + '-' + this.setNextDateTime.date.day + ' ' + this.setNextDateTime.date.hour + ':' + this.setNextDateTime.date.minutes + ':' + this.setNextDateTime.date.seconds);
      localStorage.setItem('fifthDateTime', this.fifthDateTime);
      localStorage.removeItem('fourthDateTime');
      //this.viewPeviousDetails();
      this.viewDeviceDetils();
    });
    //this.sencersArray();
  }
  callFifthTimer() {
    this.setNextDateTime = {
      "date": {
        year: moment().year(),
        month: (moment().month() + 1),
        day: moment().date(),
        hour: moment().hours(),
        // hour: moment().add(3,'hours').hours(),
        minutes: moment().add(1, 'minutes').minutes(),
        seconds: moment().seconds()
      }
    }
    //  console.log("third");
    this.IotDetailsService.getDeviceDetails(this.adminId).then(details => {

      let result = details.json();
      
      for (var i = 0; i < result.data.length; i++) {
        localStorage.setItem('fifthTimecomponent' + i, '{"Component_id": "' + result.data[i].Component_id + '","name": "' + result.data[i].name + '","Current_value": "' + result.data[i].Current_value + '", "MacAddress": "' + result.data[i].MacAddress + '", "Unit": "' + result.data[i].Unit + '"}');
        this.time = 'fifthTimecomponent' + i;
        let sencerComponent = JSON.parse(localStorage.getItem( this.time));
       let count=5;
        let obj={
          Component_id:sencerComponent.Component_id,
          Current_value:sencerComponent.Current_value,
          adminId:this.adminId,
          count:count,
          day:this.currentDay
        }
        this.IotDetailsService.updateComponentChart(obj).then(details => {
          
        });
       // localStorage.setItem('prevesDayDatilsComponent05)', '{"Component_id": "' + sencerComponent.Component_id + '","Current_value": "' + sencerComponent.Current_value + '","adminId": "' + this.adminId + '", "count": "' + count + '", "day": "' + this.currentDay + '"}');
      }
   
      this.sixthDateTime = (this.setNextDateTime.date.year + '-' + this.setNextDateTime.date.month + '-' + this.setNextDateTime.date.day + ' ' + this.setNextDateTime.date.hour + ':' + this.setNextDateTime.date.minutes + ':' + this.setNextDateTime.date.seconds);
      localStorage.setItem('sixthDateTime', this.sixthDateTime);
      localStorage.removeItem('fifthDateTime');
     // this.viewPeviousDetails();
      this.viewDeviceDetils();
    });

    //this.sencersArray();
  }
  callSixthTimer() {
    this.setNextDateTime = {
      "date": {
        year: moment().year(),
        month: (moment().month() + 1),
        day: moment().date(),
        hour: moment().hours(),
        // hour: moment().add(3,'hours').hours(),
        minutes: moment().add(1, 'minutes').minutes(),
        seconds: moment().seconds()
      }
    }
    //console.log("third");
    this.IotDetailsService.getDeviceDetails(this.adminId).then(details => {

      let result = details.json();
     
      for (var i = 0; i < result.data.length; i++) {
        localStorage.setItem('sixthTimecomponent' + i, '{"Component_id": "' + result.data[i].Component_id + '","name": "' + result.data[i].name + '","Current_value": "' + result.data[i].Current_value + '", "MacAddress": "' + result.data[i].MacAddress + '", "Unit": "' + result.data[i].Unit + '"}');
        this.time = 'sixthTimecomponent' + i;
        let sencerComponent = JSON.parse(localStorage.getItem( this.time));
       let count=6;
        let obj={
          Component_id:sencerComponent.Component_id,
          Current_value:sencerComponent.Current_value,
          adminId:this.adminId,
          count:count,
          day:this.currentDay
        }
        this.IotDetailsService.updateComponentChart(obj).then(details => {
          
        });
        //localStorage.setItem('prevesDayDatilsComponent06)', '{"Component_id": "' + sencerComponent.Component_id + '","Current_value": "' + sencerComponent.Current_value + '","adminId": "' + this.adminId + '", "count": "' + count + '", "day": "' + this.currentDay + '"}');
      }
      
      this.seventhDateTime = (this.setNextDateTime.date.year + '-' + this.setNextDateTime.date.month + '-' + this.setNextDateTime.date.day + ' ' + this.setNextDateTime.date.hour + ':' + this.setNextDateTime.date.minutes + ':' + this.setNextDateTime.date.seconds);
      localStorage.setItem('seventhDateTime', this.seventhDateTime);
      localStorage.removeItem('sixthDateTime');
     // this.viewPeviousDetails();
      this.viewDeviceDetils();
    });
    //this.sencersArray();
  }
  callSeventhTimer() {
    this.setNextDateTime = {
      "date": {
        year: moment().year(),
        month: (moment().month() + 1),
        day: moment().date(),
        hour: moment().hours(),
        // hour: moment().add(3,'hours').hours(),
        minutes: moment().add(1, 'minutes').minutes(),
        seconds: moment().seconds()
      }
    }
    // console.log("third");
    this.IotDetailsService.getDeviceDetails(this.adminId).then(details => {

      let result = details.json();
      
      for (var i = 0; i < result.data.length; i++) {
        localStorage.setItem('seventhTimecomponent' + i, '{"Component_id": "' + result.data[i].Component_id + '","name": "' + result.data[i].name + '","Current_value": "' + result.data[i].Current_value + '", "MacAddress": "' + result.data[i].MacAddress + '", "Unit": "' + result.data[i].Unit + '"}');
        this.time = 'seventhTimecomponent' + i;
        let sencerComponent = JSON.parse(localStorage.getItem( this.time));
       let count=7;
        let obj={
          Component_id:sencerComponent.Component_id,
          Current_value:sencerComponent.Current_value,
          adminId:this.adminId,
          count:count,
          day:this.currentDay
        }
        this.IotDetailsService.updateComponentChart(obj).then(details => {
          
        });
       // localStorage.setItem('prevesDayDatilsComponent07)', '{"Component_id": "' + sencerComponent.Component_id + '","Current_value": "' + sencerComponent.Current_value + '","adminId": "' + this.adminId + '", "count": "' + count + '", "day": "' + this.currentDay + '"}');
      }
     
      this.eightthDateTime = (this.setNextDateTime.date.year + '-' + this.setNextDateTime.date.month + '-' + this.setNextDateTime.date.day + ' ' + this.setNextDateTime.date.hour + ':' + this.setNextDateTime.date.minutes + ':' + this.setNextDateTime.date.seconds);
      localStorage.setItem('eightthDateTime', this.eightthDateTime);
      localStorage.removeItem('seventhDateTime');
     // this.viewPeviousDetails();
      this.viewDeviceDetils();
    });
    //this.sencersArray();
  }
  callEightthTimer() {
    console.log("old 88888888");
    this.setNextDateTime = {
      "date": {
        year: moment().year(),
        month: (moment().month() + 1),
        day: moment().date(),
        hour: moment().hours(),
        // hour: moment().add(3,'hours').hours(),
        minutes: moment().add(1, 'minutes').minutes(),
        seconds: moment().seconds()
      }
    }
    console.log("third");
    this.IotDetailsService.getDeviceDetails(this.adminId).then(details => {

      let result = details.json();
      
      for (var i = 0; i < result.data.length; i++) {
        localStorage.setItem('eightthTimecomponent' + i, '{"Component_id": "' + result.data[i].Component_id + '","name": "' + result.data[i].name + '","Current_value": "' + result.data[i].Current_value + '", "MacAddress": "' + result.data[i].MacAddress + '", "Unit": "' + result.data[i].Unit + '"}');
        this.time = 'eightthTimecomponent' + i;
        let sencerComponent = JSON.parse(localStorage.getItem( this.time));
       let count=8;
        let obj={
          Component_id:sencerComponent.Component_id,
          Current_value:sencerComponent.Current_value,
          adminId:this.adminId,
          count:count,
          day:this.currentDay
        }
        this.IotDetailsService.updateComponentChart(obj).then(details => {
          
        });
        
         // localStorage.setItem('prevesDayDatilsComponent08)', '{"Component_id": "' + sencerComponent.Component_id + '","Current_value": "' + sencerComponent.Current_value + '","adminId": "' + this.adminId + '", "count": "' + count + '", "day": "' + this.currentDay + '"}');
        
      }
     
      // this.eightthDateTime = (this.setNextDateTime.date.year + '-' + this.setNextDateTime.date.month + '-' + this.setNextDateTime.date.day + ' ' + this.setNextDateTime.date.hour + ':' + this.setNextDateTime.date.minutes + ':' + this.setNextDateTime.date.seconds);
      //localStorage.setItem('eightthDateTime', this.eightthDateTime);
      localStorage.removeItem('eightthDateTime');
      localStorage.removeItem('firstDateTime');
      //this.viewPeviousDetails();
      this.viewDeviceDetils();
      if(!localStorage.getItem('eightthDateTime')){
       this.setPreviousData();
      }
     
    });
    
  }


  viewPeviousDetails(){
    //localStorage.getItem('previosDay')
    this.IotDetailsService.getPreviousDataChart(this.adminId,'2018-01-28 00:00:00').then(details => {
      this.previousData=details.json();
    });
  }

  viewDeviceDetils() {
  
    // this.IotDetailsService.getPreviousDataChart(this.adminId,localStorage.getItem('previosDay')).then(details => {
   console.log("ok1 0111111111111111111");
    
    this.IotDetailsService.getdataForChart(this.adminId,this.currentDay).then(details => {
      this. currentDayData=details.json();
      console.log(this.currentDayData);
      let chartData=details.json();

      if(chartData.error==false && this.previousData.data.length!=0){
        console.log("ok1 222222222222222222222");
      switch(chartData.data.length){
      case 6:  
      this.device01=true;
      this.device02=true;
      this.device03=true;
      this.device04=true;
      this.device05=true;
      this.device06=true;
      this.MacAddress0=chartData.data[0].mac_address;
      this.unit0=chartData.data[0].unit;
      this.MacAddress1=chartData.data[1].mac_address;
      this.unit1=chartData.data[1].unit;
      this.MacAddress2=chartData.data[2].mac_address;
      this.unit2=chartData.data[2].unit;
      this.MacAddress3=chartData.data[3].mac_address;
      this.unit3=chartData.data[3].unit;
      this.MacAddress4=chartData.data[4].mac_address;
      this.unit4=chartData.data[4].unit;
      this.MacAddress5=chartData.data[5].mac_address;
      this.unit5=chartData.data[5].unit;

    

      this.lineChartData01= [
        { data: [chartData.data[0].today_value_first_hour, chartData.data[0].today_value_second_hour, chartData.data[0].today_value_thrid_hour, chartData.data[0].today_value_fourth_hour, chartData.data[0].today_value_fifth_hour, chartData.data[0].today_value_sixth_hour, chartData.data[0].today_value_seventh_hour, chartData.data[0].today_value_eight_hour], label: 'Present Day' },
        { data: [this.previousData.data[0].previous_value_first_hour, this.previousData.data[0].previous_value_second_hour, this.previousData.data[0].previous_value_thirdt_hour, this.previousData.data[0].previous_value_fourth_hour, this.previousData.data[0].previous_value_fifth_hour, this.previousData.data[0].previous_value_sixth_hour, this.previousData.data[0].previous_value_seventh_hour, this.previousData.data[0].previous_value_eight_hour], label: 'Previous Day' }
        
      
      ];
      this.lineChartData02=[
        { data: [chartData.data[1].today_value_first_hour, chartData.data[1].today_value_second_hour, chartData.data[1].today_value_thrid_hour, chartData.data[1].today_value_fourth_hour, chartData.data[1].today_value_fifth_hour, chartData.data[1].today_value_sixth_hour, chartData.data[1].today_value_seventh_hour, chartData.data[1].today_value_eight_hour], label: 'Present Day' },
        { data: [this.previousData.data[1].previous_value_first_hour, this.previousData.data[1].previous_value_second_hour, this.previousData.data[1].previous_value_thirdt_hour, this.previousData.data[1].previous_value_fourth_hour, this.previousData.data[1].previous_value_fifth_hour, this.previousData.data[1].previous_value_sixth_hour, this.previousData.data[1].previous_value_seventh_hour, this.previousData.data[1].previous_value_eight_hour], label: 'Previous Day' }
        
      ];
      this.lineChartData03= [
        { data: [chartData.data[2].today_value_first_hour, chartData.data[2].today_value_second_hour, chartData.data[2].today_value_thrid_hour, chartData.data[2].today_value_fourth_hour, chartData.data[2].today_value_fifth_hour, chartData.data[2].today_value_sixth_hour, chartData.data[2].today_value_seventh_hour, chartData.data[2].today_value_eight_hour], label: 'Present Day' },
        { data: [this.previousData.data[2].previous_value_first_hour, this.previousData.data[2].previous_value_second_hour, this.previousData.data[2].previous_value_thirdt_hour, this.previousData.data[2].previous_value_fourth_hour, this.previousData.data[2].previous_value_fifth_hour, this.previousData.data[2].previous_value_sixth_hour, this.previousData.data[2].previous_value_seventh_hour, this.previousData.data[2].previous_value_eight_hour], label: 'Previous Day' }
        
      
      ];
      this.lineChartData04=[
        { data: [chartData.data[3].today_value_first_hour, chartData.data[3].today_value_second_hour, chartData.data[3].today_value_thrid_hour, chartData.data[3].today_value_fourth_hour, chartData.data[3].today_value_fifth_hour, chartData.data[3].today_value_sixth_hour, chartData.data[3].today_value_seventh_hour, chartData.data[3].today_value_eight_hour], label: 'Present Day' },
        { data: [this.previousData.data[3].previous_value_first_hour, this.previousData.data[3].previous_value_second_hour, this.previousData.data[3].previous_value_thirdt_hour, this.previousData.data[3].previous_value_fourth_hour, this.previousData.data[3].previous_value_fifth_hour, this.previousData.data[3].previous_value_sixth_hour, this.previousData.data[3].previous_value_seventh_hour, this.previousData.data[3].previous_value_eight_hour], label: 'Previous Day' }
        
      ];
  
      this.lineChartData05= [
        { data: [chartData.data[4].today_value_first_hour, chartData.data[4].today_value_second_hour, chartData.data[4].today_value_thrid_hour, chartData.data[4].today_value_fourth_hour, chartData.data[4].today_value_fifth_hour, chartData.data[4].today_value_sixth_hour, chartData.data[4].today_value_seventh_hour, chartData.data[4].today_value_eight_hour], label: 'Present Day' },
        { data: [this.previousData.data[4].previous_value_first_hour, this.previousData.data[4].previous_value_second_hour, this.previousData.data[4].previous_value_thirdt_hour, this.previousData.data[4].previous_value_fourth_hour, this.previousData.data[4].previous_value_fifth_hour, this.previousData.data[4].previous_value_sixth_hour, this.previousData.data[4].previous_value_seventh_hour, this.previousData.data[4].previous_value_eight_hour], label: 'Previous Day' }
        
      
      ];
      this.lineChartData06=[
        { data: [chartData.data[5].today_value_first_hour, chartData.data[5].today_value_second_hour, chartData.data[5].today_value_thrid_hour, chartData.data[5].today_value_fourth_hour, chartData.data[5].today_value_fifth_hour, chartData.data[5].today_value_sixth_hour, chartData.data[5].today_value_seventh_hour, chartData.data[5].today_value_eight_hour], label: 'Present Day' },
        { data: [this.previousData.data[5].previous_value_first_hour, this.previousData.data[5].previous_value_second_hour, this.previousData.data[5].previous_value_thirdt_hour, this.previousData.data[5].previous_value_fourth_hour, this.previousData.data[5].previous_value_fifth_hour, this.previousData.data[5].previous_value_sixth_hour, this.previousData.data[0].previous_value_seventh_hour, this.previousData.data[5].previous_value_eight_hour], label: 'Previous Day' }
        
      ];
      break;
      case 5:
      this.device01=true;
      this.device02=true;
      this.device03=true;
      this.device04=true;
      this.device05=true;
      this.device06=false;
      this.MacAddress0=chartData.data[0].mac_address;
      this.unit0=chartData.data[0].unit;
      this.MacAddress1=chartData.data[1].mac_address;
      this.unit1=chartData.data[1].unit;
      this.MacAddress2=chartData.data[2].mac_address;
      this.unit2=chartData.data[2].unit;
      this.MacAddress3=chartData.data[3].mac_address;
      this.unit3=chartData.data[3].unit;
      this.MacAddress4=chartData.data[4].mac_address;
      this.unit4=chartData.data[4].unit;

      this.lineChartData01= [
        { data: [chartData.data[0].today_value_first_hour, chartData.data[0].today_value_second_hour, chartData.data[0].today_value_thrid_hour, chartData.data[0].today_value_fourth_hour, chartData.data[0].today_value_fifth_hour, chartData.data[0].today_value_sixth_hour, chartData.data[0].today_value_seventh_hour, chartData.data[0].today_value_eight_hour], label: 'Present Day' },
        { data: [this.previousData.data[0].previous_value_first_hour, this.previousData.data[0].previous_value_second_hour, this.previousData.data[0].previous_value_thirdt_hour, this.previousData.data[0].previous_value_fourth_hour, this.previousData.data[0].previous_value_fifth_hour, this.previousData.data[0].previous_value_sixth_hour, this.previousData.data[0].previous_value_seventh_hour, this.previousData.data[0].previous_value_eight_hour], label: 'Previous Day' }
        
      
      ];
      this.lineChartData02=[
        { data: [chartData.data[1].today_value_first_hour, chartData.data[1].today_value_second_hour, chartData.data[1].today_value_thrid_hour, chartData.data[1].today_value_fourth_hour, chartData.data[1].today_value_fifth_hour, chartData.data[1].today_value_sixth_hour, chartData.data[1].today_value_seventh_hour, chartData.data[1].today_value_eight_hour], label: 'Present Day' },
        { data: [this.previousData.data[1].previous_value_first_hour, this.previousData.data[1].previous_value_second_hour, this.previousData.data[1].previous_value_thirdt_hour, this.previousData.data[1].previous_value_fourth_hour, this.previousData.data[1].previous_value_fifth_hour, this.previousData.data[1].previous_value_sixth_hour, this.previousData.data[1].previous_value_seventh_hour, this.previousData.data[1].previous_value_eight_hour], label: 'Previous Day' }
        
      ];
      this.lineChartData03= [
        { data: [chartData.data[2].today_value_first_hour, chartData.data[2].today_value_second_hour, chartData.data[2].today_value_thrid_hour, chartData.data[2].today_value_fourth_hour, chartData.data[2].today_value_fifth_hour, chartData.data[2].today_value_sixth_hour, chartData.data[2].today_value_seventh_hour, chartData.data[2].today_value_eight_hour], label: 'Present Day' },
        { data: [this.previousData.data[2].previous_value_first_hour, this.previousData.data[2].previous_value_second_hour, this.previousData.data[2].previous_value_thirdt_hour, this.previousData.data[2].previous_value_fourth_hour, this.previousData.data[2].previous_value_fifth_hour, this.previousData.data[2].previous_value_sixth_hour, this.previousData.data[2].previous_value_seventh_hour, this.previousData.data[2].previous_value_eight_hour], label: 'Previous Day' }
        
      
      ];
      this.lineChartData04=[
        { data: [chartData.data[3].today_value_first_hour, chartData.data[3].today_value_second_hour, chartData.data[3].today_value_thrid_hour, chartData.data[3].today_value_fourth_hour, chartData.data[3].today_value_fifth_hour, chartData.data[3].today_value_sixth_hour, chartData.data[3].today_value_seventh_hour, chartData.data[3].today_value_eight_hour], label: 'Present Day' },
        { data: [this.previousData.data[3].previous_value_first_hour, this.previousData.data[3].previous_value_second_hour, this.previousData.data[3].previous_value_thirdt_hour, this.previousData.data[3].previous_value_fourth_hour, this.previousData.data[3].previous_value_fifth_hour, this.previousData.data[3].previous_value_sixth_hour, this.previousData.data[3].previous_value_seventh_hour, this.previousData.data[3].previous_value_eight_hour], label: 'Previous Day' }
        
      ];
  
      this.lineChartData05= [
        { data: [chartData.data[4].today_value_first_hour, chartData.data[4].today_value_second_hour, chartData.data[4].today_value_thrid_hour, chartData.data[4].today_value_fourth_hour, chartData.data[4].today_value_fifth_hour, chartData.data[4].today_value_sixth_hour, chartData.data[4].today_value_seventh_hour, chartData.data[4].today_value_eight_hour], label: 'Present Day' },
        { data: [this.previousData.data[4].previous_value_first_hour, this.previousData.data[4].previous_value_second_hour, this.previousData.data[4].previous_value_thirdt_hour, this.previousData.data[4].previous_value_fourth_hour, this.previousData.data[4].previous_value_fifth_hour, this.previousData.data[4].previous_value_sixth_hour, this.previousData.data[4].previous_value_seventh_hour, this.previousData.data[4].previous_value_eight_hour], label: 'Previous Day' }
        
      
      ];
      break;
      case 4:
      this.device01=true;
      this.device02=true;
      this.device03=true;
      this.device04=true;
      this.device05=false;
      this.device06=false;
      this.MacAddress0=chartData.data[0].mac_address;
      this.unit0=chartData.data[0].unit;
      this.MacAddress1=chartData.data[1].mac_address;
      this.unit1=chartData.data[1].unit;
      this.MacAddress2=chartData.data[2].mac_address;
      this.unit2=chartData.data[2].unit;
      this.MacAddress3=chartData.data[3].mac_address;
      this.unit3=chartData.data[3].unit;
      this.lineChartData01= [
        { data: [chartData.data[0].today_value_first_hour, chartData.data[0].today_value_second_hour, chartData.data[0].today_value_thrid_hour, chartData.data[0].today_value_fourth_hour, chartData.data[0].today_value_fifth_hour, chartData.data[0].today_value_sixth_hour, chartData.data[0].today_value_seventh_hour, chartData.data[0].today_value_eight_hour], label: 'Present Day' },
        { data: [this.previousData.data[0].previous_value_first_hour, this.previousData.data[0].previous_value_second_hour, this.previousData.data[0].previous_value_thirdt_hour, this.previousData.data[0].previous_value_fourth_hour, this.previousData.data[0].previous_value_fifth_hour, this.previousData.data[0].previous_value_sixth_hour, this.previousData.data[0].previous_value_seventh_hour, this.previousData.data[0].previous_value_eight_hour], label: 'Previous Day' }
        
      
      ];
      this.lineChartData02=[
        { data: [chartData.data[1].today_value_first_hour, chartData.data[1].today_value_second_hour, chartData.data[1].today_value_thrid_hour, chartData.data[1].today_value_fourth_hour, chartData.data[1].today_value_fifth_hour, chartData.data[1].today_value_sixth_hour, chartData.data[1].today_value_seventh_hour, chartData.data[1].today_value_eight_hour], label: 'Present Day' },
        { data: [this.previousData.data[1].previous_value_first_hour, this.previousData.data[1].previous_value_second_hour, this.previousData.data[1].previous_value_thirdt_hour, this.previousData.data[1].previous_value_fourth_hour, this.previousData.data[1].previous_value_fifth_hour, this.previousData.data[1].previous_value_sixth_hour, this.previousData.data[1].previous_value_seventh_hour, this.previousData.data[1].previous_value_eight_hour], label: 'Previous Day' }
        
      ];
      this.lineChartData03= [
        { data: [chartData.data[2].today_value_first_hour, chartData.data[2].today_value_second_hour, chartData.data[2].today_value_thrid_hour, chartData.data[2].today_value_fourth_hour, chartData.data[2].today_value_fifth_hour, chartData.data[2].today_value_sixth_hour, chartData.data[2].today_value_seventh_hour, chartData.data[2].today_value_eight_hour], label: 'Present Day' },
        { data: [this.previousData.data[2].previous_value_first_hour, this.previousData.data[2].previous_value_second_hour, this.previousData.data[2].previous_value_thirdt_hour, this.previousData.data[2].previous_value_fourth_hour, this.previousData.data[2].previous_value_fifth_hour, this.previousData.data[2].previous_value_sixth_hour, this.previousData.data[2].previous_value_seventh_hour, this.previousData.data[2].previous_value_eight_hour], label: 'Previous Day' }
       
      
      ];
      this.lineChartData04=[
        { data: [chartData.data[3].today_value_first_hour, chartData.data[3].today_value_second_hour, chartData.data[3].today_value_thrid_hour, chartData.data[3].today_value_fourth_hour, chartData.data[3].today_value_fifth_hour, chartData.data[3].today_value_sixth_hour, chartData.data[3].today_value_seventh_hour, chartData.data[3].today_value_eight_hour], label: 'Present Day' },
        { data: [this.previousData.data[3].previous_value_first_hour, this.previousData.data[3].previous_value_second_hour, this.previousData.data[3].previous_value_thirdt_hour, this.previousData.data[3].previous_value_fourth_hour, this.previousData.data[3].previous_value_fifth_hour, this.previousData.data[3].previous_value_sixth_hour, this.previousData.data[3].previous_value_seventh_hour, this.previousData.data[3].previous_value_eight_hour], label: 'Previous Day' }
        
      ];
      break;
      case 3:
      this.device01=true;
      this.device02=true;
      this.device03=true;
      this.device04=false;
      this.device05=false;
      this.device06=false;
      this.MacAddress0=chartData.data[0].mac_address;
      this.unit0=chartData.data[0].unit;
      this.MacAddress1=chartData.data[1].mac_address;
      this.unit1=chartData.data[1].unit;
      this.MacAddress2=chartData.data[2].mac_address;
      this.unit2=chartData.data[2].unit;
      this.lineChartData01= [
        { data: [chartData.data[0].today_value_first_hour, chartData.data[0].today_value_second_hour, chartData.data[0].today_value_thrid_hour, chartData.data[0].today_value_fourth_hour, chartData.data[0].today_value_fifth_hour, chartData.data[0].today_value_sixth_hour, chartData.data[0].today_value_seventh_hour, chartData.data[0].today_value_eight_hour], label: 'Present Day' },
        { data: [this.previousData.data[0].previous_value_first_hour, this.previousData.data[0].previous_value_second_hour, this.previousData.data[0].previous_value_thirdt_hour, this.previousData.data[0].previous_value_fourth_hour, this.previousData.data[0].previous_value_fifth_hour, this.previousData.data[0].previous_value_sixth_hour, this.previousData.data[0].previous_value_seventh_hour, this.previousData.data[0].previous_value_eight_hour], label: 'Previous Day' }
      
      
      ];
      this.lineChartData02=[
        { data: [chartData.data[1].today_value_first_hour, chartData.data[1].today_value_second_hour, chartData.data[1].today_value_thrid_hour, chartData.data[1].today_value_fourth_hour, chartData.data[1].today_value_fifth_hour, chartData.data[1].today_value_sixth_hour, chartData.data[1].today_value_seventh_hour, chartData.data[1].today_value_eight_hour], label: 'Present Day' },
        { data: [this.previousData.data[1].previous_value_first_hour, this.previousData.data[1].previous_value_second_hour, this.previousData.data[1].previous_value_thirdt_hour, this.previousData.data[1].previous_value_fourth_hour, this.previousData.data[1].previous_value_fifth_hour, this.previousData.data[1].previous_value_sixth_hour, this.previousData.data[1].previous_value_seventh_hour, this.previousData.data[1].previous_value_eight_hour], label: 'Previous Day' }
        
      ];
      this.lineChartData03= [
        { data: [chartData.data[2].today_value_first_hour, chartData.data[2].today_value_second_hour, chartData.data[2].today_value_thrid_hour, chartData.data[2].today_value_fourth_hour, chartData.data[2].today_value_fifth_hour, chartData.data[2].today_value_sixth_hour, chartData.data[2].today_value_seventh_hour, chartData.data[2].today_value_eight_hour], label: 'Present Day' },
        { data: [this.previousData.data[2].previous_value_first_hour, this.previousData.data[2].previous_value_second_hour, this.previousData.data[2].previous_value_thirdt_hour, this.previousData.data[2].previous_value_fourth_hour, this.previousData.data[2].previous_value_fifth_hour, this.previousData.data[2].previous_value_sixth_hour, this.previousData.data[2].previous_value_seventh_hour, this.previousData.data[2].previous_value_eight_hour], label: 'Previous Day' }
        
      
      ];
      break;
      case 2:
      this.device01=true;
      this.device02=true;
      this.device03=false;
      this.device04=false;
      this.device05=false;
      this.device06=false;
      this.MacAddress0=chartData.data[0].mac_address;
      this.unit0=chartData.data[0].unit;
      this.MacAddress1=chartData.data[1].mac_address;
      this.unit1=chartData.data[1].unit;
      this.lineChartData01= [
        { data: [chartData.data[0].today_value_first_hour, chartData.data[0].today_value_second_hour, chartData.data[0].today_value_thrid_hour, chartData.data[0].today_value_fourth_hour, chartData.data[0].today_value_fifth_hour, chartData.data[0].today_value_sixth_hour, chartData.data[0].today_value_seventh_hour, chartData.data[0].today_value_eight_hour], label: 'Present Day' },
        { data: [this.previousData.data[0].previous_value_first_hour, this.previousData.data[0].previous_value_second_hour, this.previousData.data[0].previous_value_thirdt_hour, this.previousData.data[0].previous_value_fourth_hour, this.previousData.data[0].previous_value_fifth_hour, this.previousData.data[0].previous_value_sixth_hour, this.previousData.data[0].previous_value_seventh_hour, this.previousData.data[0].previous_value_eight_hour], label: 'Previous Day' }
        
      
      ];
      this.lineChartData02=[
        { data: [chartData.data[1].today_value_first_hour, chartData.data[1].today_value_second_hour, chartData.data[1].today_value_thrid_hour, chartData.data[1].today_value_fourth_hour, chartData.data[1].today_value_fifth_hour, chartData.data[1].today_value_sixth_hour, chartData.data[1].today_value_seventh_hour, chartData.data[1].today_value_eight_hour], label: 'Previous Day' },
        { data: [this.previousData.data[1].previous_value_first_hour, this.previousData.data[1].previous_value_second_hour, this.previousData.data[1].previous_value_thirdt_hour, this.previousData.data[1].previous_value_fourth_hour, this.previousData.data[1].previous_value_fifth_hour, this.previousData.data[1].previous_value_sixth_hour, this.previousData.data[1].previous_value_seventh_hour, this.previousData.data[1].previous_value_eight_hour], label: 'Previous Day' }
        
      ];
      break;
      case 1:
      this.device01=true;
      this.device02=false;
      this.device03=false;
      this.device04=false;
      this.device05=false;
      this.device06=false;
      this.MacAddress0=chartData.data[0].mac_address;
      this.unit0=chartData.data[0].unit;
      this.lineChartData01= [
        { data: [chartData.data[0].today_value_first_hour, chartData.data[0].today_value_second_hour, chartData.data[0].today_value_thrid_hour, chartData.data[0].today_value_fourth_hour, chartData.data[0].today_value_fifth_hour, chartData.data[0].today_value_sixth_hour, chartData.data[0].today_value_seventh_hour, chartData.data[0].today_value_eight_hour], label: 'Present Day' },
        { data: [this.previousData.data[0].previous_value_first_hour, this.previousData.data[0].previous_value_second_hour, this.previousData.data[0].previous_value_thirdt_hour, this.previousData.data[0].previous_value_fourth_hour, this.previousData.data[0].previous_value_fifth_hour, this.previousData.data[0].previous_value_sixth_hour, this.previousData.data[0].previous_value_seventh_hour, this.previousData.data[0].previous_value_eight_hour], label: 'Previous Day' }
        
      
      ];
      break;
      case 0:
      //this.diviceStatus=true;
      this.device01=false;
      this.device02=false;
      this.device03=false;
      this.device04=false;
      this.device05=false;
      this.device06=false;
      this.MacAddress0="Not set";
      this.unit0=0;
      this.MacAddress1="Not set";
      this.unit1=0;
      this.MacAddress2="Not set";
      this.unit2=0;
      this.MacAddress3="Not set";
      this.unit3=0;
      this.MacAddress4="Not set";
      this.unit4=0;
      this.MacAddress5="Not set";
      this.unit5=0;
      this.lineChartData01=[
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Present Day' },
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Previous Day' }
        
      ];
      this.lineChartData02=[
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Present Day' },
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Previous Day' }
        
      ];
      this.lineChartData03=[
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Present Day' },
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Previous Day' }
        
      ];
      this.lineChartData04=[
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Present Day' },
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Previous Day' }
        
      ];
      this.lineChartData05=[
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Present Day' },
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Previous Day' }
        
      ];
      this.lineChartData06=[
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Present Day' },
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Previous Day' }
        
      ];
      default:
      break;

    }
  }else if(chartData.error==false && this.previousData.data.length==0){
    console.log("ok1 0333333333333");
    switch(chartData.data.length){
      case 6:  
      this.device01=true;
      this.device02=true;
      this.device03=true;
      this.device04=true;
      this.device05=true;
      this.device06=true;
      this.MacAddress0=chartData.data[0].mac_address;
      this.unit0=chartData.data[0].unit;
      this.MacAddress1=chartData.data[1].mac_address;
      this.unit1=chartData.data[1].unit;
      this.MacAddress2=chartData.data[2].mac_address;
      this.unit2=chartData.data[2].unit;
      this.MacAddress3=chartData.data[3].mac_address;
      this.unit3=chartData.data[3].unit;
      this.MacAddress4=chartData.data[4].mac_address;
      this.unit4=chartData.data[4].unit;
      this.MacAddress5=chartData.data[5].mac_address;
      this.unit5=chartData.data[5].unit;

    

      this.lineChartData01= [
        { data: [chartData.data[0].today_value_first_hour, chartData.data[0].today_value_second_hour, chartData.data[0].today_value_thrid_hour, chartData.data[0].today_value_fourth_hour, chartData.data[0].today_value_fifth_hour, chartData.data[0].today_value_sixth_hour, chartData.data[0].today_value_seventh_hour, chartData.data[0].today_value_eight_hour], label: 'Present Day' },
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Previous Day' }
        
      
      ];
      this.lineChartData02=[
        { data: [chartData.data[1].today_value_first_hour, chartData.data[1].today_value_second_hour, chartData.data[1].today_value_thrid_hour, chartData.data[1].today_value_fourth_hour, chartData.data[1].today_value_fifth_hour, chartData.data[1].today_value_sixth_hour, chartData.data[1].today_value_seventh_hour, chartData.data[1].today_value_eight_hour], label: 'Present Day' },
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Previous Day' }
        
      ];
      this.lineChartData03= [
        { data: [chartData.data[2].today_value_first_hour, chartData.data[2].today_value_second_hour, chartData.data[2].today_value_thrid_hour, chartData.data[2].today_value_fourth_hour, chartData.data[2].today_value_fifth_hour, chartData.data[2].today_value_sixth_hour, chartData.data[2].today_value_seventh_hour, chartData.data[2].today_value_eight_hour], label: 'Present Day' },
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Previous Day' }
        
      
      ];
      this.lineChartData04=[
        { data: [chartData.data[3].today_value_first_hour, chartData.data[3].today_value_second_hour, chartData.data[3].today_value_thrid_hour, chartData.data[3].today_value_fourth_hour, chartData.data[3].today_value_fifth_hour, chartData.data[3].today_value_sixth_hour, chartData.data[3].today_value_seventh_hour, chartData.data[3].today_value_eight_hour], label: 'Present Day' },
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Previous Day' }
        
      ];
  
      this.lineChartData05= [
        { data: [chartData.data[4].today_value_first_hour, chartData.data[4].today_value_second_hour, chartData.data[4].today_value_thrid_hour, chartData.data[4].today_value_fourth_hour, chartData.data[4].today_value_fifth_hour, chartData.data[4].today_value_sixth_hour, chartData.data[4].today_value_seventh_hour, chartData.data[4].today_value_eight_hour], label: 'Present Day' },
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Previous Day' }
        
      
      ];
      this.lineChartData06=[
        { data: [chartData.data[5].today_value_first_hour, chartData.data[5].today_value_second_hour, chartData.data[5].today_value_thrid_hour, chartData.data[5].today_value_fourth_hour, chartData.data[5].today_value_fifth_hour, chartData.data[5].today_value_sixth_hour, chartData.data[5].today_value_seventh_hour, chartData.data[5].today_value_eight_hour], label: 'Present Day' },
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Previous Day' }
        
      ];
      break;
      case 5:
      this.device01=true;
      this.device02=true;
      this.device03=true;
      this.device04=true;
      this.device05=true;
      this.device06=false;
      this.MacAddress0=chartData.data[0].mac_address;
      this.unit0=chartData.data[0].unit;
      this.MacAddress1=chartData.data[1].mac_address;
      this.unit1=chartData.data[1].unit;
      this.MacAddress2=chartData.data[2].mac_address;
      this.unit2=chartData.data[2].unit;
      this.MacAddress3=chartData.data[3].mac_address;
      this.unit3=chartData.data[3].unit;
      this.MacAddress4=chartData.data[4].mac_address;
      this.unit4=chartData.data[4].unit;

      this.lineChartData01= [
        { data: [chartData.data[0].today_value_first_hour, chartData.data[0].today_value_second_hour, chartData.data[0].today_value_thrid_hour, chartData.data[0].today_value_fourth_hour, chartData.data[0].today_value_fifth_hour, chartData.data[0].today_value_sixth_hour, chartData.data[0].today_value_seventh_hour, chartData.data[0].today_value_eight_hour], label: 'Present Day' },
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Previous Day' }
        
      
      ];
      this.lineChartData02=[
        { data: [chartData.data[1].today_value_first_hour, chartData.data[1].today_value_second_hour, chartData.data[1].today_value_thrid_hour, chartData.data[1].today_value_fourth_hour, chartData.data[1].today_value_fifth_hour, chartData.data[1].today_value_sixth_hour, chartData.data[1].today_value_seventh_hour, chartData.data[1].today_value_eight_hour], label: 'Present Day' },
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Previous Day' }
        
      ];
      this.lineChartData03= [
        { data: [chartData.data[2].today_value_first_hour, chartData.data[2].today_value_second_hour, chartData.data[2].today_value_thrid_hour, chartData.data[2].today_value_fourth_hour, chartData.data[2].today_value_fifth_hour, chartData.data[2].today_value_sixth_hour, chartData.data[2].today_value_seventh_hour, chartData.data[2].today_value_eight_hour], label: 'Present Day' },
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Previous Day' }
        
      
      ];
      this.lineChartData04=[
        { data: [chartData.data[3].today_value_first_hour, chartData.data[3].today_value_second_hour, chartData.data[3].today_value_thrid_hour, chartData.data[3].today_value_fourth_hour, chartData.data[3].today_value_fifth_hour, chartData.data[3].today_value_sixth_hour, chartData.data[3].today_value_seventh_hour, chartData.data[3].today_value_eight_hour], label: 'Present Day' },
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Previous Day' }
        
      ];
  
      this.lineChartData05= [
        { data: [chartData.data[4].today_value_first_hour, chartData.data[4].today_value_second_hour, chartData.data[4].today_value_thrid_hour, chartData.data[4].today_value_fourth_hour, chartData.data[4].today_value_fifth_hour, chartData.data[4].today_value_sixth_hour, chartData.data[4].today_value_seventh_hour, chartData.data[4].today_value_eight_hour], label: 'Present Day' },
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Previous Day' }
        
      
      ];
      break;
      case 4:
      this.device01=true;
      this.device02=true;
      this.device03=true;
      this.device04=true;
      this.device05=false;
      this.device06=false;
      this.MacAddress0=chartData.data[0].mac_address;
      this.unit0=chartData.data[0].unit;
      this.MacAddress1=chartData.data[1].mac_address;
      this.unit1=chartData.data[1].unit;
      this.MacAddress2=chartData.data[2].mac_address;
      this.unit2=chartData.data[2].unit;
      this.MacAddress3=chartData.data[3].mac_address;
      this.unit3=chartData.data[3].unit;
      this.lineChartData01= [
        { data: [chartData.data[0].today_value_first_hour, chartData.data[0].today_value_second_hour, chartData.data[0].today_value_thrid_hour, chartData.data[0].today_value_fourth_hour, chartData.data[0].today_value_fifth_hour, chartData.data[0].today_value_sixth_hour, chartData.data[0].today_value_seventh_hour, chartData.data[0].today_value_eight_hour], label: 'Present Day' },
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Previous Day' }
        
      
      ];
      this.lineChartData02=[
        { data: [chartData.data[1].today_value_first_hour, chartData.data[1].today_value_second_hour, chartData.data[1].today_value_thrid_hour, chartData.data[1].today_value_fourth_hour, chartData.data[1].today_value_fifth_hour, chartData.data[1].today_value_sixth_hour, chartData.data[1].today_value_seventh_hour, chartData.data[1].today_value_eight_hour], label: 'Present Day' },
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Previous Day' }
        
      ];
      this.lineChartData03= [
        { data: [chartData.data[2].today_value_first_hour, chartData.data[2].today_value_second_hour, chartData.data[2].today_value_thrid_hour, chartData.data[2].today_value_fourth_hour, chartData.data[2].today_value_fifth_hour, chartData.data[2].today_value_sixth_hour, chartData.data[2].today_value_seventh_hour, chartData.data[2].today_value_eight_hour], label: 'Present Day' },
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Previous Day' }
        
      
      ];
      this.lineChartData04=[
        { data: [chartData.data[3].today_value_first_hour, chartData.data[3].today_value_second_hour, chartData.data[3].today_value_thrid_hour, chartData.data[3].today_value_fourth_hour, chartData.data[3].today_value_fifth_hour, chartData.data[3].today_value_sixth_hour, chartData.data[3].today_value_seventh_hour, chartData.data[3].today_value_eight_hour], label: 'Present Day' },
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Previous Day' }
        
      ];
      break;
      case 3:
      this.device01=true;
      this.device02=true;
      this.device03=true;
      this.device04=false;
      this.device05=false;
      this.device06=false;
      this.MacAddress0=chartData.data[0].mac_address;
      this.unit0=chartData.data[0].unit;
      this.MacAddress1=chartData.data[1].mac_address;
      this.unit1=chartData.data[1].unit;
      this.MacAddress2=chartData.data[2].mac_address;
      this.unit2=chartData.data[2].unit;
      this.lineChartData01= [
        { data: [chartData.data[0].today_value_first_hour, chartData.data[0].today_value_second_hour, chartData.data[0].today_value_thrid_hour, chartData.data[0].today_value_fourth_hour, chartData.data[0].today_value_fifth_hour, chartData.data[0].today_value_sixth_hour, chartData.data[0].today_value_seventh_hour, chartData.data[0].today_value_eight_hour], label: 'Present Day' },
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Previous Day' }
        
      
      ];
      this.lineChartData02=[
        { data: [chartData.data[1].today_value_first_hour, chartData.data[1].today_value_second_hour, chartData.data[1].today_value_thrid_hour, chartData.data[1].today_value_fourth_hour, chartData.data[1].today_value_fifth_hour, chartData.data[1].today_value_sixth_hour, chartData.data[1].today_value_seventh_hour, chartData.data[1].today_value_eight_hour], label: 'Present Day' },
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Previous Day' }
        
      ];
      this.lineChartData03= [
        { data: [chartData.data[2].today_value_first_hour, chartData.data[2].today_value_second_hour, chartData.data[2].today_value_thrid_hour, chartData.data[2].today_value_fourth_hour, chartData.data[2].today_value_fifth_hour, chartData.data[2].today_value_sixth_hour, chartData.data[2].today_value_seventh_hour, chartData.data[2].today_value_eight_hour], label: 'Present Day' },
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Previous Day' }
        
      
      ];
      break;
      case 2:
      this.device01=true;
      this.device02=true;
      this.device03=false;
      this.device04=false;
      this.device05=false;
      this.device06=false;
      this.MacAddress0=chartData.data[0].mac_address;
      this.unit0=chartData.data[0].unit;
      this.MacAddress1=chartData.data[1].mac_address;
      this.unit1=chartData.data[1].unit;
      this.lineChartData01= [
        { data: [chartData.data[0].today_value_first_hour, chartData.data[0].today_value_second_hour, chartData.data[0].today_value_thrid_hour, chartData.data[0].today_value_fourth_hour, chartData.data[0].today_value_fifth_hour, chartData.data[0].today_value_sixth_hour, chartData.data[0].today_value_seventh_hour, chartData.data[0].today_value_eight_hour], label: 'Present Day' },
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Previous Day' }
        
      
      ];
      this.lineChartData02=[
        { data: [chartData.data[1].today_value_first_hour, chartData.data[1].today_value_second_hour, chartData.data[1].today_value_thrid_hour, chartData.data[1].today_value_fourth_hour, chartData.data[1].today_value_fifth_hour, chartData.data[1].today_value_sixth_hour, chartData.data[1].today_value_seventh_hour, chartData.data[1].today_value_eight_hour], label: 'Previous Day' },
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Previous Day' }
        
      ];
      break;
      case 1:
      this.device01=true;
      this.device02=false;
      this.device03=false;
      this.device04=false;
      this.device05=false;
      this.device06=false;
      this.MacAddress0=chartData.data[0].mac_address;
      this.unit0=chartData.data[0].unit;
      this.lineChartData01= [
        { data: [chartData.data[0].today_value_first_hour, chartData.data[0].today_value_second_hour, chartData.data[0].today_value_thrid_hour, chartData.data[0].today_value_fourth_hour, chartData.data[0].today_value_fifth_hour, chartData.data[0].today_value_sixth_hour, chartData.data[0].today_value_seventh_hour, chartData.data[0].today_value_eight_hour], label: 'Present Day' },
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Previous Day' }
        
      ];
      break;
      case 0:
      //this.diviceStatus=true;
      this.device01=false;
      this.device02=false;
      this.device03=false;
      this.device04=false;
      this.device05=false;
      this.device06=false;
      this.MacAddress0="Not set";
      this.unit0=0;
      this.MacAddress1="Not set";
      this.unit1=0;
      this.MacAddress2="Not set";
      this.unit2=0;
      this.MacAddress3="Not set";
      this.unit3=0;
      this.MacAddress4="Not set";
      this.unit4=0;
      this.MacAddress5="Not set";
      this.unit5=0;
      this.lineChartData01=[
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Present Day' },
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Previous Day' }
        
      ];
      this.lineChartData02=[
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Present Day' },
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Previous Day' }
        
      ];
      this.lineChartData03=[
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Present Day' },
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Previous Day' }
        
      ];
      this.lineChartData04=[
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Present Day' },
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Previous Day' }
        
      ];
      this.lineChartData05=[
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Present Day' },
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Previous Day' }
        
      ];
      this.lineChartData06=[
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Present Day' },
        { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Previous Day' }
        
      ];
      default:
      break;

    }
  }else{
    this.diviceStatus=true;
  }
  });

  if(!localStorage.getItem('firstDateTime')){
    this.strtupFuntion();
   }
  }
 










setPreviousData(){
  localStorage.setItem('previosDay',this.currentDay);

  for (var i = 0; i < this.currentDayData.data.length; i++) {
    
   let obj={
      
      today_value_first_hour:this.currentDayData.data[i].today_value_first_hour,
      today_value_second_hour:this.currentDayData.data[i].today_value_second_hour,
      today_value_thrid_hour:this.currentDayData.data[i].today_value_thrid_hour,
      today_value_fourth_hour:this.currentDayData.data[i].today_value_fourth_hour,
      today_value_fifth_hour:this.currentDayData.data[i].today_value_fifth_hour,
      today_value_sixth_hour:this.currentDayData.data[i].today_value_sixth_hour,
      today_value_seventh_hour:this.currentDayData.data[i].today_value_seventh_hour,
      today_value_eight_hour:this.currentDayData.data[i].today_value_eight_hour,
      admin_id:this.currentDayData.data[i].admin_id,
      component_id:this.currentDayData.data[i].component_id,
      day:this.currentDay
    }
    this.IotDetailsService.setCurrentValuesForSet(obj).then(details => {
      
    });
    
    
  }
 


}




  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }
}




