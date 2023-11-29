import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { map } from 'rxjs';
import { LeavePolicy } from 'src/app/models/leave-policy';
import { AuthonticationService } from 'src/app/shared/authontication.service';
import { CommonServiceService } from 'src/app/shared/common-service.service';
import { saveAs } from 'file-saver';
import { asBlob } from 'html-docx-js-typescript';
import { LeavePolicyService } from 'src/app/services/leave-policy.service';

@Component({
  selector: 'app-policy-details',
  templateUrl: './policy-details.component.html',
  styleUrls: ['./policy-details.component.css'],
})
export class PolicyDetailsComponent {
  leavePolicyForm!: FormGroup;
  public Editor = ClassicEditor;
  policy!: any;
  HTMLcontent: any;
  hide_content: any;
  isDisable:boolean=true;
  isAdmin: boolean = true;
  isCreateOrEdit: boolean = false;
  isContent:boolean=false
  isView:boolean=true
  counter:number = 0
  isDownload:boolean=false


  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private leavePolicyService: LeavePolicyService,
    public authService: AuthonticationService,
    private commonService: CommonServiceService
  ) {
    this.route.paramMap
      .pipe(map(() => window.history.state))
      .subscribe((state: LeavePolicy) => {
        if (state != null) {
        
          this.policy = state; // Assign the data to your component property
          console.log(this.policy);
          if (this.policy.content == null) {
            this.isView=false
            this.isCreateOrEdit = true;
            this.isDownload = true
          }
          else{
            
            this.isView = true
          }
        }
      });

    console.log(this.policy);
  }
  ngOnInit() {
    this.leavePolicyForm = this.fb.group({
      policyType: ['', Validators.required],
      subType: ['', Validators.required],
      content: ['', Validators.required],
    });
    this.commonService.breadcrumbEmitter.emit({
      bcName: 'Home',
      bcCurrent: false,
      bcRouterLink: '/',
      bcChild: {
        bcName: 'Policy',
        bcCurrent: false,
        bcRouterLink: '/policy',
        bcChild: {
          bcName: 'Policy Details',
          bcCurrent: true,
          bcRouterLink: '/policyDetails',
        },
      },
    });
    this.commonService.pageHeadingEmitter.emit(
      this.policy.policyType + ' - ' + ' Policy Details'
    );
    this.leavePolicyForm.get('policyType')?.setValue(this.policy.policyType);
    this.leavePolicyForm.get('subType')?.setValue(this.policy.subType);
    this.leavePolicyForm.get('content')?.setValue(this.policy.content);
    
    this.leavePolicyForm.get('content')?.valueChanges.subscribe((e: string) => {
      this.counter++;
      if(this.counter>=1){
        this.isDisable=false
        this.isDownload=false
      }
    });

  }

  onEditOrCreate() {
    this.isContent = true
  }
  onSave() {
    if (this.leavePolicyForm.value.content != '') {
      console.log(this.leavePolicyForm.get('content'))
      this.leavePolicyService
        .uploadPolicyDetails(this.leavePolicyForm.value)
        .subscribe((e) => {
          console.log('leavePolicy uploaded!!');
          console.log(e);
        });
    }
  }
  onCancel() {
    this.isContent = false
  }
  async downloadAsTextFile() {
    const filename = 'downloaded-text.docx';
    var converted = (await asBlob(this.leavePolicyForm.get('content')?.value, {
      orientation: 'landscape',
      margins: { top: 720 },
    })) as Blob;
    saveAs(converted, filename);
  }
}
