import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LeaveRequestService } from 'src/app/services/leave-request.service';
import { LeaveRequest } from 'src/app/models/leave-request.model';

@Component({
  selector: 'app-dialogue-view',
  templateUrl: './dialogue-view.component.html',
  styleUrls: ['./dialogue-view.component.css']
})
export class DialogueViewComponent {

  leaveRequest: LeaveRequest = {
    leaveType: "",
    leaveDuration: "",
    leaveDate: [],
    approvedrejectReason:''

  };
  printLeave!:string
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataf: string,
    public leaveReqServ: LeaveRequestService) {
  }

  ngOnInit() {
    this.leaveReqServ.getLeaveRequestById(this.dataf).subscribe(
      data => {
        this.leaveRequest = data
      });
  }
  getFormattedDates(): string {
    if(this.leaveRequest.leaveDate!==undefined)
    {
      return this.leaveRequest.leaveDate.join('\n');
    }
    else{
      return ''
    }
    
  }
  leaveReason():string{
    if(this.leaveRequest.leaveReason!=undefined)
    {
      return this.leaveRequest.leaveReason
    }
    else{
      return ''
    }
    
  }
 
}
