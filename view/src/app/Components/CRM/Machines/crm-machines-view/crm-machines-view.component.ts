import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';

import * as CryptoJS from 'crypto-js';

import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';
import { CrmService } from './../../../../services/Crm/crm.service';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { ModelTicketsCreateComponent } from '../../../../models/CRM/Machines/model-tickets-create/model-tickets-create.component';
import { DeleteConfirmationComponent } from '../../../../Components/Common-Components/delete-confirmation/delete-confirmation.component';
import { ModelScheduleActivityCreateComponent } from '../../../../models/CRM/Machines/model-schedule-activity-create/model-schedule-activity-create.component';
import { ModelMachineWorkingComponent } from '../../../../models/CRM/Machines/model-machine-working/model-machine-working.component';
import { LoginService } from './../../../../services/LoginService/login.service';

@Component({
  selector: 'app-crm-machines-view',
  templateUrl: './crm-machines-view.component.html',
  styleUrls: ['./crm-machines-view.component.css']
})
export class CrmMachinesViewComponent implements OnInit {

   Active_Tab = 'Tickets';

   User_Id;

   Today = new Date();
   Loader: Boolean = true;
   _Data = {};
   Machine_Id;
   _TicketsList: any[] = [];
   _MaintenanceList: any[] = [];
   _ScheduleList: any[] = [];
   _WorkingList: any[] = [];

   bsModalRef: BsModalRef;

   DisableBtn: Boolean = false;

   MaintenanceForm: FormGroup;
   EachMaintenance;

   constructor(
               private modalService: BsModalService,
               private Toastr: ToastrService,
               public Crm_Service: CrmService,
               public router: Router,
               private active_route: ActivatedRoute,
               private Form_Builder: FormBuilder,
               public Login_Service: LoginService,
            ) {
               this.User_Id = this.Login_Service.LoginUser_Info()['_id'];
               this.active_route.url.subscribe((u) => {
                  this.Machine_Id = this.active_route.snapshot.params['Machine_Id'];
                  const Data = { 'Machine_Id': this.Machine_Id, 'User_Id' : this.User_Id };
                  let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
                  Info = Info.toString();
                  this.Crm_Service.CrmMachine_View({ 'Info': Info }).subscribe( response => {
                     const ResponseData = JSON.parse(response['_body']);
                     this.Loader = false;
                     if (response['status'] === 200 && ResponseData['Status'] ) {
                        const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                        const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                        this._Data = DecryptedData;
                        console.log(this._Data);
                     } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                        this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
                     } else if (response['status'] === 401 && !ResponseData['Status']) {
                        this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
                     } else {
                        this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Machine Details Getting Error!, But not Identify!' });
                     }
                  });
                  this.Crm_Service.CrmMachineBasedTickets_List({ 'Info': Info }).subscribe( response => {
                     const ResponseData = JSON.parse(response['_body']);
                     this.Loader = false;
                     if (response['status'] === 200 && ResponseData['Status'] ) {
                        const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                        const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                        this._TicketsList = DecryptedData;
                     } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                        this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
                     } else if (response['status'] === 401 && !ResponseData['Status']) {
                        this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
                     } else {
                        this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Machine Ticket Data Getting Error!, But not Identify!' });
                     }
                  });
                  this.Crm_Service.CrmMachine_MaintenanceSchedule_Today({ 'Info': Info }).subscribe( response => {
                     const ResponseData = JSON.parse(response['_body']);
                     this.Loader = false;
                     if (response['status'] === 200 && ResponseData['Status'] ) {
                        const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                        const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                        this._MaintenanceList = DecryptedData;
                        this._MaintenanceList.map(obj => {
                           this.AddMaintenanceRow(obj);
                           return obj;
                        });
                     } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                        this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
                     } else if (response['status'] === 401 && !ResponseData['Status']) {
                        this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
                     } else {
                        this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Machine Maintenance Data Getting Error!, But not Identify!' });
                     }
                  });
                  this.Crm_Service.CrmMachine_ScheduleActivity_List({ 'Info': Info }).subscribe( response => {
                     const ResponseData = JSON.parse(response['_body']);
                     this.Loader = false;
                     if (response['status'] === 200 && ResponseData['Status'] ) {
                        const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                        const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                        this._ScheduleList = DecryptedData;
                     } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                        this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
                     } else if (response['status'] === 401 && !ResponseData['Status']) {
                        this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
                     } else {
                        this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Machine Schedule Data Getting Error!, But not Identify!' });
                     }
                  });
                  this.Crm_Service.CrmMachine_WorkingHours_List({ 'Info': Info }).subscribe( response => {
                     const ResponseData = JSON.parse(response['_body']);
                     this.Loader = false;
                     if (response['status'] === 200 && ResponseData['Status'] ) {
                        const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                        const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                        this._WorkingList = DecryptedData;
                     } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                        this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
                     } else if (response['status'] === 401 && !ResponseData['Status']) {
                        this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
                     } else {
                        this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Machine Working Data Getting Error!, But not Identify!' });
                     }
                  });
               });
              }

   ngOnInit() {
      this.MaintenanceForm = new FormGroup({
         EachMaintenance: this.Form_Builder.array([]),
         User_Id: new FormControl(this.User_Id),
         Update_Person: new FormControl('')
       });
   }

   AddMaintenanceRow(_Value): void {
      let NewForm: FormGroup;
      this.EachMaintenance = this.MaintenanceForm.get('EachMaintenance') as FormArray;
      NewForm = new FormGroup({
                  _id: new FormControl(_Value['_id'], Validators.required),
                  MachineMaintenancePart: new FormControl(_Value['MachineMaintenancePart']['Part_Name']),
                  Status: new FormControl(_Value['Status']),
                  Description: new FormControl(_Value['Description'])
               });
      if (_Value['If_Updated']) {
         this.DisableBtn = true;
         NewForm.get('Status').disable();
         NewForm.get('Description').disable();
         this.MaintenanceForm.controls['Update_Person'].setValue(_Value['Updated_By']);
         this.MaintenanceForm.controls['Update_Person'].disable();
      }
      this.EachMaintenance.push(NewForm);
   }

   Active_Tab_Change(name) {
      this.Active_Tab = name;
   }

   CreateTickets() {
      const initialState = {
         Type: 'Create'
      };
      this.bsModalRef = this.modalService.show(ModelTicketsCreateComponent, Object.assign({initialState}, { class: 'modal-lg' }));
   }

   Submit() {
      if (this.MaintenanceForm.valid && !this.DisableBtn) {
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.MaintenanceForm.value), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Crm_Service.CrmMachine_MaintenanceSchedule_UpdateToday({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               this.MaintenanceForm.disable();
               this.DisableBtn = true;
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: 'Machine Maintenance Schedule Updated' });
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Maintenance Schedule Updated Error!, But not Identify!' });
            }
         });
      }
   }

   // ********************************* Schedule ***************************************
   CreateSchedule() {
      const initialState = {
         _Data: { Type: 'Create', Machine_Id: this.Machine_Id, Schedule_Info: {} }
      };
      this.bsModalRef = this.modalService.show(ModelScheduleActivityCreateComponent, Object.assign({initialState}, { ignoreBackdropClick: true,  class: 'modal-lg' }));
      this.bsModalRef.content.onClose.subscribe(response => {
         if (response['Status']) {
            this._ScheduleList.splice(0, 0, response['Response']);
         }
      });
   }
   ViewSchedule(_index) {
      const initialState = {
         _Data: { Type: 'View', Machine_Id: this.Machine_Id, Schedule_Info: this._ScheduleList[_index] }
      };
      this.bsModalRef = this.modalService.show(ModelScheduleActivityCreateComponent, Object.assign({initialState}, { ignoreBackdropClick: true,  class: 'modal-lg' }));
   }
   ReSchedule(_index) {
      const initialState = {
         _Data: { Type: 'ReSchedule', Machine_Id: this.Machine_Id, Schedule_Info: this._ScheduleList[_index]  }
      };
      this.bsModalRef = this.modalService.show(ModelScheduleActivityCreateComponent, Object.assign({initialState}, { ignoreBackdropClick: true,  class: 'modal-lg' }));
      this.bsModalRef.content.onClose.subscribe(response => {
         if (response['Status']) {
            this._ScheduleList[_index] = response['Response'];
         }
      });
   }
   EditSchedule(_index) {
      const initialState = {
         _Data: { Type: 'Edit', Machine_Id: this.Machine_Id, Schedule_Info: this._ScheduleList[_index] }
      };
      this.bsModalRef = this.modalService.show(ModelScheduleActivityCreateComponent, Object.assign({initialState}, { ignoreBackdropClick: true,  class: 'modal-lg' }));
      this.bsModalRef.content.onClose.subscribe(response => {
         if (response['Status']) {
            this._ScheduleList[_index] = response['Response'];
         }
      });
   }
   DeleteSchedule(_index) {
      const initialState = { Text: 'Machine Schedule Activity' };
      this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, {ignoreBackdropClick: true, class: 'modal-sm' }));
      this.bsModalRef.content.onClose.subscribe(response => {
         if (response.Status) {
            const Data = { 'Schedule_Id' : this._ScheduleList[_index]._id, 'User_Id' : this.User_Id };
            let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
            Info = Info.toString();
            this.Crm_Service.CrmMachine_ScheduleActivity_Delete({'Info': Info}).subscribe( returnResponse => {
               const ResponseData = JSON.parse(returnResponse['_body']);
               if (returnResponse['status'] === 200 && ResponseData['Status'] ) {
                  this._ScheduleList.splice(_index, 1);
                  this.Toastr.NewToastrMessage( { Type: 'Warning', Message: 'Machine Schedule Activity Successfully Deleted'} );
               } else if (returnResponse['status'] === 400 || returnResponse['status'] === 417 && !ResponseData['Status']) {
                  this.Toastr.NewToastrMessage( { Type: 'Error', Message: ResponseData['Message'] } );
               } else if (returnResponse['status'] === 401 && !ResponseData['Status']) {
                  this.Toastr.NewToastrMessage( { Type: 'Error', Message: ResponseData['Message'] } );
               } else {
                  this.Toastr.NewToastrMessage( { Type: 'Error', Message: 'Some Error Occurred!, But not Identify!' } );
               }
            });
         }
      });
   }




   // ********************************* Working ***************************************
   CreateWorking() {
      const initialState = {
         _Data: { Type: 'Create', Machine_Id: this.Machine_Id, Last_Working_Info: this._WorkingList[0], MachinePlacedDate: this._Data['DateOfPlaced']}
      };
      this.bsModalRef = this.modalService.show(ModelMachineWorkingComponent, Object.assign({initialState}, { ignoreBackdropClick: true,  class: 'modal-lg' }));
      this.bsModalRef.content.onClose.subscribe(response => {
         if (response['Status']) {
            this._WorkingList.splice(0, 0, response['Response']);
            this._Data['Current_Status'] = 'Up';
         }
      });
   }

   UpdateWorking(_index) {
      const initialState = {
         _Data: { Type: 'Edit', Machine_Id: this.Machine_Id, Working_Info: this._WorkingList[_index]  }
      };
      this.bsModalRef = this.modalService.show(ModelMachineWorkingComponent, Object.assign({initialState}, { ignoreBackdropClick: true,  class: 'modal-lg' }));
      this.bsModalRef.content.onClose.subscribe(response => {
         if (response['Status']) {
            this._Data['Current_Status'] = 'Idle';
            this._WorkingList[_index] = response['Response'];
         }
      });
   }

}
