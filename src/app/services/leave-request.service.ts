import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, } from '@angular/common/http';
import { AppConstant } from '../app-constant';
import { LeaveRequest } from '../models/leave-request.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveRequestService {

  constructor(private httpClient: HttpClient) { }

  getLeaveRequestById(id: string): Observable<LeaveRequest> {
    const url = AppConstant.GET_LEAVE_REQUESTS_BY_ID + `/${id}`;
    return this.httpClient.get<LeaveRequest>(url);
  }

  getLeaveRequestsByEmpId(empId: string, isValid : boolean): Observable<LeaveRequest[]> {
    const url = AppConstant.GET_LEAVE_REQUESTS_BY_EMP_ID + `/${empId}`+`?isValid=${isValid}`;
    return this.httpClient.get<LeaveRequest[]>(url);
  }

  getLeaveRequestByCurrentAssignee(managerId: string) {
    const url = AppConstant.GET_LEAVE_REQUESTS_BY_MANAGER + `/${managerId}`;
    return this.httpClient.get<LeaveRequest[]>(url);
  }

  approveLeave(leaveRequest: LeaveRequest): Observable<any> {
    return this.httpClient.post<any>(AppConstant.POST_APPROVE_LEAVE, leaveRequest);
  }

  applyWFH(file:File[],data:any){
    const formdata = new FormData();
    for (let i = 0; i < file.length; i++) {
      formdata.append('file', file[i]);
    }
    formdata.append('data',JSON.stringify(data));
    console.log(formdata.get('data'))
    // formdata.append('entityType',type);
    return this.httpClient.post<any>(AppConstant.POST_WFH_APPLY,formdata);
  }

  applyLeave(draftLeaveReq: LeaveRequest): Observable<LeaveRequest> {
    return this.httpClient.post<LeaveRequest>(AppConstant.POST_APPLY_LEAVE, draftLeaveReq);
  }

  submitCancelRequest(draftCancelReq: LeaveRequest): Observable<LeaveRequest> {
    return this.httpClient.post<LeaveRequest>(AppConstant.POST_SUBMIT_CANCEL_LEAVE, draftCancelReq);
  }

  getLeaveTypeText(leaveType: string) {
    if (leaveType === 'PL') {
      return "Privilege Leave";
    } else if (leaveType === 'CL') {
      return "Casual Leave";
    } else if (leaveType === 'FL') {
      return "Floating Leave";
    } else {
      return leaveType;
    }
  }

  getLeaveDurationText(leaveDuration: string) {
    if (leaveDuration === '1.00') {
      return "Full Day";
    } else if (leaveDuration === '0.50') {
      return "Half Day";
    } else if (leaveDuration === '0.25') {
      return "2 HR";
    } else {
      return leaveDuration;
    }
  }

  getNumberOfLeaveTakenBymonth(empId:string):Observable<number[]>
  {
    
    return this.httpClient.get<number[]>(AppConstant.GET_LEAVE_TAKEN_BY_MONTH+`/${empId}`);
  }

  downloadDocument(empId: string):void {
    this.httpClient.get(AppConstant.GET_DOCUMENT_DOWNLOAD + `/${empId}`).subscribe(
      (response: any) => {
        console.log(response)
        let customFilename = response.filename
    
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob([response.file], { type: 'application/pdf' }));
        downloadLink.setAttribute('download', customFilename); // Set the desired filename
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }
    );
    }    

}
