import { Component, Input,Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LeavePolicy } from 'src/app/models/leave-policy';
import { LeavePolicyService } from 'src/app/services/leave-policy.service';
@Component({
  selector: 'app-info-details',
  templateUrl: './info-details.component.html',
  styleUrls: ['./info-details.component.css']
})
export class InfoDetailsComponent {
  // editor!: Editor ;
  // infoData: any;
  policy_data:string=''
  Nodata:boolean=false
  constructor( @Inject(MAT_DIALOG_DATA) public dataf: string,private leavePolicyService:LeavePolicyService){}



  ngOnInit(){
    // this.infoData = this.dataf;
    // console.log("inside infodetails")
    this.loadDetails()
    // this.editor = new Editor();
    // console.log(this.htmlContent)
  }
  loadDetails(){
    const policyTyp = "Leave-Policy"
    const content = document.getElementById("floating-content")
    const heading = document.getElementById("heading")
    const data = {
      policyType:policyTyp,
      subType:this.dataf
    }
    this.leavePolicyService.getPolicyDetails(data).subscribe((response: LeavePolicy) => {
      // console.log(response.content)

      if (content && response && response.content && response.subType) {
        this.Nodata = false
        content.innerHTML = response.content;
    
        // You can also update the heading if needed
        if (heading) {
          heading.innerHTML = response.subType; // replace "heading" with the actual property you want to use
        }
      }
      // heading.innerHTML = response.subTyp
      if(response==null){
       this.Nodata = true
      }
      
    },
    (error) => {
      console.error('Error:', error);
    });
  // ngOnDestroy(): void {
  //   this.editor.destroy();
  }

}
