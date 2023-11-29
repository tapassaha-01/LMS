import { Component } from '@angular/core';

import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { EmployeeDetails } from 'src/app/models/employee-details.model';
import { EmployeeDetailsService } from 'src/app/services/employee-details.service';
import { CommonServiceService } from 'src/app/shared/common-service.service';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-add-epmloyee',
  templateUrl: './add-epmloyee.component.html',
  styleUrls: ['./add-epmloyee.component.css']
})
export class AddEpmloyeeComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private _snackBar: MatSnackBar,
    private employeeDetailsService: EmployeeDetailsService,
    private commonService: CommonServiceService
  ) { }

  managerList: EmployeeDetails[] = []

  draftEmployee: EmployeeDetails = {};

  selectedFLM!:string;


  ngOnInit() {
    this.getAllmanager();
    this.commonService.breadcrumbEmitter.emit({
      bcName: "Home",
      bcCurrent: false,
      bcRouterLink: "/",
      bcChild: {
        bcName: "Add Employee",
        bcCurrent: true,
        bcRouterLink: ""
      }
    });
    this.commonService.pageHeadingEmitter.emit("Add Employee");
  }

  getAllmanager() {
    this.employeeDetailsService.getAllManager().subscribe((data: EmployeeDetails[]) => {
      this.managerList = data
      console.log(this.managerList)
    });
  }

  filterSLMOptions():any[]
  {
    return this.managerList.filter(manager=>
      {
        return manager.empId!==this.selectedFLM
      });
  }


  onSubmit() {
    if (
      !this.draftEmployee.firstName?.trim() ||
      !this.draftEmployee.lastName?.trim() ||
      // !this.draftEmployee.firstLvlMgrId?.trim() ||
      !this.draftEmployee.isManager?.trim() ||
      !this.draftEmployee.empId?.trim()
    ) {
      Swal.fire({
        title: 'Failed!',
        text: 'Please Fill All Details.',
        icon: 'error',
        confirmButtonText: 'OK'
      })

      return;
    }
    else {
      this.draftEmployee.isActive = true;
      this.draftEmployee.firstLvlMgrId=this.selectedFLM
      this.employeeDetailsService.saveEmployee(this.draftEmployee).subscribe(
        (e) => {
          if (e && e.id !== "") {
            this.openSnackBar();
          }
        },
        (error) => {
          Swal.fire({
            title: 'Failed!',
            text: 'Bad Request.',
            icon: 'error',
            confirmButtonText: 'OK'
          })
    
        }
      );
      
    }
  }

  openSnackBar() {
    Swal.fire({
      title: 'Saved Successfully!',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      location.reload(); // Reload the page
    });

  }

  append() {
    console.log("triggered")
    this.draftEmployee.email = this.draftEmployee.userName + "@interrait.com"
  }

}