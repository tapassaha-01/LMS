import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApprovalDailogComponent } from './approval-dialog/approval-dialog.component';
import { LeaveRequestService } from 'src/app/services/leave-request.service';
import { AuthonticationService } from 'src/app/shared/authontication.service';
import { LeaveRequest } from 'src/app/models/leave-request.model';
import { CommonServiceService } from 'src/app/shared/common-service.service';

@Component({
  selector: 'app-approve-leave',
  templateUrl: './approve-leave.component.html',
  styleUrls: ['./approve-leave.component.css']
})
export class ApproveLeaveComponent implements AfterViewInit {

  user!: LeaveRequest[];

  displayedColumns: string[] = ['slno', 'name', 'requestedDate', 'leaveType', 'duration', 'day', 'status'];
  dataSource = new MatTableDataSource<LeaveRequest>(this.user);

  @ViewChild(MatPaginator) paginator: any = MatPaginator;

  constructor(public dialog: MatDialog,
    public leaveRequestService: LeaveRequestService,
    private authService: AuthonticationService,
     private commonService: CommonServiceService) { }

  openDialog(e: any) {
    this.dialog.open(ApprovalDailogComponent, {
      width: 'auto',
      height: 'auto',
      data: e,
      panelClass: 'custom-dialog'
    });
  }

  ngOnInit() {
    this.commonService.breadcrumbEmitter.emit({
      bcName: "Home",
      bcCurrent: false,
      bcRouterLink: "/",
      bcChild: {
        bcName: "Approve Leave",
        bcCurrent: true,
        bcRouterLink: "/holiday"
      }
    });
    this.commonService.pageHeadingEmitter.emit("Approve Leave");
    this.loadLeaveRequests();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadLeaveRequests() {
    let userId = this.authService.getUserDetails ? this.authService.getUserDetails.empId : null;
    if (userId !== null) {

      this.leaveRequestService.getLeaveRequestByCurrentAssignee(userId).subscribe(data => {
        this.user = data.filter(e=>e.leaveType !== "Work From Home");
        console.log(data)
        this.dataSource.data = this.user;
        // Update the data of the dataSource
        // Move the initialization of the dataSource to this point
        // this.dataSource = new MatTableDataSource<LeaveRequest>(this.user);
        // this.dataSource.paginator = this.paginator;
      });
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getLeaveStatusText(status: string): string {
    if (status === 'PND') {
      // this.leaveStatusService.setLeaveStatus(status);
      return 'Waiting for approval'
    }
    else if (status === 'APR') {
      //this.leaveStatusService.setLeaveStatus(status);
      return 'Approved'
    }
    else if (status === 'REJ') {
      //this.leaveStatusService.setLeaveStatus(status);
      return 'Rejected'
    }
    else if (status === 'CAN') {
      //this.leaveStatusService.setLeaveStatus(status);
      return 'Cancelled'
    }
    else {
      //this.leaveStatusService.setLeaveStatus(status);
      return ''
    }
  }

  getLeaveDurationText(type:number):string{
    if (type === 1) {
      // this.leaveStatusService.setLeaveStatus(status);
      return 'FULL DAY'
    }
    else if (type === 0.5) {
      //this.leaveStatusService.setLeaveStatus(status);
      return 'HALF DAY'
    }
    else if (type === 0.25) {
      //this.leaveStatusService.setLeaveStatus(status);
      return '2 Hour'
    }
    else {
      //this.leaveStatusService.setLeaveStatus(status);
      return ''
    }
  }


}
