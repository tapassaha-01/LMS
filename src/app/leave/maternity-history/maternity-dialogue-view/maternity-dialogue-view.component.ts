import { Component, Inject } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaternityLeaveRequest } from 'src/app/models/maternity-leave-request';
import { MaternityServiceService } from 'src/app/services/maternity-service.service';

@Component({
  selector: 'app-maternity-dialogue-view',
  templateUrl: './maternity-dialogue-view.component.html',
  styleUrls: ['./maternity-dialogue-view.component.css']
})
export class MaternityDialogueViewComponent {

  maternityRequest!:MaternityLeaveRequest

  constructor(@Inject(MAT_DIALOG_DATA)public dataf:string,public maternityservice:MaternityServiceService)
  {

  }

  ngOnInit() {
    console.log(this.dataf)
    this.maternityservice.getLeaveRequestById(this.dataf).subscribe(
      (      data: MaternityLeaveRequest) => {
        this.maternityRequest = data
      });
  }

  getFormattedDates(): string {
    if(this.maternityRequest.leaveDate!==undefined)
    {
      return this.maternityRequest.leaveDate.join('\n');
    }
    else{
      return ''
    }
    
  }
  leaveReason():string{
    if(this.maternityRequest.leaveReason!=undefined)
    {
      return this.maternityRequest.leaveReason
    }
    else{
      return ''
    }
    
  }



}
