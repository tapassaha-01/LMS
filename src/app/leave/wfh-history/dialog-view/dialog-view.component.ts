import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WfhRequest } from 'src/app/models/wfh-request';
import { LeaveRequestService } from 'src/app/services/leave-request.service';
import { WfhRequestService } from 'src/app/services/wfh-request.service';

@Component({
  selector: 'app-dialog-view',
  templateUrl: './dialog-view.component.html',
  styleUrls: ['./dialog-view.component.css']
})
export class DialogViewComponent {
  wfhRequest: WfhRequest = {

  };
  printLeave!:string
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataf: string,
    public wfhReqServ: WfhRequestService) {
  }

  ngOnInit() {
    console.log(this.dataf)
    this.wfhReqServ.getLeaveRequestById(this.dataf).subscribe(
      data => {
        this.wfhRequest = data
      });
  }
  getFormattedDates(): string {
    if(this.wfhRequest.applicationDate!==undefined)
    {
      return this.wfhRequest.applicationDate.join('\n');
    }
    else{
      return ''
    }
    
  }
  leaveReason():string{
    if(this.wfhRequest.applicationReason!=undefined)
    {
      return this.wfhRequest.applicationReason
    }
    else{
      return ''
    }
    
  }
}
