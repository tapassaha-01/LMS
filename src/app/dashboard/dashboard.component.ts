import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject, Observable } from 'rxjs';
import { LeaveSummary } from '../models/leave-summary.model';
import { AuthonticationService } from '../shared/authontication.service';
import { LeaveSummaryService } from '../services/leave-summary.service';
import { CommonServiceService } from '../shared/common-service.service';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { LeaveRequestService } from '../services/leave-request.service';
import { LeaveRequest } from '../models/leave-request.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InfoDetailsComponent } from './info-details/info-details.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  
// ];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit,AfterViewInit  {

  leaveHistory!: LeaveRequest[];
  leavedata!:number[]
  leaveSummary: LeaveSummary = {
    totalPL: 0,
    totalCL: 0,
    totalFL: 0,
    remaingPL: 0,
    remaingCL: 0,
    remaingFL: 0,
    remaingLeave: 0
  };
  leave_info:any;

  showToggle: string | undefined;
  mode: any;
  openSidenav: boolean | undefined;

  intervalIds: ReturnType<typeof setInterval>[] = [];

  tleave: any = 0;
  cpercentage: number = 0;
  tpercentage: number = 0;
  ppercentage: number = 0;
  fpercentage: number = 0;
  rleave: any = 0;
  cleave: any = 0;
  pleave: any = 0;
  fleave: any = 0;
  rcleave: any = 0;
  rfleave: any = 0;
  rpleave: any = 0;
  

  private screenWidth$ = new BehaviorSubject<number>(window.innerWidth);
  displayedColumns: string[] = ['leavetype', 'leavestatus', 'detail'];
  dataSource = new MatTableDataSource(this.leaveHistory);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  @ViewChild('sidenav') matSidenav: any = MatSidenav;

  constructor(public dialog: MatDialog,
    private leaveSummaryService: LeaveSummaryService,
    private authonticationService: AuthonticationService,
    private commonServiceService: CommonServiceService, private authService:AuthonticationService,
    private leaveRequestService: LeaveRequestService,private router:Router) { }

  ngOnInit(): void {
    this.startCountAnimation();
    this.getData();
    this.commonServiceService.breadcrumbEmitter.emit({
      bcName: "Home",
      bcCurrent: false,
      bcRouterLink: "/",
      bcChild: {
        bcName: "Dashboard",
        bcCurrent: true,
        bcRouterLink: "/dashboard"
      }
    });
    let empId = this.authService.getLoggedInEmpId();
    if (empId) {
      this.leaveRequestService.getLeaveRequestsByEmpId(empId, false).subscribe(data => {
        this.leaveHistory = data;
        if(this.leaveHistory.length<=4)
        {
          this.dataSource.data = this.leaveHistory;
        }
        else{
          this.dataSource.data=this.leaveHistory.slice(-5,-1)
        }
       
      });
    }

    this.getNumberOfLeaveTakenByMonth()
   
  }
  getNumberOfLeaveTakenByMonth()
  {
    let empId = this.authService.getLoggedInEmpId();
    if(empId)
    {
      this.leaveRequestService.getNumberOfLeaveTakenBymonth(empId).subscribe(data=>
        {
             this.leavedata=data

             console.log(this.leavedata)
            this.barChartData= {
              labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL','AUG','SEP','OCT','NOV','DEC'],
              datasets: [
                // { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A',barThickness:15,borderRadius:10,backgroundColor:'#C8C8C8'},
                { data: this.leavedata, label: 'No of Days',barThickness:15,borderRadius:10,backgroundColor:'#5469e2'},
              ],
              
            };
        })

        
    }
   
  }

  getData() {
    const userId = this.authonticationService.getLoggedInEmpId();
    if (userId != null) {
      this.leaveSummaryService.getLeaveSummaryForLoggedUser().subscribe(data => {
        if (data) {
          console.log(data)
          this.leaveSummary = data;
          console.log(this.leaveSummary)
          this.cleave = this.leaveSummary?.totalCL
          this.pleave = this.leaveSummary?.totalPL
          this.fleave = this.leaveSummary?.totalFL
          this.rcleave = this.leaveSummary?.remaingCL
          this.rpleave = this.leaveSummary?.remaingPL
          this.rfleave = this.leaveSummary?.remaingFL
          this.tleave = this.cleave + this.pleave + this.fleave
          this.rleave = (this.rcleave + this.rpleave + this.rfleave)
          this.cpercentage = Math.floor((this.rcleave / this.cleave) * 100)
          this.ppercentage = Math.floor((this.rpleave / this.pleave) * 100)
          this.fpercentage = Math.floor((this.rfleave / this.fleave) * 100)
          this.tpercentage = Math.floor((this.rleave / this.tleave) * 100)
        }
      });
    } else {
      alert("Empty")
    }


  }

  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: number }; }) {
    this.screenWidth$.next(event.target.innerWidth);
  }

  getScreenWidth(): Observable<number> {
    return this.screenWidth$.asObservable();
  }

  calculateRotation1(): string {
    const rotation = (this.tpercentage / 100) * 360;
    return rotation + 'deg';
  }
  calculateRotation2(): string {
    const rotation = (this.cpercentage / 100) * 360;
    return rotation + 'deg';
  }

  calculateRotation3(): string {
    const rotation = (this.ppercentage / 100) * 360;
    return rotation + 'deg';
  }

  calculateRotation4(): string {
    const rotation = (this.fpercentage / 100) * 360;
    return rotation + 'deg';
  }


  startCountAnimation(): void {
    const numElements = Array.from(document.querySelectorAll('.box .number .num')) as HTMLElement[];

    numElements.forEach((numElement) => {
      const num = parseInt(numElement.innerText, 10);
      let count = 0;
      const time = 2000 / num;
      const intervalId = setInterval(() => {
        if (count === num) {
          clearInterval(intervalId);
        } else {
          count += 1;
          numElement.innerText = count.toString();
        }
      }, time);
      this.intervalIds.push(intervalId);
    });
  }


  getOuterStrokeColor1() {
    const percentage = this.tpercentage;

    if (percentage <= 20) {
      return ' #FF7276';
    } else if (percentage < 60) {
      return '#FFA400';
    } else {
      return '#90ee90 ';
    }
  }
  getOuterStrokeColor2() {
    const percentage = this.ppercentage;

    if (percentage <= 20) {
      return '#FF7276';
    } else if (percentage < 60) {
      return '#FFA400';
    } else {
      return '#90ee90 ';
    }
  }
  getOuterStrokeColor3() {
    const percentage = this.cpercentage;

    if (percentage <= 20) {
      return '#FF7276';
    } else if (percentage < 60) {
      return '#FFA400';
    } else {
      return '#90ee90 ';
    }
  }
  getOuterStrokeColor4() {
    const percentage = this.fpercentage;

    if (percentage <= 20) {
      return '#FF7276';
    } else if (percentage < 60) {
      return '#FFA400';
    } else {
      return '#90ee90';
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
    stepSize:0.25, // Set the step size as needed (e.g., 10)
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

  externalDataArray:any= [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.5, 0]; 

  public barChartData: ChartData<'bar'> = {
    labels: ['JAN', 'FEB', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY','AUG','SEP','OCT','NOV','DEC'],
    datasets: [
      // { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A',barThickness:15,borderRadius:10,backgroundColor:'#C8C8C8'},
      { data: this.leavedata, label: '',barThickness:15,borderRadius:10,backgroundColor:'#5469e2'},
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


  ngOnDestroy(): void {
    this.intervalIds.forEach((intervalId) => {
      clearInterval(intervalId);
    });
  }

  getLeaveStatusText(status: string): string {
    if (status === 'PND') {
      // this.leaveStatusService.setLeaveStatus(status);
      return 'Waiting for Approval'
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
  getLeaveTypeText(type:string):string{
    if (type === 'CL') {
      // this.leaveStatusService.setLeaveStatus(status);
      return 'Casual Leave'
    }
    else if (type === 'PL') {
      //this.leaveStatusService.setLeaveStatus(status);
      return 'Privilege Leave'
    }
    else if (type === 'FL') {
      //this.leaveStatusService.setLeaveStatus(status);
      return 'Floating Leavc'
    }
    else {
      //this.leaveStatusService.setLeaveStatus(status);
      return ''
    }
  }
  getStatusBackgroundColor(leaveStatus: string): string {
    if (leaveStatus === 'PND') {
      return 'date-selected'; // Set your light red background color
    } else if (leaveStatus === 'APR') {
      return 'light-green'; // Set your light green background color
    } else {
      return ''; // Default background color
    }
  }
  onClick()
  {
    this.router.navigate(['/history'])
  }

  isFloatingVisible = false;
  showFloatingContent() {
    this.isFloatingVisible = true;
  }

  hideFloatingContent() {
    this.isFloatingVisible = false;
  }

  show_info(){

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
  
}
