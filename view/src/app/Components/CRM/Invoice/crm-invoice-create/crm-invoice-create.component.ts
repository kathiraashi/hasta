import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crm-invoice-create',
  templateUrl: './crm-invoice-create.component.html',
  styleUrls: ['./crm-invoice-create.component.css']
})
export class CrmInvoiceCreateComponent implements OnInit {
  Active_Tab = 'Product_Details';
  constructor() { }

  ngOnInit() {
  }
  Active_Tab_Change(name) {
    this.Active_Tab = name;
  }
}
