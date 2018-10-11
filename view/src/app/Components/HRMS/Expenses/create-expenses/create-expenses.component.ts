import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import * as CryptoJS from 'crypto-js';

import { LoginService } from './../../../../services/LoginService/login.service';
import { HrService } from './../../../../services/Hr/hr.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';
import { HrmsServiceService } from './../../../../services/Hrms/hrms-service.service';
import { HrmsSettingsServiceService } from './../../../../services/settings/HrmsSettings/hrms-settings-service.service';

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

@Component({
  selector: 'app-create-expenses',
  templateUrl: './create-expenses.component.html',
  styleUrls: ['./create-expenses.component.css']
})
export class CreateExpensesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
