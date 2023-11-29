import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HolidayMaster } from 'src/app/models/holiday-master.model';
import { HolidayMasterService, holidayDeleteId } from 'src/app/services/holiday-master.service';
import { AuthonticationService } from 'src/app/shared/authontication.service';
import { CommonServiceService } from 'src/app/shared/common-service.service';

@Component({
  selector: 'app-holiday-list',
  templateUrl: './holiday-list.component.html',
  styleUrls: ['./holiday-list.component.css']
})
export class HolidayListComponent {
  holidayList!: HolidayMaster[]
  newData: holidayDeleteId = {
    id: ''
  }
  isDisabled=false
  constructor(private router: Router, private commonService: CommonServiceService) { }

  selectedCountry: string | null = null;
  countries: string[] = ['India', 'USA', 'Canada', 'Australia'];

  countryToPlaces: { [country: string]: string[] } = {
    'India': ['Kolkata', 'Noida'],
    'USA': ['Place X', 'Place Y', 'Place Z'],
    'Canada': ['Place P', 'Place Q', 'Place R'],
    'Australia': ['Place P', 'Place Q', 'Place R'],
    // Add more country-place mappings as needed
  };

  selectedPlace: string = '';

  ngOnInit() {
    this.commonService.breadcrumbEmitter.emit({
      bcName: "Home",
      bcCurrent: false,
      bcRouterLink: "/",
      bcChild: {
        bcName: "Holiday List",
        bcCurrent: true,
        bcRouterLink: ""
      }
    });
    this.commonService.pageHeadingEmitter.emit("Holiday List");
  }


  onSubmit(place: string) {
    const data = { place };
    this.router.navigate(['/detailholidayList'], { state: { data } });
  }
}
