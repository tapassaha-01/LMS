import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstant } from '../app-constant';
import { LeaveSummary } from '../models/leave-summary.model';
import { Observable } from 'rxjs';
import { LeaveSummryDetail } from '../models/leave-summry-detail';
import { AddLeaveBalance } from '../models/add-leave-balance';
import { IndividualPNDandAPR } from '../models/individual-pndand-apr';

@Injectable({
  providedIn: 'root'
})
export class LeaveSummaryService {

  constructor(private httpClient: HttpClient) { }


  getLeaveSummaryForLoggedUser(): Observable<LeaveSummary> {
    return this.httpClient.get<LeaveSummary>(AppConstant.GET_LEAVE_SUMMARY_BY_LOGGED_USER);
  }
  getDetailLeaveSummry(data1:number,data2:number): Observable<LeaveSummryDetail[]> {
    return this.httpClient.get<LeaveSummryDetail[]>(AppConstant.GET_LEAVE_SUMMARY_FOR_APPLIED_LEAVE+`/${data1}`+`/${data2}`);
  }
  getIndividualDetailLeaveSummry(data1:number,data2:number,data3:string): Observable<LeaveSummryDetail[]> {
    return this.httpClient.get<LeaveSummryDetail[]>(AppConstant.GET_INDIVIDUAL_LEAVE_SUMMARY_FOR_APPLIED_LEAVE+`/${data1}`+`/${data2}`+`/${data3}`);
  }
  postAddLeaveByAdmin(addleave:AddLeaveBalance):Observable<any>
  {
    return this.httpClient.post(AppConstant.ADD_LEAVE, addleave, { responseType: 'text' });
  }
  individualLeaveHistoryPNDandAPR(data1:string)
  {
    return this.httpClient.get<IndividualPNDandAPR[]>(AppConstant.GET_INDIVIDUAL_APR_PND_LEAVE+`/${data1}`);
  }
  

  

}
