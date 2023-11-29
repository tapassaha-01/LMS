import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { ChartConfiguration, ChartType, ChartData, ChartEvent } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { saveAs } from 'file-saver';
import { LeaveRequest } from 'src/app/models/leave-request.model';
import { LeaveRequestService } from 'src/app/services/leave-request.service';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import Swal from 'sweetalert2';
import { WfhRequest } from 'src/app/models/wfh-request';
import { WfhRequestService } from 'src/app/services/wfh-request.service';
import { MatTableDataSource } from '@angular/material/table';
import { FileMetaData } from 'src/app/models/file-meta-data';
import { arrayBuffer } from 'stream/consumers';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-approve-wfh-dialog',
  templateUrl: './approve-wfh-dialog.component.html',
  styleUrls: ['./approve-wfh-dialog.component.css']
})
export class ApproveWfhDialogComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  fileUrl!: any;
  // user!: Liclass
  name: string = ''
  lt: string = ''
  duration: string = ''
  reason: string = '';
  users: any = {
  }
  empId: string = ''
  leavedata!: number[]

  actionInfo: WfhRequest = {};
  files!: FileMetaData[];
  displayedColumns: string[] = ['slno', 'fileName','fileType'];
  dataSource = new MatTableDataSource<FileMetaData>(this.files);
  constructor(public leaveReqServ: LeaveRequestService,
    @Inject(MAT_DIALOG_DATA) public dataf: string,
    private sanitizer:DomSanitizer,
    private _snackBar: MatSnackBar, private wfhRequestService: WfhRequestService, private leaveRequestService: LeaveRequestService) {

  }

  ngOnInit() {
    this.users = this.dataf
    this.empId = this.users.empId
    console.log(this.users.id)

    this.getNumberOfLeaveTakenByMonth()
    this.wfhRequestService.getListOfFileMetaData(this.users.id).subscribe((data: FileMetaData[]) => {
      this.files = data.filter(e => "WFH")
      console.log(data)
      this.dataSource.data = this.files;
    })

  }
  getNumberOfLeaveTakenByMonth() {


    this.leaveRequestService.getNumberOfLeaveTakenBymonth(this.empId).subscribe(data => {

      this.leavedata = data
      console.log(this.leavedata)
      this.barChartData = {
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        datasets: [
          // { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A',barThickness:15,borderRadius:10,backgroundColor:'#C8C8C8'},
          { data: this.leavedata, label: 'No of Days', barThickness: 15, borderRadius: 10, backgroundColor: '#5469e2' },
        ],

      };
    })




  }
  getleave(): string {
    return this.users.applicationDate.join('\n')
  }

  onSubmit(action: string): void {
    if (this.users == null) {
      this._snackBar.open('Please fill all fields', 'Ok', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 5000
      });
      return;
    }
    else {
      console.log(this.users)
      if (action === 'Approved' || action === 'Rejected') {
        this.actionInfo.approvedrejectReason = this.reason
        this.actionInfo.applicationStatus = this.getStatus(action)
        this.actionInfo.id = this.users.id
        const eid = sessionStorage.getItem('userId')
        if (eid != null) {
          this.actionInfo.approvedBy = eid
        }
        console.log(this.actionInfo)
        this.wfhRequestService.approveLeave(this.actionInfo).subscribe(
          (data: any) => {
            console.log('Action sent:', data);
            if (action == 'Approved') {
              Swal.fire({
                title: 'Approved',
                icon: 'success',
                confirmButtonText: 'OK'
              }).then(() => {
                location.reload(); // Reload the page
              });
            }
            else {
              Swal.fire({
                title: 'Rejected',
                icon: 'error',
                confirmButtonText: 'OK'
              }).then(() => {
                location.reload(); // Reload the page
              });
            }
          },
          (error: any) => {
            console.error('Error while sending action:', error);
          }
        );


      }
    }
  }

  private getStatus(action: string) {

    if (action === 'Approved') {
      return "APR";
    } else if (action === 'Rejected') {
      return "REJ";
    }
    return "PND";
  }

  openSnackBar() {
    const snackBarRef = this._snackBar.open('Applied successfully', 'Ok', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 10000,
      panelClass: 'custom-snackbar',
    });


    snackBarRef.onAction().subscribe(() => {
      // Code to execute when "Ok" is clicked in the snackbar
      window.location.reload();
    });
  }
  getLeaveDurationText(data: number) {
    if (data == 1) {
      return 'FULL DAY'
    }
    else if (data == 0.5) {
      return 'HALF DAY'
    }
    else {
      return '2 HOURS'
    }
  }
  getLeaveType(data: string) {
    if (data == 'PL') {
      return 'Privilege Leave'
    }
    else if (data == 'FL') {
      return 'Floating Leave'
    }
    else if (data == 'CL') {
      return 'Casual Leave or Sick Leave'
    }
    else if (data = 'WFH') {
      return 'Work From Home'
    }
    else {
      return 'Maternity Leave'
    }
  }
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {
        grid: {
          display: false, // Set this to false to remove x-axis grid lines
        },

      },
      y: {
        suggestedMin: 0, // Set the minimum value
        suggestedMax: 5, // Set the maximum value
        ticks: {
          stepSize: 0.25, // Set the step size as needed (e.g., 10)
        },
        grid: {
          display: false, // Set this to false to remove x-axis grid lines
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];

  externalDataArray: any = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.5, 0];

  public barChartData: ChartData<'bar'> = {
    labels: ['JAN', 'FEB', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
    datasets: [
      // { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A',barThickness:15,borderRadius:10,backgroundColor:'#C8C8C8'},
      { data: this.leavedata, label: '', barThickness: 15, borderRadius: 10, backgroundColor: '#5469e2' },
    ],

  };


  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  fileDownload(fileId: string, fileName: string) {
    console.log(fileId)
    this.wfhRequestService.downloadDocument(fileId).subscribe((response: any) => {
      console.log(response)
      //let customFilename = response.filename
      const converted = new Blob([response])
      saveAs(converted, fileName);
      
    },
      error => {
        console.error('Error downloading file:', error);
      });

  }

}
