import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstant } from '../app-constant';
import { LeavePolicy } from '../models/leave-policy';
import { PolicyComponent } from '../admin/policy/policy.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeavePolicyService {

  constructor(private httpClient: HttpClient) { }

uploadPolicyDetails(policyDetails:LeavePolicy){
    
    console.log(policyDetails);
   
    return this.httpClient.post(AppConstant.POST_LEAVE_POLICY_DETAILS,
      policyDetails, { responseType: 'text' });
  }
  
  getPolicyDetails(data:any): Observable<LeavePolicy>{
   
    // if(data.policyType!=undefined && data.subType!=undefined) 
    let formData = data.policyType + " " + data.subType
// formData = data

console.log(formData)
return this.httpClient.get<LeavePolicy>(AppConstant.GET_LEAVE_POLICY_DETAILS+`?data=${formData}`)
  }
}
