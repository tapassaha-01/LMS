import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './common/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplyLeaveComponent } from './leave/apply-leave/apply-leave.component';
import { AddEpmloyeeComponent } from './admin/add-epmloyee/add-epmloyee.component';
import { LeaveHistoryComponent } from './leave/leave-history/leave-history.component';
import { ApproveLeaveComponent } from './leave/approve-leave/approve-leave.component';
import { ApprovalDailogComponent } from './leave/approve-leave/approval-dialog/approval-dialog.component';
import { ManageHolidayComponent } from './admin/manage-holiday/manage-holiday.component';
import { AuthGuard } from './auth.guard';
import { LogoutComponent } from './common/logout/logout.component';
import { EditRecordComponent } from './admin/edit-employee/edit-employee.component';
import { ChangePassDialogueComponent } from './change-pass-dialogue/change-pass-dialogue.component';
import { EmployeeListComponent } from './admin/employee-list/employee-list.component';
import { HolidayMasterService } from './services/holiday-master.service';
import { HolidayListComponent } from './admin/holiday-list/holiday-list.component';
import { DetailHolidayListComponent } from './detail-holiday-list/detail-holiday-list.component';
import { LeavedetailsComponent } from './leave/leavedetails/leavedetails.component';
import { LeaveAppliedDetailComponent } from './leave/leave-applied-detail/leave-applied-detail.component';
import { IndividualLeaveHistoryComponent } from './leave/individual-leave-history/individual-leave-history.component';
import { DialogueCancelComponent } from './leave/leave-history/dialogue-cancel/dialogue-cancel.component';
import { AddleaveComponent } from './leave/leavedetails/addleave/addleave.component';
import { MaternityLeaveComponent } from './leave/maternity-leave/maternity-leave.component';
import { WorkfromhomeComponent } from './leave/workfromhome/workfromhome.component';
import { InfoDetailsComponent } from './dashboard/info-details/info-details.component';
import { PolicyComponent } from './admin/policy/policy.component';
import { ApproveWFHComponent } from './leave/approve-wfh/approve-wfh.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { WfhHistoryComponent } from './leave/wfh-history/wfh-history.component';
import { MaternityHistoryComponent } from './leave/maternity-history/maternity-history.component';
import { PolicyDetailsComponent } from './admin/policy/policy-details/policy-details.component';
import { MaternityApproveComponent } from './leave/maternity-approve/maternity-approve.component';



const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'leave', component: ApplyLeaveComponent, canActivate: [AuthGuard] },
  { path: 'history', component: LeaveHistoryComponent, canActivate: [AuthGuard] },
  { path: 'addemployee', component: AddEpmloyeeComponent, canActivate: [AuthGuard] },
  { path: 'aproval', component: ApproveLeaveComponent, canActivate: [AuthGuard] },
  { path: 'dialog', component: ApprovalDailogComponent, canActivate: [AuthGuard] },
  { path: 'holiday', component: ManageHolidayComponent, canActivate: [AuthGuard] },
  { path: 'emploeelist/editrecord', component: EditRecordComponent, canActivate: [AuthGuard] },
  { path: 'changepassword', component: ChangePassDialogueComponent, canActivate: [AuthGuard] },
  { path: 'logout', component: LogoutComponent },
  { path: 'emploeelist', component: EmployeeListComponent, canActivate: [AuthGuard] },
  { path: 'holidaylist', component: HolidayListComponent, canActivate: [AuthGuard] },
  { path: 'detailholidayList', component: DetailHolidayListComponent, canActivate: [AuthGuard] },
  { path: 'leaveDetail', component: LeavedetailsComponent, canActivate: [AuthGuard] },
  { path: 'leaveAppliedDetail', component: LeaveAppliedDetailComponent, canActivate: [AuthGuard] },
  { path: 'individualHistory', component: IndividualLeaveHistoryComponent, canActivate: [AuthGuard] },
  {path: 'dialogcancel', component: DialogueCancelComponent, canActivate: [AuthGuard]},
  {path: 'adddialog', component: AddleaveComponent, canActivate: [AuthGuard]},
  {path: 'maternityleave', component: MaternityLeaveComponent, canActivate: [AuthGuard]},
  {path: 'wfh', component: WorkfromhomeComponent, canActivate: [AuthGuard]},
  {path:'info',component:InfoDetailsComponent, canActivate: [AuthGuard]},
  {path:'policy',component:PolicyComponent, canActivate: [AuthGuard]},
  {path: 'approvewfh', component: ApproveWFHComponent, canActivate: [AuthGuard]},
  {path: 'fileupload', component: FileuploadComponent, canActivate: [AuthGuard]},
  {path: 'wfh-history', component: WfhHistoryComponent, canActivate: [AuthGuard]},
  {path: 'maternity-history', component: MaternityHistoryComponent, canActivate: [AuthGuard]},
  { path: 'policyDetails', component: PolicyDetailsComponent, canActivate: [AuthGuard] },
  {path: 'approvematernity', component: MaternityApproveComponent, canActivate: [AuthGuard]},

  // Other routes...
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
