import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { WfhRequest } from 'src/app/models/wfh-request';
import { WfhRequestService } from 'src/app/services/wfh-request.service';
import { AuthonticationService } from 'src/app/shared/authontication.service';
import { CommonServiceService } from 'src/app/shared/common-service.service';
import { DialogCancelComponent } from '../wfh-history/dialog-cancel/dialog-cancel.component';
import { DialogViewComponent } from '../wfh-history/dialog-view/dialog-view.component';
import { MaternityServiceService } from 'src/app/services/maternity-service.service';
import { MaternityDialogueViewComponent } from './maternity-dialogue-view/maternity-dialogue-view.component';
import { MaternityDialogueCancelComponent } from './maternity-dialogue-cancel/maternity-dialogue-cancel.component';

@Component({
  selector: 'app-maternity-history',
  templateUrl: './maternity-history.component.html',
  styleUrls: ['./maternity-history.component.css']
})
export class MaternityHistoryComponent {
  
  leaveHistory!: WfhRequest[];
  @ViewChild(MatPaginator) paginator: any = MatPaginator;

  displayedColumns: string[] = ['srno', 'day', 'leaveStatus', 'requestedDate', 'approvedBy', 'approvedDate', 'Action'];
  dataSource = new MatTableDataSource(this.leaveHistory);

  constructor(public dialog: MatDialog,
    private maternityRequestService: MaternityServiceService,
    private authService: AuthonticationService,private commonServiceService: CommonServiceService) { }

  ngOnInit() {
    
    

    let empId = this.authService.getLoggedInEmpId();
    if (empId) {
      this.maternityRequestService.getLeaveRequestsByEmpId(empId, false).subscribe(data => {
        console.log(data)
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
    this.dialog.open(MaternityDialogueViewComponent, {
      width: 'auto',
      height: 'auto',
      data: e
    });
  }

  openDialog2(e: string) {
    this.dialog.open(MaternityDialogueCancelComponent, {
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
