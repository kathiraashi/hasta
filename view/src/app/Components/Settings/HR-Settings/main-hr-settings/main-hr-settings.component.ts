import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-hr-settings',
  templateUrl: './main-hr-settings.component.html',
  styleUrls: ['./main-hr-settings.component.css']
})
export class MainHrSettingsComponent implements OnInit {
   Active_Tab = 'Department';
   constructor() { }

   ngOnInit() {
   }
   Active_Tab_Change(name) {
      this.Active_Tab = name;
   }
}
