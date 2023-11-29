
import { Component, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';
import {
  MatCalendarCellClassFunction,
  MatCalendar,
} from '@angular/material/datepicker';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PendingleaveDialogComponent } from '../../pendingleave-dialog/pendingleave-dialog.component';
import { LeaveSummary } from '../../models/leave-summary.model';
import { AuthonticationService } from '../../shared/authontication.service';
import { LeaveSummaryService } from '../../services/leave-summary.service';
import { LeaveRequestService } from '../../services/leave-request.service';
import { LeaveRequest } from '../../models/leave-request.model';
import { HolidayMaster } from '../../models/holiday-master.model';
import { HolidayMasterService } from '../../services/holiday-master.service';
// import * as moment from 'moment';
import { Moment, fn, utc as moment } from 'moment/moment';
import Swal from 'sweetalert2';
import { CommonServiceService } from 'src/app/shared/common-service.service';
import { DatePipe } from '@angular/common';
import { InfoDetailsComponent } from 'src/app/dashboard/info-details/info-details.component';

export interface LeaveRequestInput {
  date: String | null;
  duration?: string | null;
  action: boolean | null;
}
const ELEMENT_DATA: LeaveRequestInput[] = [];

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css'],
})
export class ApplyLeaveComponent {
  constructor(
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private authService: AuthonticationService,
    private leaveSummaryService: LeaveSummaryService,
    public leaveRequestService: LeaveRequestService,
    private holidayMasterService: HolidayMasterService,
    private commonService: CommonServiceService,
    private datePipe: DatePipe
  ) { }

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  showToggle: string | undefined;
  mode: any;
  openSidenav: boolean | undefined;
  leaveStatus?: string = '';
  isShow = false;
  leaveRequests!: LeaveRequest[];
  leaveSummary: LeaveSummary = {
    remaingLeave: 0,
    remaingPL: 0,
    remaingCL: 0,
    remaingFL: 0,
    totalPL: 0,
    totalCL: 0,
    totalFL: 0,

    totalPending: 0,
    // pendingCL:number;
    // pendingFL?:number;
    // pendingPL?:number;
  };
  holidayList: HolidayMaster[] = [];

  @ViewChild(MatCalendar) private calendar?: MatCalendar<Date>;

  selected: Date | null = null;
  leaveDuration: string = '';
  leaveType: string = '';
  leaveReason: string = '';
  empId: string = '';

  leaveRequestInp: LeaveRequest = {
    leaveType: '',
    leaveDuration: '',
    leaveReason: '',
    leaveDate: [],
  };

  displayedColumns: string[] = ['slNo', 'date', 'duration', 'action'];

  dataToDisplay = [...ELEMENT_DATA];
  dataSource = new LeaveRequestDataSource(this.dataToDisplay);

  // selectedDates1: LeaveListItem[] = [];
  selectedDates: string[] = [];

  ngOnInit() {
    this.commonService.breadcrumbEmitter.emit({
      bcName: 'Home',
      bcCurrent: false,
      bcRouterLink: '/',
      bcChild: {
        bcName: 'Apply Leave',
        bcCurrent: true,
        bcRouterLink: '/leave',
      },
    });
    this.commonService.pageHeadingEmitter.emit('Apply Leave');
    this.loadLeaveSummary();
    this.getLeaveHistory();
    this.loadHolidayList();
  }

  private loadHolidayList(): void {
    this.holidayMasterService.getHolidayListForEmployee().subscribe((data) => {
      this.holidayList = data;
      this.calendar?.updateTodaysDate();
    });
  }

  private loadLeaveSummary(): void {
    let empId = this.authService.getUserDetails
      ? this.authService.getUserDetails.empId
      : null;
    if (empId != null) {
      this.leaveSummaryService
        .getLeaveSummaryForLoggedUser()
        .subscribe((data) => {
          if (data) {
            this.leaveSummary = data;
            if (
              this.leaveSummary?.remaingCL != undefined &&
              this.leaveSummary?.remaingFL != undefined &&
              this.leaveSummary?.remaingPL != undefined
            ) {
              this.leaveSummary.remaingLeave =
                this.leaveSummary.remaingCL +
                this.leaveSummary.remaingFL +
                this.leaveSummary.remaingPL;
            }
            if (
              this.leaveSummary?.pendingCL != undefined &&
              this.leaveSummary?.pendingFL != undefined &&
              this.leaveSummary?.pendingPL != undefined
            ) {
              this.leaveSummary.totalPending =
                this.leaveSummary.pendingCL +
                this.leaveSummary.pendingFL +
                this.leaveSummary.pendingPL;
            }
          }
        });
    }
  }

  addData(date: String | null) {
    console.log(date);
    if (date) {
      const newDate = {
        date: date,
        action: this.isShow,
        duration: this.leaveRequestInp.leaveDuration,
      };
      this.dataToDisplay = [...this.dataToDisplay, newDate];
      this.dataSource.setData(this.dataToDisplay);
    }
  }
  openDialog(e: any) {
    console.log(e)
     this.dialog.open(InfoDetailsComponent, {
       width: 'auto',
       height: 'auto',
       data: e,
       panelClass: 'custom-dialog'
     });
   }

  prepareLeaveRequest(date: string[]) {
    this.leaveRequestInp.leaveDate = this.selectedDates;
  }

  removeData(date: String | null) {
    this.dataToDisplay = this.dataToDisplay.filter((e) => e.date != date);
    this.dataSource.setData(this.dataToDisplay);
    this.selectedDates = this.selectedDates.filter((e) => e != date);
    this.calendar?.updateTodaysDate()
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view == 'month') {
      let dateToFind = this.getDateOnly(cellDate);
      let i = this.selectedDates.indexOf(dateToFind);
      if (i >= 0) {
        return 'date-selected';
      }
      let dt = this.datePipe.transform(cellDate, 'yyyy-MM-dd');
      let cls = ''
      if (this.leaveRequests) {
        this.leaveRequests.forEach(e => {
          if(e.leaveStatus=='APR')
          {
            if (e.leaveDate?.includes(dt ? dt : "")) {
              cls = 'date-approved';
            }
          }
          if(e.leaveStatus=='PND')
          {
            if (e.leaveDate?.includes(dt ? dt : "")) {
              cls = 'date-applied';
            }
          }
          
        });
      }
      if (this.holidayList) {
        this.holidayList.forEach(e => {
          console.log(e.holidayDate);
          if (this.datePipe.transform(e.holidayDate, 'yyyy-MM-dd') === dt) {
            cls = 'date-holiday';
          }
        })
      }
      return cls;
    }
    return '';
  };

  daySelected(date: Date | null, calendar: any) {
    console.log(date);
    if (date) {
      let dateSelected = this.getDateOnly(date);
      console.log(dateSelected);
      let i = this.selectedDates.indexOf(dateSelected);
      if (i >= 0) {
        this.selectedDates.splice(i, 1);
        this.removeData(dateSelected);
      } else {
        this.selectedDates.push(dateSelected);
        this.addData(dateSelected);
      }
      calendar.updateTodaysDate();
    }
  }

  // getDateOnly(date: Date): string {
  //   return date.toISOString().split('T')[0];
  // }
  getDateOnly(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based, so adding 1
    const day = date.getDate();

    // Create a formatted string in the "YYYY-MM-DD" format
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}`;
    return formattedDate;
  }
  holidayDateFilter = (date: Date): boolean => {
    // check if date is weekend day
    if (date.getDay() === 0 || date.getDay() === 6) {
      return false;
    }
    var finalSts = true;

    // check if date is holiday
    if (this.holidayList) {
      finalSts = !this.holidayList.find((x) => {
        var dt = new Date(x.holidayDate ? x.holidayDate + ' 00:00:00' : '');
        if (dt.getTime() == date.getTime()) {
          return true;
        }
        return false;
      });
    }

    if (finalSts && this.leaveRequests) {
      finalSts = !this.leaveRequests.find((lr) => {
        return lr.leaveDate?.find((x) => {
          var dt = new Date(x + ' 00:00:00');
          if (dt.getTime() == date.getTime()) {
            return true;
          }
          return false;
        });
      });
    }

    return finalSts;
  };

  getDurationText(duration: string): string {
    if (duration == 'Full Day') {
      return 'Full Day';
    } else if (duration == 'Half Day') {
      return 'Half Day';
    } else if (duration == '2 HR') {
      return '2 HR';
    } else {
      return '';
    }
  }

  changeDuration() {
    this.dataToDisplay.forEach(
      (e) => (e.duration = this.leaveRequestInp.leaveDuration)
    );
    this.dataSource.setData(this.dataToDisplay);
  }
  onSubmit() {
    if (this.leaveRequestInp.leaveType === 'CL') {
      if (
        this.leaveSummary.remaingCL != undefined &&
        this.leaveSummary.pendingCL != undefined
      ) {
        if (this.leaveRequestInp.leaveDuration == '1.00') {
          if (
            this.leaveSummary.remaingCL < this.selectedDates.length ||
            this.leaveSummary.pendingCL + this.selectedDates.length >
            this.leaveSummary.remaingCL
          ) {
            Swal.fire({
              title: 'Failed!',
              text: 'Your Reamaining CL is less then your applied leave.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
            return;
          }
        } else if (this.leaveRequestInp.leaveDuration == '0.50') {
          if (
            this.leaveSummary.remaingCL < 0.5 * this.selectedDates.length ||
            this.leaveSummary.pendingCL + 0.5 * this.selectedDates.length >
            this.leaveSummary.remaingCL
          ) {
            Swal.fire({
              title: 'Failed!',
              text: 'Your Reamaining CL is less then your applied leave.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
            return;
          }
        } else if (this.leaveRequestInp.leaveDuration == '0.25') {
          if (
            this.leaveSummary.remaingCL < 0.25 * this.selectedDates.length ||
            this.leaveSummary.pendingCL + 0.25 * this.selectedDates.length >
            this.leaveSummary.remaingCL
          ) {
            Swal.fire({
              title: 'Failed!',
              text: 'Your Reamaining CL is less then your applied leave.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
            return;
          }
        }
      }
    }

    if (this.leaveRequestInp.leaveType === 'PL') {
      if (
        this.leaveSummary.remaingPL != undefined &&
        this.leaveSummary.pendingPL != undefined
      ) {
        if (this.leaveRequestInp.leaveDuration == '1.00') {
          if (
            this.leaveSummary.remaingPL < this.selectedDates.length ||
            this.leaveSummary.pendingPL + this.selectedDates.length >
            this.leaveSummary.remaingPL
          ) {
            Swal.fire({
              title: 'Failed!',
              text: 'Your Reamaining PL is less then your applied leave.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
            return;
          }
        } else if (this.leaveRequestInp.leaveDuration == '0.50') {
          if (
            this.leaveSummary.remaingPL < 0.5 * this.selectedDates.length ||
            this.leaveSummary.pendingPL + 0.5 * this.selectedDates.length >
            this.leaveSummary.remaingPL
          ) {
            Swal.fire({
              title: 'Failed!',
              text: 'Your Reamaining PL is less then your applied leave.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
            return;
          }
        } else if (this.leaveRequestInp.leaveDuration == '0.25') {
          if (
            this.leaveSummary.remaingPL < 0.25 * this.selectedDates.length ||
            this.leaveSummary.pendingPL + 0.25 * this.selectedDates.length >
            this.leaveSummary.remaingPL
          ) {
            Swal.fire({
              title: 'Failed!',
              text: 'Your Reamaining PL is less then your applied leave.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
            return;
          }
        }
      }
    }

    if (this.leaveRequestInp.leaveType === 'FL') {
      if (
        this.leaveSummary.remaingFL != undefined &&
        this.leaveSummary.pendingFL != undefined
      ) {
        if (this.leaveRequestInp.leaveDuration == '1.00') {
          if (
            this.leaveSummary.remaingFL < this.selectedDates.length ||
            this.leaveSummary.pendingFL + this.selectedDates.length >
            this.leaveSummary.remaingFL
          ) {
            Swal.fire({
              title: 'Failed!',
              text: 'Your Reamaining FL is less then your applied leave.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
            return;
          }
        } else if (this.leaveRequestInp.leaveDuration == '0.50') {
          if (
            this.leaveSummary.remaingFL < 0.5 * this.selectedDates.length ||
            this.leaveSummary.pendingFL + 0.5 * this.selectedDates.length >
            this.leaveSummary.remaingFL
          ) {
            Swal.fire({
              title: 'Failed!',
              text: 'Your Reamaining FL is less then your applied leave.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
            return;
          }
        } else if (this.leaveRequestInp.leaveDuration == '0.25') {
          if (
            this.leaveSummary.remaingFL < 0.25 * this.selectedDates.length ||
            this.leaveSummary.pendingFL + 0.25 * this.selectedDates.length >
            this.leaveSummary.remaingFL
          ) {
            Swal.fire({
              title: 'Failed!',
              text: 'Your Reamaining FL is less then your applied leave.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
            return;
          }
        }
      }
    }

    if (
      !this.leaveRequestInp.leaveType ||
      !this.leaveRequestInp.leaveDuration ||
      !this.leaveRequestInp.leaveReason ||
      this.selectedDates.length === 0
    ) {
      Swal.fire({
        title: 'Failed!',
        text: 'Please Fill All Details.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }
    this.prepareLeaveRequest(this.selectedDates);
    console.log(this.leaveRequestInp)
    this.leaveRequestService.applyLeave(this.leaveRequestInp).subscribe(
      (data) => {
        if (data != null) {
          Swal.fire({
            title: 'Applied Successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            location.reload(); // Reload the page
          });
        } else {
        }
      },
      (error: any) => {
        Swal.fire({
          title: 'Failed!',
          text: 'Ohooo...Sorry. Some error.....',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
    if (this.leaveRequestInp != null) {
      this.openSnackBar();
    }
    // console.log(this.leaveRequestInp)
    // console.log(this.leaveType, this.leaveDuration, this.leaveReason, this.selectedDates)
  }

  onCancel() {
    this.leaveRequestInp = {
      leaveType: '',
      leaveDuration: '',
      leaveReason: '',
      leaveDate: [],
    };
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

  getLeaveHistory(): void {
    let empId = this.authService.getUserDetails
      ? this.authService.getUserDetails.empId
      : null;
    if (empId !== null) {
      this.leaveRequestService
        .getLeaveRequestsByEmpId(empId, true)
        .subscribe((data) => {
          if (data.length > 0) {
            this.leaveRequests = data;
            // this.leaveStatus = this.leaveRequests[(data.length) - 1].leaveStatus
            // if (this.leaveStatus === 'Waiting for approval') {
            //   this.leaveStatus = 'Waiting for approval'
            //   this.showPendingDialog()
            // }
            // else if (this.leaveStatus === 'Approval') {
            //   this.leaveStatus = 'Approval'
            // }
            // else {
            //   this.leaveStatus = ''
            // }
            // console.log(this.leaveStatus)
          }
        });
    } else {
      console.error('User ID not found in sessionStorage');
    }
  }
}

class LeaveRequestDataSource extends DataSource<LeaveRequestInput> {
  private _dataStream = new ReplaySubject<LeaveRequestInput[]>();
  constructor(initialData: LeaveRequestInput[]) {
    super();
    this.setData(initialData);
  }
  connect(): Observable<LeaveRequestInput[]> {
    return this._dataStream;
  }
  disconnect() { }
  setData(data: LeaveRequestInput[]) {
    this._dataStream.next(data);
  }
}
