import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-crm-customers-view',
  templateUrl: './main-crm-customers-view.component.html',
  styleUrls: ['./main-crm-customers-view.component.css']
})
export class MainCrmCustomersViewComponent implements OnInit {

  Active_Tab = 'About';
  constructor() { }

  ngOnInit() {
  }
Active_Tab_Change(name) {
  this.Active_Tab = name;
}
}
