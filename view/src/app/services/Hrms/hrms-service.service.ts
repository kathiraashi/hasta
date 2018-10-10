import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LoginService } from './../LoginService/login.service';

const API_URL = 'http://localhost:4000/API/Hrms/';
const Live_API_URL = 'http://159.89.163.252:4000/API/Hrms/';

@Injectable({
  providedIn: 'root'
})
export class HrmsServiceService {

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
   // Leaves
      public OnDuty_Create(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'OnDuty_Create', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
      }  else {
         return this.ValidateEveryRequest();
      }
      }
      public OnDuty_List(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'OnDuty_List', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
      }  else {
         return this.ValidateEveryRequest();
      }
      }
      public OnDuty_Update(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'OnDuty_Update', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
      }  else {
         return this.ValidateEveryRequest();
      }
      }

      // On Duty
      public Leaves_Create(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Leaves_Create', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
      }  else {
         return this.ValidateEveryRequest();
      }
      }
      public Leaves_List(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Leaves_List', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
      }  else {
         return this.ValidateEveryRequest();
      }
      }
      public Leaves_Update(Info: any): Observable<any[]> {
         if (this.Service.If_LoggedIn()) {
            this.headers.set('Authorization', atob(sessionStorage.getItem('SessionToken')));
            sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Leaves_Update', Info, {headers: this.headers }).pipe( map(response => response),  catchError(error => of(error)));
      }  else {
         return this.ValidateEveryRequest();
      }
      }
}

