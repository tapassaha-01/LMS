import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HolidayMasterService } from '../../services/holiday-master.service';
import { HolidayMaster } from '../../models/holiday-master.model';
import Swal from 'sweetalert2';
import { CommonServiceService } from 'src/app/shared/common-service.service';
import moment from 'moment';



@Component({
  selector: 'app-manage-holiday',
  templateUrl: './manage-holiday.component.html',
  styleUrls: ['./manage-holiday.component.css']
})
export class ManageHolidayComponent {

  

  constructor(private _snackBar: MatSnackBar, private holidayMasterService: HolidayMasterService, private commonService: CommonServiceService) { }

  holidayMasterInput: HolidayMaster = {};

  selectedCountry: string | null = null;
  countries: string[] = ['India', 'USA', 'Canada','Australia']; 

  countryToPlaces: { [country: string]: string[] } = {
    'India': ['Kolkata', 'Noida'],
    'USA': ['Place X', 'Place Y', 'Place Z'],
    'Canada': ['Place P', 'Place Q', 'Place R'],
    'Australia': ['Place P', 'Place Q', 'Place R'],
    // Add more country-place mappings as needed
  };

  

  ngOnInit() {
    this.commonService.breadcrumbEmitter.emit({
      bcName: "Home",
      bcCurrent: false,
      bcRouterLink: "/",
      bcChild: {
        bcName: "Manage Holiday",
        bcCurrent: true,
        bcRouterLink: "/holiday"
      }
    });
    this.commonService.pageHeadingEmitter.emit("Manage Holiday");
  }

  onSubmit() {
     console.log(this.holidayMasterInput)
    if (!this.holidayMasterInput.holidayType || !this.holidayMasterInput.holidayName
      || !this.holidayMasterInput.holidayDate) {
        Swal.fire({
          title: 'Failed!',
          text:'Please Fill All Field',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      return;
    }
    else {

      
      var myDate = new Date(moment(this.holidayMasterInput.holidayDate).format("YYYY-MM-DD"))
      this.holidayMasterInput.holidayDate=myDate
      this.holidayMasterService.saveHoliday(this.holidayMasterInput).subscribe(savedHoliday => {
        console.log("saved holiday", savedHoliday);
        if (savedHoliday) {
          this.openSnackBar();
        }
      });
    }
  }

  openSnackBar() {
    Swal.fire({
      title: 'Holiday Added Successfully!',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      location.reload(); // Reload the page
    });
  }

  holidayDateFilter = (date: Date | null): boolean => {
    // check if date is weekend day
    // if (date?.getDay() === 0 || date?.getDay() === 6) {
    //   return false;
    // }
    return true;

    // check if date is holiday
    // let d = moment(date);
    // if (this.holidayList) {
    //   return !this.holidayList.find(x => {
    //     return moment(x.holidayDate).isSame(d, 'day');
    //   });
    // } else {
    //   return true;
    // }
  };

}
