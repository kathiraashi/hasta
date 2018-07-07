import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendor-payments-create',
  templateUrl: './vendor-payments-create.component.html',
  styleUrls: ['./vendor-payments-create.component.css']
})
export class VendorPaymentsCreateComponent implements OnInit {
Active_Tab = 'Bank';
  constructor() { }

  ngOnInit() {
  }
Active_Tab_Change(name) {
  this.Active_Tab = name;
}
}
