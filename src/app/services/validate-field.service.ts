import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstant } from '../app-constant';

@Injectable({
  providedIn: 'root'
})
export class ValidateFieldService {

  constructor(private http: HttpClient) { }

  validateEmpid(empid: string, recordId: string): Observable<boolean> {
    const url = `${AppConstant.GET_CHECK_EMPLOYEE_ID}/${empid}/${recordId}`;
    return this.http.get<boolean>(url);
  }

  validateUserName(userName: string, recordId: string) {
    const url = `${AppConstant.GET_CHECK_USERNAME}/${userName}/${recordId}`;
    return this.http.get<boolean>(url);
  }

  validateEmail(email: string, recordId: string) {
    const url = `${AppConstant.GET_CHECK_EMAIL}/${email}/${recordId}`;
    return this.http.get<boolean>(url);
  }




}
