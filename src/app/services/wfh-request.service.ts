import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstant } from '../app-constant';
import { Observable } from 'rxjs';
import { WfhRequest } from '../models/wfh-request';
import { FileMetaData } from '../models/file-meta-data';

@Injectable({
  providedIn: 'root'
})
export class WfhRequestService {
  
 

  constructor(private httpClient: HttpClient) { }

  getLeaveRequestById(id: string): Observable<any> {
    const url = AppConstant.GET_WFH_REQUESTS_BY_ID + `/${id}`;
    return this.httpClient.get<any>(url);
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
    return this.httpClient.post<any>(AppConstant.POST_WFH_APPLY,formdata);
  }

  getLeaveRequestByCurrentAssignee(managerId: string) {
    const url = AppConstant.GET_LEAVE_REQUESTS_BY_MANAGER_WFH + `/${managerId}`;
    return this.httpClient.get<WfhRequest[]>(url);
  }

  getLeaveRequestsByEmpId(empId:string,isValid:boolean)
  {
    console.log(empId)
    return this.httpClient.get<WfhRequest[]>(AppConstant.LIST_WFH_SUMMARY+`/${empId}`+`?isValid=${isValid}`)
  }

  approveLeave(leaveRequest: WfhRequest): Observable<any> {
    return this.httpClient.post<any>(AppConstant.POST_APPROVE_LEAVE_WFH, leaveRequest);
  }

  submitCancelRequest(draftCancelReq: WfhRequest): Observable<WfhRequest> {
    return this.httpClient.post<WfhRequest>(AppConstant.POST_SUBMIT_CANCEL_WFH, draftCancelReq);
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

  getListOfFileMetaData(id: string):Observable<FileMetaData[]> {
    let formdata = new FormData();
    formdata.append('entityId',id);
    return this.httpClient.post<FileMetaData[]>(AppConstant.POST_FILEMETADATA_WFH,formdata);
  }

  downloadDocument(fileId: string):Observable<any> {
    let formdata = new FormData();
    formdata.append('fileId',fileId);
    return this.httpClient.post<any>(AppConstant.POST_FILEDATA_WFH,formdata,{responseType: 'blob' as 'json'});
  }
  
}
