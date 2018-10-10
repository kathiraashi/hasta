import { Component, OnInit } from '@angular/core';

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
  selector: 'app-create-on-duty',
  templateUrl: './create-on-duty.component.html',
  styleUrls: ['./create-on-duty.component.css'],
  providers: [{provide: DateAdapter, useClass: MyDateAdapter}]
})
export class CreateOnDutyComponent implements OnInit {
   _Name: any[] =  ['Employee-1', 'Employee-2', 'Employee-3'];

  constructor() { }

  ngOnInit() {
  }

}
