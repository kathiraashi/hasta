import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-employees',
  templateUrl: './create-employees.component.html',
  styleUrls: ['./create-employees.component.css']
})
export class CreateEmployeesComponent implements OnInit {
   Active_Tab = 'personal_info';
   constructor() { }

   ngOnInit() {
   }
   Active_Tab_Change(name) {
      this.Active_Tab = name;
   }
}
