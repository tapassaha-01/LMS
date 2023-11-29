import { Component, Renderer2, ViewChild } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatCalendar, MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { LeaveSummryDetail } from 'src/app/models/leave-summry-detail';
import { LeaveSummaryService } from 'src/app/services/leave-summary.service';
import { CommonServiceService } from 'src/app/shared/common-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leave-applied-detail',
  templateUrl: './leave-applied-detail.component.html',
  styleUrls: ['./leave-applied-detail.component.css']
})
export class LeaveAppliedDetailComponent {
  leaveDetailSummry!: LeaveSummryDetail[]
  numberArray!: LeaveSummryDetail[]
  datesToHighlight: string[][] = [[], []];
  datesToHighlightPen!:string[]
  year: number = 0

 
 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatCalendar) calendar!: MatCalendar<any>;
 
  selectedDate: Date | null;

  displayedColumns: string[] = ['Sl.No', 'Name', 'location', 'appliedCL', 'appliedPL', 'appliedFL',
    'edit'];
  dataSource = new MatTableDataSource<LeaveSummryDetail>();

  constructor(
    private dateAdapter: DateAdapter<any>,
    private renderer: Renderer2,
    private leaveService: LeaveSummaryService,
    private router:Router,
    private commonService: CommonServiceService
  ) {
    this.selectedDate = this.dateAdapter.today();
    this.datesToHighlight = [[], []];
   
    
  }

  ngOnInit() {
   
    this.commonService.breadcrumbEmitter.emit({
      bcName: "Home",
      bcCurrent: false,
      bcRouterLink: "/",
      bcChild: {
        bcName: "Leave Applied Details",
        bcCurrent: true,
        bcRouterLink: "/leaveAppliedDetail"
      }
    });
    this.commonService.pageHeadingEmitter.emit("Leave Applied Details");
    this.serviceMethod(this.selectedDate?.getMonth(), this.selectedDate?.getFullYear())
  }
  serviceMethod(data1: number | undefined, data2: number | undefined) {
    
    if (data1 != undefined && data2 != undefined) {
      this.leaveService.getDetailLeaveSummry(data1 + 1, data2).subscribe(data => {
        this.leaveDetailSummry = data
        this.dataSource.data=this.leaveDetailSummry
        console.log( data)
       
      })
    }
   
  }
  onRowClick(element: any) {
    
      this.selectedDate = element.approveDate// Set the selected date
      console.log(element)
      if(element.approveDate!=null)
      {
        this.datesToHighlight[0]=element.approveDate; 
      }
      if(element.pendingDate!=null)
      {
        this.datesToHighlight[1]=element.pendingDate; 
      }
      // Add the selected date to the array
      console.log(this.datesToHighlight)
      console.log(this.datesToHighlightPen)
      this.calendar.updateTodaysDate();

  }



  onViewClick(event: Event,element:any) {
    event.stopPropagation();
    console.log(element.lastName)
    const data = { ...element };
    this.router.navigateByUrl('individualHistory', { state: { data } });
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
    this.dataSource.paginator = this.paginator;
    console.log(this.paginator)
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
    console.log('Active date:', this.calendar.activeDate);
    this.serviceMethod((<Date>this.calendar.activeDate).getMonth(), (<Date>this.calendar.activeDate).getFullYear());
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

