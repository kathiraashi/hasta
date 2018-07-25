import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-payroll-master-create',
  templateUrl: './payroll-master-create.component.html',
  styleUrls: ['./payroll-master-create.component.css']
})
export class PayrollMasterCreateComponent implements OnInit {
Active_Tab = 'Leaves';
  constructor() { }

  ngOnInit() {
  }
Active_Tab_Change(name) {
  this.Active_Tab = name;
}
}
