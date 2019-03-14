import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild, Renderer } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { ModelIndustrytypeCrmsettingsComponent } from '../../../../../models/settings/crm_settings/model-industrytype-crmsettings/model-industrytype-crmsettings.component';
import { DeleteConfirmationComponent } from '../../../../Common-Components/delete-confirmation/delete-confirmation.component';

import { CrmSettingsService } from './../../../../../services/settings/crmSettings/crm-settings.service';
import { ToastrService } from './../../../../../services/common-services/toastr-service/toastr.service';
import * as CryptoJS from 'crypto-js';
import { LoginService } from './../../../../../services/LoginService/login.service';

@Component({
  selector: 'app-industry-type-crm-settings',
  templateUrl: './industry-type-crm-settings.component.html',
  styleUrls: ['./industry-type-crm-settings.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class IndustryTypeCrmSettingsComponent implements OnInit {

   @ViewChild('TableSection') TableSection: ElementRef;
   @ViewChild('TableHeaderSection') TableHeaderSection: ElementRef;
   @ViewChild('TableBodySection') TableBodySection: ElementRef;
   @ViewChild('TableFooterSection') TableFooterSection: ElementRef;
   @ViewChild('TableLoaderSection') TableLoaderSection: ElementRef;

   bsModalRef: BsModalRef;

   Loader: Boolean = true;
   _List: any[] = [];
   User_Id;

   // Pagination Keys
      Current_Index = 1;
      Skip_Count = 0;
      Limit_Count = 10;
      Showing_Text = 'Showing <span>0</span> to <span>0</span> out of <span>0</span> entries';
      Pages_Array = [];
      Total_Rows = 0;
      New_Rows = 0;
      Last_Creation: Date = new Date();
      Page_Previous: Object = { Disabled: true, value : 0, Class: 'PagePrev_Disabled'};
      Page_Next: Object = { Disabled: true, value : 0, Class: 'PageNext_Disabled'};
      SubLoader: Boolean = false;


   constructor(   private modalService: BsModalService,
                  private Service: CrmSettingsService,
                  private Toastr: ToastrService,
                  public Login_Service: LoginService,
                  private renderer: Renderer,
                  private el: ElementRef
               ) {
                  this.User_Id = this.Login_Service.LoginUser_Info()['_id'];
                  this.Service_Loader();
               }

   ngOnInit() {
   }

   Service_Loader() {
      // Get Industry Type List
         const Data = { 'User_Id' : this.User_Id,
                        'Skip_Count': this.Skip_Count,
                        'Limit_Count': this.Limit_Count,
                        'Last_Creation' : this.Last_Creation };
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Service.Industry_Type_List({'Info': Info}).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            this.Loader = false;
            this.renderer.setElementStyle(this.TableLoaderSection.nativeElement, 'display', 'none');
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               const SubCryptoBytes  = CryptoJS.AES.decrypt(ResponseData['SubResponse'], 'SecretKeyOut@123');
               const SubDecryptedData = JSON.parse(SubCryptoBytes.toString(CryptoJS.enc.Utf8));
               this._List = DecryptedData;
               this.Total_Rows = SubDecryptedData['Total_Datas'];
               this.New_Rows = SubDecryptedData['New_Datas'];
               this.Pagination_Affect();
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Industry Type List Getting Error!, But not Identify!' });
            }
         });
   }

   Pagination_Affect() {
      const NoOfArrays = Math.ceil(this.Total_Rows / this.Limit_Count);
      const Prev_Class = (this.Current_Index > 1 ? 'PagePrev_Enabled' : 'PagePrev_Disabled');
      this.Page_Previous = { Disabled: !(this.Current_Index > 1), Value : (this.Current_Index - 1), Class: Prev_Class};
      const Next_Class = (this.Current_Index < NoOfArrays ? 'PageNext_Enabled' : 'PageNext_Disabled');
      this.Page_Next = { Disabled: !(this.Current_Index < NoOfArrays), Value : (this.Current_Index + 1), Class: Next_Class};
      this.Pages_Array = [];
      for (let index = 1; index <= NoOfArrays ; index++) {
         if (index === 1) {
            this.Pages_Array.push({Text: '1', Class: 'Number', Value: 1, Show: true, Active: (this.Current_Index === index ) });
         }
         if (index > 1 && NoOfArrays > 2 && index < NoOfArrays ) {
            if (index === (this.Current_Index - 2)) {
               this.Pages_Array.push({Text: '...', Class: 'Dots', Show: true, Active: false });
            }
            if (index === (this.Current_Index - 1) ) {
               this.Pages_Array.push({Text: (this.Current_Index - 1).toString(), Class: 'Number',  Value: index, Show: true, Active: false });
            }
            if (index === this.Current_Index) {
               this.Pages_Array.push({Text: this.Current_Index.toString(), Class: 'Number', Value: index, Show: true, Active: true });
            }
            if (index === (this.Current_Index + 1) ) {
               this.Pages_Array.push({Text: (this.Current_Index + 1).toString(), Class: 'Number', Value: index, Show: true, Active: false });
            }
            if (index === (this.Current_Index + 2)) {
               this.Pages_Array.push({Text: '...', Class: 'Dots', Show: true, Active: false });
            }
         }
         if (index === NoOfArrays && NoOfArrays > 1) {
            this.Pages_Array.push({Text: NoOfArrays.toString(), Class: 'Number', Value: NoOfArrays, Show: true, Active: (this.Current_Index === index ) });
         }
      }
      let To_Count = this.Skip_Count + this.Limit_Count;
      if (To_Count > this.Total_Rows) { To_Count = this.Total_Rows; }
      this.Showing_Text = 'Showing <span>' + this.Skip_Count + '</span> to <span>' + To_Count + '</span> out of <span>' + this.Total_Rows + '</span>  entries';
   }

   Short_Change(Num) {
      if (this.Limit_Count !== Num) {
         this.Limit_Count = Num;
         this.Pagination_Action(1);
      }
   }
   Pagination_Action(_index) {
      this.Current_Index = _index;
      this.Skip_Count = this.Limit_Count * (this.Current_Index - 1);
      this.Service_Loader();
      setTimeout(() => {
         const Top = this.TableHeaderSection.nativeElement.offsetHeight + 2;
         const Height = this.TableBodySection.nativeElement.offsetHeight - 1;
         this.renderer.setElementStyle(this.TableLoaderSection.nativeElement, 'display', 'block');
         this.renderer.setElementStyle(this.TableLoaderSection.nativeElement, 'height', Height + 'px');
         this.renderer.setElementStyle(this.TableLoaderSection.nativeElement, 'line-height', Height + 'px');
         this.renderer.setElementStyle(this.TableLoaderSection.nativeElement, 'top', Top + 'px');
      }, 10);
   }


   // Create New Industry Type
      CreateIndustrytype() {
         const initialState = { Type: 'Create' };
         this.bsModalRef = this.modalService.show(ModelIndustrytypeCrmsettingsComponent, Object.assign({initialState}, {ignoreBackdropClick: true, class: '' }));
         this.bsModalRef.content.onClose.subscribe(response => {
            if (response['Status']) {
              this._List.splice(0, 0, response['Response']);
            }
         });
      }
   // Edit Industry Type
      EditIndustrytype(_index) {
         const initialState = {
            Type: 'Edit',
            Data: this._List[_index]
         };
         this.bsModalRef = this.modalService.show(ModelIndustrytypeCrmsettingsComponent, Object.assign({initialState}, {ignoreBackdropClick: true, class: '' }));
         this.bsModalRef.content.onClose.subscribe(response => {
            if (response['Status']) {
               this._List[_index] = response['Response'];
            }
         });
      }
   // View Industry Type
      ViewIndustrytype(_index) {
         const initialState = { Type: 'View', Data: this._List[_index] };
         this.bsModalRef = this.modalService.show(ModelIndustrytypeCrmsettingsComponent, Object.assign({initialState}, { class: '' }));
      }
   // Delete Industry Type
      DeleteIndustryType(_index) {
         const initialState = { Text: 'Industry Type' };
         this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, {ignoreBackdropClick: true, class: 'modal-sm' }));
         this.bsModalRef.content.onClose.subscribe(response => {
            if (response.Status) {
               const Data = { 'Industry_Type_Id' :  this._List[_index]._id, 'Modified_By' : this.User_Id };
               let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
               Info = Info.toString();
               this.Service.Industry_Type_Delete({'Info': Info}).subscribe( returnResponse => {
                  const ResponseData = JSON.parse(returnResponse['_body']);
                  if (returnResponse['status'] === 200 && ResponseData['Status'] ) {
                     this._List.splice(_index, 1);
                     this.Toastr.NewToastrMessage( { Type: 'Warning', Message: 'Industry Type Successfully Deleted'} );
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
}
