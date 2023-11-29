import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HolidayMaster } from 'src/app/models/holiday-master.model';
import { LeaveSummary } from 'src/app/models/leave-summary.model';
import { HolidayMasterService } from 'src/app/services/holiday-master.service';
import { CommonServiceService } from 'src/app/shared/common-service.service';
import { AddleaveComponent } from './addleave/addleave.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-leavedetails',
  templateUrl: './leavedetails.component.html',
  styleUrls: ['./leavedetails.component.css'],
 
})
export class LeavedetailsComponent {

  leaveSummry!:LeaveSummary[]
 
  constructor(private holidaymaster:HolidayMasterService, private commonService: CommonServiceService,public dialog: MatDialog,)
  {
      this.holidaymaster.getLeaveSummry().subscribe(
        data=>
        {
          this.leaveSummry=data
          console.log(data)
          this.dataSource.data = this.leaveSummry;
        }
      )
  }

  @ViewChild(MatPaginator) paginator: any = MatPaginator;

  displayedColumns: string[] = ['Sl.No', 'empId', 'name', 'location', 'totalL',
  'totalPL', 'totalCL', 'totalFL','edit'];
dataSource = new MatTableDataSource(this.leaveSummry);

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
ngOnInit()
{
  this.commonService.breadcrumbEmitter.emit({
    bcName: "Home",
    bcCurrent: false,
    bcRouterLink: "/",
    bcChild: {
      bcName: "Leave Details",
      bcCurrent: true,
      bcRouterLink: "/holiday"
    }
  });
  this.commonService.pageHeadingEmitter.emit("Leave Details");
 
}
openViewDialog(e: string) {
  this.dialog.open(AddleaveComponent, {
    width: 'auto',
    height: 'auto',
    data: e
  }).afterClosed().subscribe(val=>{
    this.holidaymaster.getLeaveSummry().subscribe((data) => {
      this.leaveSummry = data;
      this.dataSource.data = this.leaveSummry;
    });
  });
  


  
}
downloadExcel()
{
  console.log("work")
  this.holidaymaster.getExcelData().subscribe((data: Blob) => {
    if (data) {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    } else {
      // Handle the error or display a message to the user
    }
  });
}
ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
}

}
