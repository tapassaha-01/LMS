import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MaternityLeaveRequest } from '../models/maternity-leave-request';
import { Observable } from 'rxjs';
import { AppConstant } from '../app-constant';
import { WfhRequest } from '../models/wfh-request';
import { FileMetaData } from '../models/file-meta-data';

@Injectable({
  providedIn: 'root'
})
export class MaternityServiceService {
 
  constructor(private httpClient:HttpClient) { }

  getListOfFileMetaData(id: any) {
    let formdata = new FormData();
    formdata.append('entityId',id);
    return this.httpClient.post<FileMetaData[]>(AppConstant.POST_FILEMETADATA_WFH,formdata);
  }
 
  downloadDocument(fileId: string):Observable<any> {
    let formdata = new FormData();
    formdata.append('fileId',fileId);
    return this.httpClient.post<any>(AppConstant.POST_FILEDATA_WFH,formdata,{responseType: 'blob' as 'json'});
  }


  applyLeave(draftLeaveReq: MaternityLeaveRequest): Observable<any> {
    return this.httpClient.post<MaternityLeaveRequest>(AppConstant.POST_APPLY_MATERNITY, draftLeaveReq);
  }

  applyWFH(data:any): Observable<any>
  {
    console.log(data)
      return this.httpClient.post<any>(AppConstant.POST_APPLY_WFH,data)   
  }

  uploadAttcahement(file:File[],data:string,id:string)
  {
    const formdata = new FormData();
    for (let i = 0; i < file.length; i++) {
      formdata.append('file', file[i]);
    }
    formdata.append('data',JSON.stringify(data));
    formdata.append('EntityId',id);
    console.log(formdata.get('data'))
    // formdata.append('entityType',type);
    return this.httpClient.post<any>(AppConstant.POST_MATERNITY_APPLY,formdata);
  }
 

  getLeaveRequestsByEmpId(empId:string,isValid:boolean)
  {
    console.log(empId)
    return this.httpClient.get<MaternityLeaveRequest[]>(AppConstant.LIST_MATERNITY_SUMMARY+`/${empId}`+`?isValid=${isValid}`)
  }

  getLeaveRequestById(id: string): Observable<MaternityLeaveRequest> {
    const url = AppConstant.GET_MATERNITYLEAVE_REQUESTS_BY_ID + `/${id}`;
    return this.httpClient.get<MaternityLeaveRequest>(url);
  }

  getLeaveDurationText(leaveDuration: string) {
    if (leaveDuration === '1.00' && leaveDuration!=null) {
      return "Full Day";
    } else if (leaveDuration === '0.50') {
      return "Half Day";
    } else if (leaveDuration === '0.25') {
      return "2 HR";
    } else {
      return leaveDuration;
    }
  }

  getLeaveTypeText(leaveType: string) {
    if (leaveType === 'PL') {
      return "Privilege Leave";
    } else if (leaveType === 'CL') {
      return "Casual Leave";
    } else if (leaveType === 'FL') {
      return "Floating Leave";
    } else if (leaveType === 'WFH' && leaveType!=null){
      return "Work from Home";
    }
    else{
      return leaveType;
    }
  }

  submitCancelRequest(draftCancelReq: MaternityLeaveRequest): Observable<MaternityLeaveRequest> {
    return this.httpClient.post<MaternityLeaveRequest>(AppConstant.POST_SUBMIT_CANCEL_MATERNITY_LEAVE, draftCancelReq);
  }

  getLeaveRequestByCurrentAssignee(managerId: string) {
    const url = AppConstant.GET_MATERNITYLEAVE_REQUESTS_BY_MANAGER_WFH + `/${managerId}`;
    return this.httpClient.get<MaternityLeaveRequest[]>(url);
  }

  approveLeave(leaveRequest: MaternityLeaveRequest): Observable<any> {
    return this.httpClient.post<any>(AppConstant.POST_APPROVE_LEAVE_MATERNITY, leaveRequest);
  }

  getNumberOfLeaveTakenBymonth(empId:string):Observable<number[]>
  {
    
    return this.httpClient.get<number[]>(AppConstant.GET_MATERNITYLEAVE_TAKEN_BY_MONTH+`/${empId}`);
  }



}
