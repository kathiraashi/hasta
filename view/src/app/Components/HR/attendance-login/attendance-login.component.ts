import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import {NativeDateAdapter} from '@angular/material';
import {DateAdapter} from '@angular/material/core';
export class MyDateAdapter extends NativeDateAdapter {
   format(date: Date, displayFormat: Object): string {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
   }
}

import * as CryptoJS from 'crypto-js';

import { AttendanceService } from './../../../services/Hr/Attendance/attendance.service';

@Component({
  selector: 'app-attendance-login',
  templateUrl: './attendance-login.component.html',
  styleUrls: ['./attendance-login.component.css'],
  providers: [{provide: DateAdapter, useClass: MyDateAdapter}],
})
export class AttendanceLoginComponent implements OnInit {

   Form: FormGroup;
   Data;
   Data_Type;
   Stage = 'Stage_1';
   MinDate = null;
   MaxDate = new Date();
   MinTime: string;

   constructor(
      private router: Router,
      private service: AttendanceService
   ) { }

   ngOnInit() {
      this.Form = new FormGroup({
         Employee_Code: new FormControl('', Validators.required),
         Employee_Id: new FormControl(''),
         Attendance_Id: new FormControl(''),
         InOrOut: new FormControl(''),
         Date: new FormControl(''),
         Time: new FormControl(''),
      });
   }

   NotAllow(): boolean {return false; }

   MinTimeCalculate(value) {
      if (value === '12:00 am') {
         return null;
      } else {
         const Dummy = new Date('01/01/2000 ' + value );
         Dummy.setMinutes(Dummy.getMinutes() + 1);
         let hours = Dummy.getHours();
         const minutes = Dummy.getMinutes();
         const AmPm = hours >= 12 ? 'pm' : 'am';
         hours = hours % 12;
         hours = hours ? hours : 12; // the hour '0' should be '12'
         const strTime = ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2) + ' ' + AmPm;
         return strTime;
      }
   }

   DateChange(value) {
      if (this.Data_Type === 'Old') {
         const DetectDate = new Date(value.setHours(0, 0, 0, 0 )).getTime();
         const GetMinDate = new Date(new Date(this.Data['Attendance_InDate']).setHours(0, 0, 0, 0 )).getTime();
         const MinTimeValue = this.Data['Attendance_InTime'];
         if (DetectDate > GetMinDate ) {
            this.MinTime = null;
         } else {
            this.Form.controls['Time'].setValue(this.MinTimeCalculate(MinTimeValue));
            this.MinTime = this.MinTimeCalculate(MinTimeValue);
         }
      } else {
         this.MinTime = null;
      }

   }

   submit() {
      if (this.Stage === 'Stage_1' && this.Form.valid) {
         const Data = {Employee_Code: this.Form.controls['Employee_Code'].value};
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.service.EmployeeCode_Validate({'Info': Info}).subscribe( response => {
            const ReceivingData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ReceivingData.Status) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this.Data = DecryptedData;
               this.Data_Type = ReceivingData['Type'];
               if (ReceivingData['Type'] === 'New') {
                  this.Form.controls['Employee_Id'].setValue(DecryptedData['_id']);
               } else {
                  if (ReceivingData['Type'] === 'Old') {
                     this.MinDate = new Date(this.Data['Attendance_InDate']);
                     const Today = new Date(new Date().setHours(0, 0, 0, 0 )).getTime();
                     const GetMinDate = new Date(new Date(this.Data['Attendance_InDate']).setHours(0, 0, 0, 0 )).getTime();
                     const MinTimeValue = this.Data['Attendance_InTime'];
                     if (Today > GetMinDate ) {
                        this.MinTime = null;
                     } else {
                        this.Form.controls['Time'].setValue(this.MinTimeCalculate(MinTimeValue));
                        this.MinTime = this.MinTimeCalculate(MinTimeValue);
                     }
                     this.Form.controls['Employee_Id'].setValue(DecryptedData['Employee']['_id']);
                     this.Form.controls['Attendance_Id'].setValue(DecryptedData['_id']);
                     this.Form.controls['Attendance_Id'].setValidators(Validators.required);
                  }
               }
               this.Form.controls['Employee_Id'].setValidators(Validators.required);
               this.Form.controls['InOrOut'].setValue(ReceivingData['Type']);
               this.Form.controls['InOrOut'].setValidators(Validators.required);
               this.Form.controls['Date'].setValidators(Validators.required);
               this.Form.controls['Time'].setValidators(Validators.required);
               this.Stage = 'Stage_2';
            } else {
               alert('Some Error Occurred!');
            }
         });
      }
      function formatDate(date) {
         const d = new Date(date);
         let month = '' + (d.getMonth() + 1);
         let day = '' + d.getDate();
         const year = d.getFullYear();
         if (month.length < 2) { month = '0' + month; }
         if (day.length < 2) { day = '0' + day; }
         return [year, month, day].join('-');
      }
      function convertTime12to24(time12h) {
         if (time12h !== null && time12h !== '') {
            const [time, modifier] = time12h.split(' ');
            const newTime = time.split(':');
            if (newTime[0] === '12') { newTime[0] = '00'; }
            if (modifier === 'pm') { newTime[0] = parseInt(newTime[0], 10) + 12; }
            return newTime[0] + ':' + newTime[1] + ':00';
         } else {
            return '00:00:00';
         }
      }
      if (this.Stage === 'Stage_2' &&  this.Form.valid) {

         this.Form.controls['Time'].setValue(this.Form.controls['Time'].value.toLowerCase());
         const StartDate = this.Form.controls['Date'].value;
         const StartTime = this.Form.controls['Time'].value;
         this.Form.controls['Date'].setValue(new Date(formatDate(StartDate) + ' ' + convertTime12to24(StartTime)));

         const Data = this.Form.value;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         if (this.Data_Type === 'New') {
            this.service.Attendance_Create({'Info': Info}).subscribe( response => {
               const ReceivingData = JSON.parse(response['_body']);
               if (response['status'] === 200 && ReceivingData.Status) {
                  alert(ReceivingData['Message']);
                  this.CompleteReset();
               } else {
                  alert('Some Error Occurred!');
               }
            });
         } else {
            if (this.Data_Type === 'Old') {
               this.service.Attendance_Update({'Info': Info}).subscribe( response => {
                  const ReceivingData = JSON.parse(response['_body']);
                  if (response['status'] === 200 && ReceivingData.Status) {
                     alert(ReceivingData['Message']);
                     this.CompleteReset();
                  } else {
                     alert('Some Error Occurred!');
                  }
               });
            }
         }
      }
   }

   CompleteReset() {
      this.Stage = 'Stage_1';
      this.Data_Type = undefined;
      this.Data = undefined;
      this.Form.controls['InOrOut'].setValidators(null);
      this.Form.controls['Date'].setValidators(null);
      this.Form.controls['Time'].setValidators(null);
      this.Form.controls['Employee_Id'].setValidators(null);
      this.Form.controls['Attendance_Id'].setValidators(null);
      this.Form.updateValueAndValidity();
      this.Form.reset();
   }


}
