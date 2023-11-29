import { Component, ViewChild } from '@angular/core';
import { PolicydialogComponent } from '../maternity-leave/policydialog/policydialog.component';
import { PendingleaveDialogComponent } from 'src/app/pendingleave-dialog/pendingleave-dialog.component';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { MatCalendar, MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonServiceService } from 'src/app/shared/common-service.service';
import { LeaveRequestService } from 'src/app/services/leave-request.service';
import { AuthonticationService } from 'src/app/shared/authontication.service';
import { MatDialog } from '@angular/material/dialog';
import { AcceptValidator, MaxSizeValidator } from '@angular-material-components/file-input';
import { WfhRequestService } from 'src/app/services/wfh-request.service';
import { WfhRequest } from 'src/app/models/wfh-request';


@Component({
  selector: 'app-workfromhome',
  templateUrl: './workfromhome.component.html',
  styleUrls: ['./workfromhome.component.css']
})
export class WorkfromhomeComponent {
  range: FormGroup
  fileControl: FormControl;
  maxSize = 16;
  accept: string | undefined;
  leaveduartion: string = ''
  fileTransferForm: FormGroup;
  msgtransfer: any;
  inputworkDuration!: string;
  files: any[] = [];


  constructor(
    private dialog: MatDialog,
    private authService: AuthonticationService,
    public wfhRequestService: WfhRequestService,
    private commonService: CommonServiceService,
    private formgrp: FormBuilder,
  ) {

    this.fileTransferForm = this.formgrp.group({
      workType: ['WFH', Validators.required], // Example with validation
      workDuration: [0, Validators.required], // You can add validators if needed
      applicationDate: [[]],
      applicationReason: [''],
      empId: [],

    });

    this.msgtransfer = this.formgrp.group({
      value: new FormControl(""),
    })
    this.range = formgrp.group({
      'start': new FormControl<Date | null>(null),
      'end': new FormControl<Date | null>(null),
    });




    this.fileControl = new FormControl(this.files, [
      Validators.required,
      MaxSizeValidator(this.maxSize * 1024)
    ])

  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  showToggle: string | undefined;
  mode: any;
  openSidenav: boolean | undefined;
  leaveStatus?: string = '';
  isShow = false;
  // leaveRequests!: LeaveRequest[];

  multiple: boolean = false;

  @ViewChild(MatCalendar) private calendar?: MatCalendar<Date>;




  // leaveRequest: LeaveRequest = {
  //   leaveType: 'Work From Home',
  //   workDuration: '1.0',
  //   ApplicationReason: '',
  //   applicationDate: [],
  // };

  selectedDates: string[] = [];
  date_Pipe = new DatePipe('en-GB');





  ngOnInit() {




    this.fileTransferForm.get('workDuration')?.valueChanges.subscribe((value: string) => {
      this.inputworkDuration = value;
    });

    this.commonService.breadcrumbEmitter.emit({
      bcName: 'Home',
      bcCurrent: false,
      bcRouterLink: '/',
      bcChild: {
        bcName: 'Work From home',
        bcCurrent: true,
        bcRouterLink: '/maternityleave',
      },
    });
    this.commonService.pageHeadingEmitter.emit('Work from Home');

  }

  onSubmit() {
    let empId = this.authService.getLoggedInEmpId();

    this.fileTransferForm.get('empId')?.setValue(2);
    if (this.fileTransferForm.get('workDuration')?.value === '2') {
      this.generateDatesBetween()
    }



    console.log(this.files)
    if (this.fileTransferForm.value.applicationDate != null && this.fileTransferForm.value.workDuration == '1') {
      const dateStr = this.date_Pipe.transform(this.fileTransferForm.value.applicationDate, 'yyyy-MM-dd');
      this.fileTransferForm.value.applicationDate = [dateStr]
    }
    console.log(this.fileTransferForm.value)
    this.fileTransferForm.get('workDuration')?.setValue(1.0);
    this.wfhRequestService.applyWFH(this.fileTransferForm.value).subscribe(data => {
      console.log(data)
      this.wfhRequestService.uploadAttcahement(this.files,this.fileTransferForm.value,data.id).subscribe((data)=>{
        console.log(data)
      })
    },
    )

   

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
    if (startDate != null && startDate != undefined && endDate != null && endDate != null)
      this.fileTransferForm.setControl('applicationDate', this.formgrp.array(this.getDatesBetween(startDate, endDate).map(date => date.toString())));
  }

  getDatesBetween(startDate: Date, endDate: Date): string[] {
    const dates: string[] = []
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {

      const dateStr = this.date_Pipe.transform(currentDate, 'yyyy-MM-dd');
      if (dateStr != null)
        dates.push(dateStr);



      currentDate.setDate(currentDate.getDate() + 1);
    }

    console.log(dates)
    return dates;
  }
  selectedFileName: string = '';

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.selectedFileName = selectedFile.name;

    }
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
    }
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files?.length) {
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
