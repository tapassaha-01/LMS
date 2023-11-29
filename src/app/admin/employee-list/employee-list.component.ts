import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmployeeDetailsService } from 'src/app/services/employee-details.service';
import { EmployeeDetails } from 'src/app/models/employee-details.model';
import { CommonServiceService } from 'src/app/shared/common-service.service';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
  constructor(
    private router: Router, private employeeService: EmployeeDetailsService,
    private commonService: CommonServiceService) { }

  employeeList!: EmployeeDetails[]

  @ViewChild(MatPaginator) paginator: any = MatPaginator;

  displayedColumns: string[] = ['Sl.No', 'empId', 'name', 'email', 'location',
    'isManager', 'isAdmin', 'isActive', 'edit'];
  dataSource = new MatTableDataSource(this.employeeList);


  ngOnInit() {
    this.employeeService.fetchAllEmployee().subscribe(data => {
      this.employeeList = data;
      this.dataSource.data = this.employeeList;
    });

    this.commonService.breadcrumbEmitter.emit({
      bcName: "Home",
      bcCurrent: false,
      bcRouterLink: "/",
      bcChild: {
        bcName: "Employee List",
        bcCurrent: true,
        bcRouterLink: "/emploeelist"
      }
    });
    this.commonService.pageHeadingEmitter.emit("Employee List");
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onSubmit(element: any) {
    // console.log(element)
    const data = { ...element };
    this.router.navigateByUrl('emploeelist/editrecord', { state: { data } });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
