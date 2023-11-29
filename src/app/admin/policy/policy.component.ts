import { Component, Inject } from '@angular/core';
import { CommonServiceService } from 'src/app/shared/common-service.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { saveAs } from 'file-saver';
import { asBlob } from 'html-docx-js-typescript';
// import * as htmlDocx from 'html-docx-js';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { LeavePolicyService } from 'src/app/services/leave-policy.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LeavePolicy } from 'src/app/models/leave-policy';
import { Router } from '@angular/router';
@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css'],
})
export class PolicyComponent {
  htmlContent!: string;
  isAdmin: boolean = true;
  counter: number = 0;
  on_view: boolean = true;
  on_Edit: boolean = true;
  on_policy:boolean = false;
  on_content: boolean = true;
  on_CreateOrEdit: boolean = false;
  is_disabled: boolean = true;
  hide_content: boolean = false;
  on_save:boolean= true

  public Editor = ClassicEditor;
  leavePolicyForm!: FormGroup;
  data: { e: LeavePolicy; } | undefined;

  constructor(
    private fb: FormBuilder,
    private commonService: CommonServiceService,
    private leavePolicyService: LeavePolicyService,
    private router: Router
  ) {}
  policyTypeLst: string[] = ['Leave-Policy', 'HR-policy', 'Employee-Policy'];

  leaveTypeLst: string[] = ['CL', 'PL', 'FL'];
  ngOnInit() {
    this.commonService.breadcrumbEmitter.emit({
      bcName: "Home",
      bcCurrent: false,
      bcRouterLink: "/",
      bcChild: {
        bcName: "Policy",
        bcCurrent: true,
        bcRouterLink: ""
      }
    });
    this.commonService.pageHeadingEmitter.emit("Policy Details");

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
        bcCurrent: true,
        bcRouterLink: '/policy',
      },
    });
    this.commonService.pageHeadingEmitter.emit('Policy');
    // this.loadDetails();

  }

 

  onView() {
    this.on_view = this.on_view == true ? false : true;
    this.hide_content = this.hide_content == false ? true :false
    const content = document.getElementById('content');

    this.leavePolicyService.getPolicyDetails(this.leavePolicyForm.value).subscribe((e) => {
        console.log(e);
        if(e==null){
        this.leavePolicyForm.get('content')?.setValue(null)}
        else{
          this.leavePolicyForm.get('content')?.setValue(e.content)
        }
        
        this.router.navigate(['/policyDetails'], { state:  this.leavePolicyForm.value });
        
      });
      
      
    // }
  }

}
