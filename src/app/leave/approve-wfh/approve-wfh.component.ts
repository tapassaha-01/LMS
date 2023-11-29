import { Component, ViewChild } from '@angular/core';
import { ApprovalDailogComponent } from '../approve-leave/approval-dialog/approval-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LeaveRequest } from 'src/app/models/leave-request.model';
import { LeaveRequestService } from 'src/app/services/leave-request.service';
import { AuthonticationService } from 'src/app/shared/authontication.service';
import { CommonServiceService } from 'src/app/shared/common-service.service';
import { ApproveWfhDialogComponent } from './approve-wfh-dialog/approve-wfh-dialog.component';
import { WfhRequestService } from 'src/app/services/wfh-request.service';
import { WfhRequest } from 'src/app/models/wfh-request';

@Component({
  selector: 'app-approve-wfh',
  templateUrl: './approve-wfh.component.html',
  styleUrls: ['./approve-wfh.component.css']
})
export class ApproveWFHComponent {
  user!: WfhRequest[];

  displayedColumns: string[] = ['slno', 'name', 'requestedDate', 'leaveType', 'duration', 'day', 'status'];
  dataSource = new MatTableDataSource<WfhRequest>(this.user);

  @ViewChild(MatPaginator) paginator: any = MatPaginator;

  constructor(public dialog: MatDialog,
    public wfhRequestService: WfhRequestService,
    private authService: AuthonticationService,
     private commonService: CommonServiceService) { }

  openDialog(e: any) {
    this.dialog.open(ApproveWfhDialogComponent, {
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
        bcName: "Approve Leave(WFH)",
        bcCurrent: true,
        bcRouterLink: "/holiday"
      }
    });
    this.commonService.pageHeadingEmitter.emit("Approve Leave(WFH)");
    this.loadLeaveRequests();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadLeaveRequests() {
    let userId = this.authService.getUserDetails ? this.authService.getUserDetails.empId : null;
    if (userId !== null) {

      this.wfhRequestService.getLeaveRequestByCurrentAssignee(userId).subscribe(data => {
        this.user = data.filter(e=>"WFH")
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

  getLeaveDurationText(type:string):string{
    console.log(type)
    if (type === "1.0") {
      // this.leaveStatusService.setLeaveStatus(status);
      return 'FULL DAY'
    }
    else if (type === "0.5") {
      //this.leaveStatusService.setLeaveStatus(status);
      return 'HALF DAY'
    }
    else if (type === "0.25") {
      //this.leaveStatusService.setLeaveStatus(status);
      return '2 Hour'
    }
    else {
      //this.leaveStatusService.setLeaveStatus(status);
      return ''
    }
  }


}
