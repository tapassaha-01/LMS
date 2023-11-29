import { Component, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddLeaveBalance } from 'src/app/models/add-leave-balance';
import { LeaveSummaryService } from 'src/app/services/leave-summary.service';

@Component({
  selector: 'app-addleave',
  templateUrl: './addleave.component.html',
  styleUrls: ['./addleave.component.css']
})
export class AddleaveComponent {
  addleavebalance:AddLeaveBalance={}
  privilegeLeave:number=0
  casualLeave:number=0
  floatingleave:number=0
  constructor(@Inject(MAT_DIALOG_DATA) public dataf: string,private leaveservice :LeaveSummaryService,private router:Router)
  {
    console.log(dataf)
  }

  ngOnInit()
  {
    this.addleavebalance.empId=this.dataf
  }

  onSubmit()
  {
   
    
   
    this.addleavebalance.totalCL=this.casualLeave
    this.addleavebalance.totalFL=this.floatingleave
    this.addleavebalance.totalPL=this.privilegeLeave
    console.log(this.addleavebalance)
     
    this.leaveservice.postAddLeaveByAdmin(this.addleavebalance).subscribe(
      (response: string) => {
       
        if (response  === 'LeaveSummary updated successfully') {
         
          this.router.navigate(['../leaveDetail']);
          console.log('Navigating to leaveDetail');
        } else {
         
          console.error('Error updating LeaveSummary:', response);
        }
      },
      (error: any) => {
       
        console.error('HTTP Error:', error);
      }
    );
   
  }
  closeDialog(){
    
  }
 
}
