import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { WfhRequest } from 'src/app/models/wfh-request';
import { WfhRequestService } from 'src/app/services/wfh-request.service';
import { AuthonticationService } from 'src/app/shared/authontication.service';
import { CommonServiceService } from 'src/app/shared/common-service.service';
import { ApproveWfhDialogComponent } from '../approve-wfh/approve-wfh-dialog/approve-wfh-dialog.component';
import { MaternityServiceService } from 'src/app/services/maternity-service.service';
import { MaternityApproveDialogueComponent } from './maternity-approve-dialogue/maternity-approve-dialogue.component';
import { MaternityLeaveRequest } from 'src/app/models/maternity-leave-request';

@Component({
  selector: 'app-maternity-approve',
  templateUrl: './maternity-approve.component.html',
  styleUrls: ['./maternity-approve.component.css']
})
export class MaternityApproveComponent {
  user!: MaternityLeaveRequest[];

  displayedColumns: string[] = ['slno', 'name', 'requestedDate', 'leaveType', 'duration', 'day', 'status'];
  dataSource = new MatTableDataSource<MaternityLeaveRequest>(this.user);

  @ViewChild(MatPaginator) paginator: any = MatPaginator;

  constructor(public dialog: MatDialog,
    public maternityRequestService: MaternityServiceService,
    private authService: AuthonticationService,
     private commonService: CommonServiceService) { }

  openDialog(e: any) {
    this.dialog.open(MaternityApproveDialogueComponent, {
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
        bcName: "Approve Leave(Maternity)",
        bcCurrent: true,
        bcRouterLink: "/holiday"
      }
    });
    this.commonService.pageHeadingEmitter.emit("Approve Leave(Maternity)");
    this.loadLeaveRequests();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadLeaveRequests() {
    let userId = this.authService.getUserDetails ? this.authService.getUserDetails.empId : null;
    if (userId !== null) {

      this.maternityRequestService.getLeaveRequestByCurrentAssignee(userId).subscribe(data => {
        this.user = data
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
    console.log(type)
    if (type === 1.0) {
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
