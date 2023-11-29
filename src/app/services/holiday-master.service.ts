import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HolidayMaster } from '../models/holiday-master.model';
import { AppConstant } from '../app-constant';
import { LeaveSummary } from '../models/leave-summary.model';



export interface holidayDeleteId{
  id:string;
}

@Injectable({
  providedIn: 'root'
})
export class HolidayMasterService {

  constructor(private httpClient: HttpClient) { }

  getHolidayList(data:string): Observable<HolidayMaster[]> {
    const newurl=`${AppConstant.GET_HOLIDAY_LIST}/${data}`
    return this.httpClient.get<HolidayMaster[]>(newurl);
  }

  getHolidayListForEmployee(): Observable<HolidayMaster[]> {
    return this.httpClient.get<HolidayMaster[]>(AppConstant.GET_HOLIDAY_LIST);
  }

  saveHoliday(holidayMaster: HolidayMaster): Observable<HolidayMaster> {
    const url = AppConstant.SAVE_HOLIDAY;
    console.log(holidayMaster)
    return this.httpClient.post<HolidayMaster>(url, holidayMaster);
  }
 
  deleteHoliday(data:holidayDeleteId): Observable<any>
  {
    const url= AppConstant.DELETE_HOLIDAY;
    return this.httpClient.post<any>(url,data);
  }

  getLeaveSummry()
  {
    return this.httpClient.get<LeaveSummary[]>(AppConstant.GET_LEAVE_SUMMRY_FOR_ALL);
  }

  getExcelData(): Observable<Blob> {
    return this.httpClient.get(AppConstant.GET_EXCEL_EMPLOYEEDETAILS, { responseType: 'blob' });
  }

}
