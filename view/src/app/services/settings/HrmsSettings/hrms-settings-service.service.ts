import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LoginService } from './../../LoginService/login.service';

const API_URL = 'http://localhost:4000/API/Hrms_Settings/';
const Live_API_URL = 'http://159.89.163.252:4000/API/Hrms_Settings/';

@Injectable({
  providedIn: 'root'
})
export class HrmsSettingsServiceService {

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

  // Leave Type
   public LeaveType_AsyncValidate(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
         sessionStorage.setItem('SessionKey', btoa(Date()));
      return this.http.post(API_URL + 'LeaveType_AsyncValidate', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
   } else {
      return this.ValidateEveryRequest();
   }
   }
   public Leave_Type_Create(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
         sessionStorage.setItem('SessionKey', btoa(Date()));
      return this.http.post(API_URL + 'Leave_Type_Create', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
   } else {
      return this.ValidateEveryRequest();
   }
   }
   public Leave_Type_List(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
         sessionStorage.setItem('SessionKey', btoa(Date()));
      return this.http.post(API_URL + 'Leave_Type_List', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
   } else {
      return this.ValidateEveryRequest();
   }
   }
   public Leave_Type_SimpleList(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
         sessionStorage.setItem('SessionKey', btoa(Date()));
      return this.http.post(API_URL + 'Leave_Type_SimpleList', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
   } else {
      return this.ValidateEveryRequest();
   }
   }
   public Leave_Type_Update(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
         sessionStorage.setItem('SessionKey', btoa(Date()));
      return this.http.post(API_URL + 'Leave_Type_Update', Info, {headers: this.headers }).pipe( map(response => response), catchError(error => of(error)));
   } else {
      return this.ValidateEveryRequest();
   }
   }
   public Leave_Type_Delete(Info: any): Observable<any[]> {
      if (this.Service.If_LoggedIn()) {
         this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
         sessionStorage.setItem('SessionKey', btoa(Date()));
      return this.http.post(API_URL + 'Leave_Type_Delete', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
   } else {
      return this.ValidateEveryRequest();
   }
   }
}
