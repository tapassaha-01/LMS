import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DialogueViewComponent } from './dialogue-view/dialogue-view.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogueCancelComponent } from './dialogue-cancel/dialogue-cancel.component';
import { LeaveRequestService } from 'src/app/services/leave-request.service';
import { LeaveRequest } from 'src/app/models/leave-request.model';
import { AuthonticationService } from 'src/app/shared/authontication.service';
import { MatPaginator } from '@angular/material/paginator';
import { CommonServiceService } from 'src/app/shared/common-service.service';

@Component({
  selector: 'app-leave-history',
  templateUrl: './leave-history.component.html',
  styleUrls: ['./leave-history.component.css']
})
export class LeaveHistoryComponent {

  leaveHistory!: LeaveRequest[];
  @ViewChild(MatPaginator) paginator: any = MatPaginator;

  displayedColumns: string[] = ['srno', 'day', 'leaveStatus', 'requestedDate', 'approvedBy', 'approvedDate', 'Action'];
  dataSource = new MatTableDataSource(this.leaveHistory);

  constructor(public dialog: MatDialog,
    private leaveRequestService: LeaveRequestService,
    private authService: AuthonticationService,private commonServiceService: CommonServiceService) { }

  ngOnInit() {
    
    

    let empId = this.authService.getLoggedInEmpId();
    if (empId) {
      this.leaveRequestService.getLeaveRequestsByEmpId(empId, false).subscribe(data => {
        this.leaveHistory = data;
        this.dataSource.data = this.leaveHistory;
      });
    }

    this.commonServiceService.breadcrumbEmitter.emit({
      bcName: "Home",
      bcCurrent: false,
      bcRouterLink: "/",
      bcChild: {
        bcName: "History",
        bcCurrent: true,
        bcRouterLink: "/history"
      }
    }
    );
    this.commonServiceService.pageHeadingEmitter.emit("History");
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openViewDialog(e: any) {
    this.dialog.open(DialogueViewComponent, {
      width: 'auto',
      height: 'auto',
      data: e
    });
  }

  openDialog2(e: string) {
    this.dialog.open(DialogueCancelComponent, {
      width: 'auto',
      height: 'auto',
      data: e
    });
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

  

}
