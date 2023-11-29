import { Component, ElementRef, ViewChild } from '@angular/core';
import { DateRange, MatCalendar, MatCalendarCellCssClasses, MatMonthView } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { CommonServiceService } from 'src/app/shared/common-service.service';
import { NewDetails } from 'src/app/models/new-details';
import { DateAdapter } from '@angular/material/core';
import { Renderer2 } from '@angular/core';
import { LeaveSummaryService } from 'src/app/services/leave-summary.service';
import { LeaveSummryDetail } from 'src/app/models/leave-summry-detail';
import Swal from 'sweetalert2';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import barChartPlugins from 'chartjs-plugin-datalabels';
import { LeaveRequestService } from 'src/app/services/leave-request.service';



@Component({
  selector: 'app-individual-leave-history',
  templateUrl: './individual-leave-history.component.html',
  styleUrls: ['./individual-leave-history.component.css']
})
export class IndividualLeaveHistoryComponent {
  isReadOnly=true
  newDetails!: NewDetails
  datesToHighlight: Date[][] = [[], []];
  leaveDetailSummry!: LeaveSummryDetail[]
  selectedDate: Date | null;
  name!: string
  empid: string = ''
  location: string = ''
  email: string = ''
  active: string = ''
  leaveDate!: Date[]
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatCalendar) calendar!: MatCalendar<any>;
  constructor(private commonService: CommonServiceService, private route: ActivatedRoute, private dateAdapter: DateAdapter<any>, private renderer: Renderer2, private leaveService: LeaveSummaryService,
    private leaveRequestService: LeaveRequestService) {
    this.selectedDate = this.dateAdapter.today()
    this.datesToHighlight = [[], []];
    console.log(this.selectedDate)

  }

  year: number = 0
  leavedata!: number[]
  displayedColumns: string[] = ['Sl.No', 'leavetype', 'leavereason', 'Date', 'leaveduration'
  ];
  dataSource = new MatTableDataSource();


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
    this.commonService.breadcrumbEmitter.emit({
      bcName: "Home",
      bcCurrent: false,
      bcRouterLink: "/",
      bcChild: {
        bcName: "Leave Applied Details",
        bcCurrent: false,
        bcRouterLink: "/leaveAppliedDetail",
        bcChild: {
          bcName: "Individual History",
          bcCurrent: true,
          bcRouterLink: "/individualHistory"
        }
      }
    });
    this.commonService.pageHeadingEmitter.emit("Individual History");

    this.route.paramMap
      .pipe(map(() => window.history.state))
      .subscribe((state: any) => {
        console.log("edit employee loaded")
        if (state && state.data) {
          this.newDetails = state.data
          if (this.newDetails.firstName != undefined && this.newDetails.empId != undefined && this.newDetails.location != undefined) {
            this.name = this.newDetails.firstName + ' ' + this.newDetails.lastName
            this.empid = this.newDetails.empId
            this.location = this.newDetails.location
            //   this.leaveDate=this.newDetails.leaveDate
            //  this.selectedDate = this.leaveDate[0];
          }

          console.log(this.newDetails);

        }
      });
    this.serviceMethod(this.selectedDate?.getMonth(), this.selectedDate?.getFullYear())
    this.getNumberOfLeaveTakenByMonth()
  }
  getNumberOfLeaveTakenByMonth() {

    this.leaveRequestService.getNumberOfLeaveTakenBymonth(this.empid).subscribe(data => {
      this.leavedata = data

      console.log(this.leavedata)
      this.barChartData = {
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        datasets: [
          // { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A',barThickness:15,borderRadius:10,backgroundColor:'#C8C8C8'},
          { data: this.leavedata, label: 'No Of Days', barThickness: 15, borderRadius: 10, backgroundColor: '#5469e2' },
        ],

      };
    })




  }
  _dateSelected(event: { value: any; }) {
    const date = event.value;
    console.log(date)
  }

  handleIndicatorClick(event: Event) {
    // Handle the click event here
    console.log('Indicator clicked');
    // You can perform additional actions as needed
  }


  dateClass(): (date: Date) => MatCalendarCellCssClasses {
    return (date: Date): MatCalendarCellCssClasses => {
      const isApprovedDate = this.datesToHighlight[0].some((strDate) => {
        const d = new Date(strDate);
        return (
          d.getDate() === date.getDate() &&
          d.getMonth() === date.getMonth() &&
          d.getFullYear() === date.getFullYear()
        );
      });

      const isPendingDate = this.datesToHighlight[1].some((strDate) => {
        const d = new Date(strDate);
        return (
          d.getDate() === date.getDate() &&
          d.getMonth() === date.getMonth() &&
          d.getFullYear() === date.getFullYear()
        );
      });

      if (isApprovedDate) {
        return 'date-approved'; // CSS class for approved dates
      } else if (isPendingDate) {
        return 'date-PENDING'; // CSS class for pending dates
      } else {
        return ''; // No custom CSS class
      }
    };
  }


  onDateChanged(event: any) {
    console.log(event);
    this.selectedDate = event;
  }

  monthChanged(event: Date) {
    // const selectedMonth = moment(event.value).month();
    // console.log(moment(event.value))
    this.serviceMethod(event.getMonth(), this.year);
  }

  handleYearSelected(event: Date) {
    this.year = event.getFullYear()

  }

  ngAfterViewInit() {
    const monthPrevBtn = document.querySelectorAll(
      '.mat-calendar-previous-button'
    );
    const monthNextBtn = document.querySelectorAll('.mat-calendar-next-button');

    if (monthPrevBtn) {
      Array.from(monthPrevBtn).forEach((button) => {
        this.renderer.listen(button, 'click', (event) => {
          this.handlePreviousClicked();
        });
      });
    }

    if (monthNextBtn) {
      Array.from(monthNextBtn).forEach((button) => {
        this.renderer.listen(button, 'click', (event) => {
          this.handleNextClicked();
        });
      });
    }
  }

  handlePreviousClicked() {
    console.log('Previous button clicked');
    console.log('Active date:', (<Date>this.calendar.activeDate).getMonth());
    this.serviceMethod((<Date>this.calendar.activeDate).getMonth(), (<Date>this.calendar.activeDate).getFullYear());
  }

  handleNextClicked() {
    console.log('Next button clicked');
    console.log('Active date:', this.calendar.activeDate.getMonth());
    this.serviceMethod((<Date>this.calendar.activeDate).getMonth(), (<Date>this.calendar.activeDate).getFullYear());
  }

  serviceMethod(data1: number | undefined, data2: number | undefined) {

    if (data1 != undefined && data2 != undefined && this.newDetails.empId != undefined) {

      this.leaveService.getIndividualDetailLeaveSummry(data1 + 1, data2, this.newDetails.empId).subscribe(data => {

        this.leaveDetailSummry = data
        // if (this.leaveDetailSummry[0].email != undefined) {
        //   this.email = this.leaveDetailSummry[0].email
        // }
        // if (this.leaveDetailSummry[0].isActive != undefined) {
        //   console.log(this.leaveDetailSummry[0].isActive);
        //   this.active = this.leaveDetailSummry[0].isActive == true ? "YES" : "NO";
        // }

        console.log(this.leaveDetailSummry)
        if (this.leaveDetailSummry === null || data.length == 0) {

          Swal.fire({
            title: 'Failed!',
            text: 'Sorry..for this month no information is available.',
            icon: 'error',
            confirmButtonText: 'OK'
          })

        }
        else {
          for (let i = 0; i < this.leaveDetailSummry.length; i++) {
            if (Array.isArray(this.leaveDetailSummry[i]?.leaveDate)) {
              const dates = this.leaveDetailSummry[i]?.leaveDate as Date[]; // Type assertion
              // this.datesToHighlight.push(...dates);
              if (this.leaveDetailSummry[i].leaveStatus == 'APR') {
                this.datesToHighlight[0].push(...dates)
              }
              if (this.leaveDetailSummry[i].leaveStatus == 'PND') {
                this.datesToHighlight[1].push(...dates)
              }


            }
          }
          this.calendar.updateTodaysDate();
        }




        console.log(this.leaveDetailSummry)


      }
      )
    }
    console.log("tshgf")
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
        suggestedMax: 20, // Set the maximum value
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
  public barChartPlugins = [barChartPlugins];

  externalDataArray: any = [5, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0.5, 0];

  public barChartData: ChartData<'bar'> = {
    labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
    datasets: [
      // { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A',barThickness:15,borderRadius:10,backgroundColor:'#C8C8C8'},
      { data: this.leavedata, label: 'No. Of Leave', barThickness: 15, borderRadius: 10, backgroundColor: '#5469e2' },
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

  getLeaveDurationText(status: number): string {
    if (status === 1) {
      // this.leaveStatusService.setLeaveStatus(status);
      return 'FULL DAY'
    }
    else if (status === 0.5) {
      //this.leaveStatusService.setLeaveStatus(status);
      return 'HALF DAY'
    }
    else if (status === 0.25) {
      //this.leaveStatusService.setLeaveStatus(status);
      return '2 HOUR'
    }
    else {
      //this.leaveStatusService.setLeaveStatus(status);
      return ''
    }
  }

  getLeaveTypeText(status: string): string {
    if (status === 'PL') {
      // this.leaveStatusService.setLeaveStatus(status);
      return 'Privilege Leave'
    }
    else if (status === 'CL') {
      //this.leaveStatusService.setLeaveStatus(status);
      return 'Casual Leave'
    }
    else if (status === 'FL') {
      //this.leaveStatusService.setLeaveStatus(status);
      return 'Floating Leave'
    }
    else {
      //this.leaveStatusService.setLeaveStatus(status);
      return ''
    }
  }


}
