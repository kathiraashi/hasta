import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-payments-create',
  templateUrl: './customer-payments-create.component.html',
  styleUrls: ['./customer-payments-create.component.css']
})
export class CustomerPaymentsCreateComponent implements OnInit {
Active_Tab = 'Bank';
  constructor() { }

  ngOnInit() {
  }
Active_Tab_Change(name) {
  this.Active_Tab = name;
}
}
