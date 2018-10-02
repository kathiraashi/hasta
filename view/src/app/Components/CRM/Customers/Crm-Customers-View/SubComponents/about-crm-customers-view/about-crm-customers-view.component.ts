import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-about-crm-customers-view',
  templateUrl: './about-crm-customers-view.component.html',
  styleUrls: ['./about-crm-customers-view.component.css']
})
export class AboutCrmCustomersViewComponent implements OnInit {

   @Input() CustomerData: Object;

   constructor() { }

   ngOnInit() {}

}
