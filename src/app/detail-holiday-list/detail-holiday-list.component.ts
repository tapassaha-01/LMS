import { Component } from '@angular/core';
import { HolidayMasterService, holidayDeleteId } from '../services/holiday-master.service';
import { HolidayMaster } from '../models/holiday-master.model';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { AuthonticationService } from '../shared/authontication.service';
import { CommonServiceService } from '../shared/common-service.service';

@Component({
  selector: 'app-detail-holiday-list',
  templateUrl: './detail-holiday-list.component.html',
  styleUrls: ['./detail-holiday-list.component.css']
})
export class DetailHolidayListComponent {

  holidayList!: HolidayMaster[]
  newData: holidayDeleteId = {
    id: ''
  }
  records: any = {

  }

  constructor(private userService: HolidayMasterService, private route: ActivatedRoute, public authService: AuthonticationService, private commonService: CommonServiceService) {

    this.route.paramMap
      .pipe(map(() => window.history.state))
      .subscribe((state: any) => {
        if (state && state.data) {
          this.records = state.data; // Assign the data to your component property
          console.log(this.records);
        }
      });

    console.log(this.records.place)

    this.userService.getHolidayList(this.records.place).subscribe(
      data => {
        this.holidayList = data
        console.log(data)
        // this.dataSource = new MatTableDataSource(this.holidayList);
      }
    )
  }

  ngOnInit() {
    this.commonService.breadcrumbEmitter.emit({
      bcName: "Home",
      bcCurrent: false,
      bcRouterLink: "/",
      bcChild: {
        bcName: "Holiday List",
        bcCurrent: false,
        bcRouterLink: "/holidaylist",
        bcChild: {
          bcName: "Detail Holiday List",
          bcCurrent: true,
          bcRouterLink: "/holidaylist"
        }
      }
    });
    this.commonService.pageHeadingEmitter.emit(this.records.place + " - " + " Holiday List");

  }
  displayedColumns: string[] = ['No', 'holidayname', 'holidaytype', 'date', 'delete'];
  // dataSource = new MatTableDataSource(this.holidayList);

  onSubmit(id: string) {

    this.newData.id = id
    console.log(this.newData)
    this.userService.deleteHoliday(this.newData).subscribe(data => {

    });
    window.location.reload();
  }

}
