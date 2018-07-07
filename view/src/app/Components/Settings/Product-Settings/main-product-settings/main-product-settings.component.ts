import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-product-settings',
  templateUrl: './main-product-settings.component.html',
  styleUrls: ['./main-product-settings.component.css']
})
export class MainProductSettingsComponent implements OnInit {
Active_Tab = 'Configuration';
  constructor() { }

  ngOnInit() {
  }
Active_Tab_Change(name) {
  this.Active_Tab = name;
}
}
