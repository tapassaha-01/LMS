import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeDetails } from '../models/employee-details.model';
import { AppConstant } from '../app-constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailsService {

  constructor(private httpClient: HttpClient) { }


  saveEmployee(draftEmployee: EmployeeDetails): Observable<EmployeeDetails> {
    return this.httpClient.post<EmployeeDetails>(AppConstant.POST_SAVE_EMPLOYEE, draftEmployee);
  }

  updateEmployeeDetails(data: EmployeeDetails): Observable<EmployeeDetails> {
    return this.httpClient.post(AppConstant.POST_UPDATE_EMPLOYEE, data);
  }

  fetchAllEmployee(): Observable<EmployeeDetails[]> {
    return this.httpClient.get<EmployeeDetails[]>(AppConstant.GET_ALL_EMPLOYEE);
  }

  getAllManager(): Observable<EmployeeDetails[]> {
    return this.httpClient.get<EmployeeDetails[]>(AppConstant.GET_FETCH_ACTIVE_MANAGERS);
  }


}
