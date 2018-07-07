import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelCompanyinfoCompanysettingsComponent } from '../../../../../models/settings/company_settings/model-companyinfo-companysettings/model-companyinfo-companysettings.component';


@Component({
  selector: 'app-company-info-company-settings',
  templateUrl: './company-info-company-settings.component.html',
  styleUrls: ['./company-info-company-settings.component.css']
})
export class CompanyInfoCompanySettingsComponent implements OnInit {
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }
  modelcompanyinfo() {
    const initialState = {
      title: 'Modal with component'
    };
    this.bsModalRef = this.modalService.show(ModelCompanyinfoCompanysettingsComponent, Object.assign({initialState}, { class: 'modal-lg max-width-75' }));
  }

}
