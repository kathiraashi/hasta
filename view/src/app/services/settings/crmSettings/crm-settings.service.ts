import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LoginService } from './../../LoginService/login.service';

const API_URL = 'http://localhost:4000/API/CRM_Settings/';
const Live_API_URL = 'http://159.89.163.252:4000/API/CRM_Settings/';

@Injectable({
   providedIn: 'root'
})
export class CrmSettingsService {

   headers;
   constructor(private http: Http, private Service: LoginService) {
      this.headers = new Headers();
   }

   ValidateEveryRequest() {
      let Message = JSON.stringify({Status: false, Message: 'Your Login Expired! Please Login Again'});
      if (sessionStorage.getItem('Token') && sessionStorage.getItem('SessionKey') && sessionStorage.getItem('SessionToken') ) {
         const LastSession = new Date(atob(sessionStorage.getItem('SessionKey'))).getTime();
         const NowSession = new Date().getTime();
         const SessionDiff: number = NowSession - LastSession;
         const SessionDiffMinutes: number = SessionDiff / 1000 / 60 ;
         if (SessionDiffMinutes >= 20 ) {
            Message = JSON.stringify({Status: false, Message: 'Your Session Expired! Please Login Again'});
            sessionStorage.clear();
         }
      }
      return Observable.create(observer => {
         const Response = {status: 401, _body: Message };
         observer.next(Response);
         observer.complete();
      });
   }

   // Industry Type
      public IndustryType_AsyncValidate(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'IndustryType_AsyncValidate', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Industry_Type_Create(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Industry_Type_Create', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Industry_Type_List(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Industry_Type_List', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Industry_Type_SimpleList(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Industry_Type_SimpleList', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Industry_Type_Update(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Industry_Type_Update', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Industry_Type_Delete(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Industry_Type_Delete', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }


   // Ownership Type
      public OwnershipType_AsyncValidate(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'OwnershipType_AsyncValidate', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Ownership_Type_Create(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Ownership_Type_Create', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Ownership_Type_List(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Ownership_Type_List', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Ownership_Type_SimpleList(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Ownership_Type_SimpleList', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Ownership_Type_Update(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Ownership_Type_Update', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Ownership_Type_Delete(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Ownership_Type_Delete', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }


   // Activity Type
      public ActivityType_AsyncValidate(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'ActivityType_AsyncValidate', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Activity_Type_Create(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Activity_Type_Create', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Activity_Type_List(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Activity_Type_List', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Activity_Type_SimpleList(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Activity_Type_SimpleList', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Activity_Type_Update(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Activity_Type_Update', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Activity_Type_Delete(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Activity_Type_Delete', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }


   // Activity Status
      public ActivityStatus_AsyncValidate(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'ActivityStatus_AsyncValidate', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Activity_Status_Create(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Activity_Status_Create', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Activity_Status_List(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Activity_Status_List', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Activity_Status_SimpleList(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Activity_Status_SimpleList', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Activity_Status_Update(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Activity_Status_Update', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Activity_Status_Delete(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Activity_Status_Delete', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }


   // Activity Priority
      public ActivityPriority_AsyncValidate(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'ActivityPriority_AsyncValidate', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         }  else {
            return this.ValidateEveryRequest();
         }
      }
      public Activity_Priority_Create(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Activity_Priority_Create', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         }  else {
            return this.ValidateEveryRequest();
         }
      }
      public Activity_Priority_List(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Activity_Priority_List', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
         }  else {
            return this.ValidateEveryRequest();
         }
      }
      public Activity_Priority_SimpleList(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Activity_Priority_SimpleList', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         }  else {
            return this.ValidateEveryRequest();
         }
      }
      public Activity_Priority_Update(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Activity_Priority_Update', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
         }  else {
            return this.ValidateEveryRequest();
         }
      }
      public Activity_Priority_Delete(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Activity_Priority_Delete', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         }  else {
            return this.ValidateEveryRequest();
         }
      }


   // Contact Role
      public ContactRole_AsyncValidate(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'ContactRole_AsyncValidate', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Contact_Role_Create(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Contact_Role_Create', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Contact_Role_List(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Contact_Role_List', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Contact_Role_SimpleList(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Contact_Role_SimpleList', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Contact_Role_Update(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Contact_Role_Update', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Contact_Role_Delete(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Contact_Role_Delete', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }


   // Machine Type
      public MachineType_AsyncValidate(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'MachineType_AsyncValidate', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Machine_Type_Create(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Machine_Type_Create', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Machine_Type_List(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Machine_Type_List', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Machine_Type_SimpleList(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Machine_Type_SimpleList', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Machine_Type_Update(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Machine_Type_Update', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Machine_Type_Delete(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Machine_Type_Delete', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }


   // Controller Type
      public ControllerType_AsyncValidate(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'ControllerType_AsyncValidate', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Controller_Type_Create(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Controller_Type_Create', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Controller_Type_List(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Controller_Type_List', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Controller_Type_SimpleList(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Controller_Type_SimpleList', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Controller_Type_Update(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Controller_Type_Update', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Controller_Type_Delete(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Controller_Type_Delete', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }


   // Machine Maintenance Part
      public MachineMaintenancePart_AsyncValidate(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'MachineMaintenancePart_AsyncValidate', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public MachineMaintenancePart_Create(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'MachineMaintenancePart_Create', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public MachineMaintenancePart_List(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'MachineMaintenancePart_List', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public MachineMaintenancePart_SimpleList(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'MachineMaintenancePart_SimpleList', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public MachineMaintenancePart_Update(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'MachineMaintenancePart_Update', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public MachineMaintenancePart_Delete(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'MachineMaintenancePart_Delete', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }


   // Machine Schedule Activity
      public MachineScheduleActivity_AsyncValidate(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'MachineScheduleActivity_AsyncValidate', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public MachineScheduleActivity_Create(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'MachineScheduleActivity_Create', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public MachineScheduleActivity_List(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'MachineScheduleActivity_List', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public MachineScheduleActivity_SimpleList(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'MachineScheduleActivity_SimpleList', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public MachineScheduleActivity_Update(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'MachineScheduleActivity_Update', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public MachineScheduleActivity_Delete(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'MachineScheduleActivity_Delete', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }


   // Ticket Type
      public TicketType_AsyncValidate(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'TicketType_AsyncValidate', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Ticket_Type_Create(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Ticket_Type_Create', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Ticket_Type_List(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Ticket_Type_List', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Ticket_Type_SimpleList(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Ticket_Type_SimpleList', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Ticket_Type_Update(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Ticket_Type_Update', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }
      public Ticket_Type_Delete(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
            return this.http.post(API_URL + 'Ticket_Type_Delete', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
         } else {
            return this.ValidateEveryRequest();
         }
      }

}
