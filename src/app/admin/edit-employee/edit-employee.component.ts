import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeDetails } from 'src/app/models/employee-details.model';
import { EmployeeDetailsService } from 'src/app/services/employee-details.service';
import Swal from 'sweetalert2';
import { CommonServiceService } from 'src/app/shared/common-service.service';


@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditRecordComponent {


  constructor(private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private employeeService: EmployeeDetailsService,private router:Router,
    private commonService: CommonServiceService) { 
    

    }

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  

  employee: EmployeeDetails = {}

  managerList: EmployeeDetails[] = []
  selectedFLM:string='';

  ngOnInit() {
    this.commonService.breadcrumbEmitter.emit({
      bcName: "Home",
      bcCurrent: false,
      bcRouterLink: "/",
      bcChild: {
        bcName: "Employee List",
        bcCurrent: false,
        bcRouterLink: "/emploeelist",
        bcChild: {
          bcName: "Edit Employee",
          bcCurrent: true,
          bcRouterLink: "/emploeelist"
        }
      }
    });
    this.commonService.pageHeadingEmitter.emit("Edit Employee");

    this.getAllmanager()

    this.route.paramMap
      .pipe(map(() => window.history.state))
      .subscribe((state: any) => {
        console.log("edit employee loaded")
        if (state && state.data) {
          this.employee = state.data; // Assign the data to your component property
          console.log(this.employee);
        }
      });
  }
  // filterSLMOptions():any[]
  // {
  //   return this.managerList.filter(manager=>
  //     {
  //       return manager.empId!==this.selectedFLM
  //     });
  // }

  getAllmanager() {
    
    this.employeeService.getAllManager().subscribe(data => {
      if(this.employee.firstLvlMgrId  !=undefined)
      {
        this.selectedFLM=this.employee.firstLvlMgrId
      }
      
      this.managerList = data.filter(e=> this.employee.empId != e.empId);
    
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
      !this.employee.firstName?.trim() ||
      !this.employee.lastName?.trim() ||
      !this.employee.firstLvlMgrId?.trim() ||
      !this.employee.isManager?.trim() ||
      !this.employee.empId?.trim()
    ) {
      Swal.fire({
        title: 'Failed!',
        text: 'Please Fill All Field.',
        icon: 'error',
        confirmButtonText: 'OK'
      })
      
      return;
    } else {
      
      // Call the service to update the data
      this.employee.firstLvlMgrId=this.selectedFLM
      console.log(this.employee)
      this.employeeService.updateEmployeeDetails(this.employee).subscribe(
        response => {
          // Handle the response from the backend if needed
          this.employee = response;
          this.openSnackBar();
          console.log('Data updated successfully');
        },
        error => {
          console.log(this.employee)
          console.error('Error updating data:', error);
        }
      );
    }
    
  }
  onClick()
  {
    this.router.navigate(['/emploeelist']); // Using single quotes

  }

  openSnackBar() {
    Swal.fire({
      title: 'Update Successfully!',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      this.router.navigate(['/emploeelist']); // Reload the page
    });
    
  }
}
