import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatCalendar, MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { HolidayMaster } from 'src/app/models/holiday-master.model';
import { LeaveRequest } from 'src/app/models/leave-request.model';
import { LeaveSummary } from 'src/app/models/leave-summary.model';
import { PendingleaveDialogComponent } from 'src/app/pendingleave-dialog/pendingleave-dialog.component';
import { HolidayMasterService } from 'src/app/services/holiday-master.service';
import { LeaveRequestService } from 'src/app/services/leave-request.service';
import { LeaveSummaryService } from 'src/app/services/leave-summary.service';
import { AuthonticationService } from 'src/app/shared/authontication.service';
import { CommonServiceService } from 'src/app/shared/common-service.service';
import Swal from 'sweetalert2';
import { LeaveRequestInput } from '../apply-leave/apply-leave.component';
import { DataSource } from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PolicydialogComponent } from './policydialog/policydialog.component';
import { MaternityLeaveRequest } from 'src/app/models/maternity-leave-request';
import { MaternityServiceService } from 'src/app/services/maternity-service.service';

const ELEMENT_DATA: LeaveRequestInput[] = [];

@Component({
  selector: 'app-maternity-leave',
  templateUrl: './maternity-leave.component.html',
  styleUrls: ['./maternity-leave.component.css']
})
export class MaternityLeaveComponent {
  maternityform:FormGroup
  range:FormGroup
  files: any[] = [];
  isDisabled:boolean=true

  constructor(
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private authService: AuthonticationService,
    private leaveSummaryService: LeaveSummaryService,
    public leaveRequestService: MaternityServiceService,
    private holidayMasterService: HolidayMasterService,
    private commonService: CommonServiceService,
    private datePipe: DatePipe,
    private formgrp:FormBuilder
  ) {

    this.maternityform=formgrp.group({
      leaveType:['Maternity Leave'],
      leaveDuration:['Full Day'],
      noOfChild:[''],
      expectedDeliveryDate:[''],
      leaveDate: [[]],
      leaveReason:[''],
      // workDuration:['']
    })

  //  this.maternityform.get('leaveduration')?.setValue("Full Day")

    this.range = formgrp.group({
      'start': new FormControl<Date | null>(null),
      'end': new FormControl<Date | null>(null),
    });
    
   }

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  
 

  @ViewChild(MatCalendar) private calendar?: MatCalendar<Date>;


  // leaveRequestInp: MaternityLeaveRequest = {  
  // };
  selectedDates: string[] = [];
  date_Pipe = new DatePipe('en-GB');

  ngOnInit() {
    this.isDisabled = true

    console.log(this.range.get('start')?.value)
    console.log(this.range.get('end')?.value)
    this.commonService.breadcrumbEmitter.emit({
      bcName: 'Home',
      bcCurrent: false,
      bcRouterLink: '/',
      bcChild: {
        bcName: 'Maternity Leave',
        bcCurrent: true,
        bcRouterLink: '/maternityleave',
      },
    });
    this.commonService.pageHeadingEmitter.emit('Maternity Leave');
  }
  onSubmit() {
    this.generateDatesBetween()
  //  console.log(this.leaveRequestInp)
    this.maternityform.get('leaveDuration')?.setValue(1.0)
     if(this.maternityform.value.expectedDeliveryDate!=null && this.maternityform.value.expectedDeliveryDate!=undefined)
     {
      const date1=this.date_Pipe.transform((this.maternityform.value.expectedDeliveryDate), 'yyyy-MM-dd');
      console.log(date1)
       this.maternityform.get('expectedDeliveryDate')?.setValue(date1)
     }
    console.log(this.maternityform.value)
   
    this.leaveRequestService.applyLeave(this.maternityform.value).subscribe(data => {
        console.log(data)
      this.leaveRequestService.uploadAttcahement(this.files,this.maternityform.value,data.id).subscribe((data)=>{
        console.log(data)
      })
      },
      (error: any) => {
        // Swal.fire({
        //   title: 'Failed!',
        //   text: 'Ohooo...Sorry. Some error.....',
        //   icon: 'error',
        //   confirmButtonText: 'OK',
        // });
        throw error;
      }
    );
  }

  onCancel() {
   
    location.reload();
  }

  openSnackBar() {
    Swal.fire({
      title: 'Applied Successfully!',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {
      location.reload(); // Reload the page
    });
  }

  showPendingDialog() {
    this.dialog.open(PendingleaveDialogComponent, {
      disableClose: true,
    });
  }

   


  openPolicyDialog() {
     const dayValue = this.date_Pipe.transform(this.range.get('start')?.value, 'yyyy-MM-dd');
    console.log(dayValue)
    this.dialog.open(PolicydialogComponent, {
      width: 'auto',
      height: 'auto',
    });
  }

  datesBetween: Date[] = [];

  generateDatesBetween() {
    const startDate = this.range.get('start')?.value;
    const endDate = this.range.get('end')?.value;
    if(startDate!=null && startDate!=undefined && endDate!=null && endDate!=null)
    this.maternityform.setControl('leaveDate', this.formgrp.array(this.getDatesBetween(startDate, endDate).map(date => date.toString())));
  }

  getDatesBetween(startDate: Date, endDate: Date): string[] {
    const dates:string[]= []
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
     
        const dateStr = this.date_Pipe.transform(currentDate, 'yyyy-MM-dd');
        if(dateStr!=null)
        dates.push(dateStr);
       
     

      currentDate.setDate(currentDate.getDate() + 1);
    }
       console.log(dates)
    return dates;
  }


  
 
  
 
   /**
    * on file drop handler
    */
   onFileDropped($event: any[]) {
     this.prepareFilesList($event);
   }
 
   /**
    * handle file from browsing
    */
 
   
   fileBrowseHandler(event: Event) {
     const inputElement = event.target as HTMLInputElement;
     if (inputElement.files) {
       const fileList: FileList = inputElement.files;
       const files: any[] = Array.from(fileList);
       this.prepareFilesList(files);
      
      //  this.isDisabled=false
     }
     
   }
 
   /**
    * Delete file from files list
    * @param index (File index)
    */
   deleteFile(index: number) {
     this.files.splice(index, 1);
     if(this.files.length==0){
      this.isDisabled=true
    }
   }
 
   /**
    * Simulate the upload process
    */
   uploadFilesSimulator(index: number) {
     setTimeout(() => {
       if (index === this.files.length) {this.isDisabled=false
         return;
       } else {
         const progressInterval = setInterval(() => {
           if (this.files[index].progress === 100) {
            
             clearInterval(progressInterval);
             this.uploadFilesSimulator(index + 1);
           } else {
             this.files[index].progress += 5;
           }
         }, 200);
       }
     }, 1000);

   }
 
   /**
    * Convert Files list to normal array list
    * @param files (Files List)
    */
   prepareFilesList(files: Array<any>) {
    
     for (const item of files) {
       item.progress = 0;
       this.files.push(item);
     }
     this.uploadFilesSimulator(0);
   }
 
   /**
    * format bytes
    * @param bytes (File size in bytes)
    * @param decimals (Decimals point)
    */
   formatBytes(bytes: number) {
     if (bytes === 0) {
       return '0 Bytes';
   }
 
   const k = 1024;
   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
   const i = Math.floor(Math.log(bytes) / Math.log(k));
   const sizeInBytes = parseFloat((bytes / Math.pow(k, i)).toFixed(2)); // Adjust the number of decimal places as needed
 
   return sizeInBytes + ' ' + sizes[i];
   }
   
}


