import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { EditorModule } from 'primeng/editor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './common/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplyLeaveComponent } from './leave/apply-leave/apply-leave.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddEpmloyeeComponent } from './admin/add-epmloyee/add-epmloyee.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { FooterComponent } from './common/footer/footer.component';
import { HeaderComponent } from './common/header/header.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { LeaveHistoryComponent } from './leave/leave-history/leave-history.component';
import { ApproveLeaveComponent } from './leave/approve-leave/approve-leave.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { ApprovalDailogComponent } from './leave/approve-leave/approval-dialog/approval-dialog.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { ManageHolidayComponent } from './admin/manage-holiday/manage-holiday.component';
import { DatePipe } from '@angular/common';
import { DialogueViewComponent } from './leave/leave-history/dialogue-view/dialogue-view.component';
import { DialogueCancelComponent } from './leave/leave-history/dialogue-cancel/dialogue-cancel.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { MenuSideBarComponent } from './common/menu-side-bar/menu-side-bar.component';
import { LogoutComponent } from './common/logout/logout.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HeaderInterceptor } from './shared/header-interceptor.interceptor';
import { ChangePassDialogueComponent } from './change-pass-dialogue/change-pass-dialogue.component';
import { EditRecordComponent } from './admin/edit-employee/edit-employee.component';
import { PendingleaveDialogComponent } from './pendingleave-dialog/pendingleave-dialog.component';
import { ProfileDialogComponent } from './profile-dialog/profile-dialog.component';
import { EmployeeListComponent } from './admin/employee-list/employee-list.component';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { HolidayListComponent } from './admin/holiday-list/holiday-list.component';
import { DetailHolidayListComponent } from './detail-holiday-list/detail-holiday-list.component';
import { EmpidVerifyDirective } from './directive/empid-verify.directive';
import { LeavedetailsComponent } from './leave/leavedetails/leavedetails.component';
import { BreadcrumbComponent } from './common/breadcrumb/breadcrumb.component';
import { PageHeadingComponent } from './common/page-heading/page-heading.component';
import { LeaveAppliedDetailComponent } from './leave/leave-applied-detail/leave-applied-detail.component';
import { IndividualLeaveHistoryComponent } from './leave/individual-leave-history/individual-leave-history.component';
import { LeaveBarchartComponent } from './leave/leave-barchart/leave-barchart.component';
import { NgChartsConfiguration, NgChartsModule } from 'ng2-charts';
import { AddleaveComponent } from './leave/leavedetails/addleave/addleave.component';
import { MaternityLeaveComponent } from './leave/maternity-leave/maternity-leave.component';
import { PolicydialogComponent } from './leave/maternity-leave/policydialog/policydialog.component';
import { WorkfromhomeComponent } from './leave/workfromhome/workfromhome.component';
import {NgxMatFileInputModule} from '@angular-material-components/file-input';
import { InfoDetailsComponent } from './dashboard/info-details/info-details.component';
import { PolicyComponent } from './admin/policy/policy.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { LeavePolicyComponent } from './policy/leave-policy/leave-policy.component';
import { ApproveWFHComponent } from './leave/approve-wfh/approve-wfh.component';
import { ApproveWfhDialogComponent } from './leave/approve-wfh/approve-wfh-dialog/approve-wfh-dialog.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { DragAndDropDirectiveDirective } from './drag-and-drop-directive.directive';
import { ProgressComponent } from './progress/progress.component';
import { WfhHistoryComponent } from './leave/wfh-history/wfh-history.component';
import { DialogViewComponent } from './leave/wfh-history/dialog-view/dialog-view.component';
import { DialogCancelComponent } from './leave/wfh-history/dialog-cancel/dialog-cancel.component';
import { MaternityHistoryComponent } from './leave/maternity-history/maternity-history.component';
import { MaternityDialogueViewComponent } from './leave/maternity-history/maternity-dialogue-view/maternity-dialogue-view.component';
import { MaternityDialogueCancelComponent } from './leave/maternity-history/maternity-dialogue-cancel/maternity-dialogue-cancel.component';
import { MaternityApproveComponent } from './leave/maternity-approve/maternity-approve.component';
import { MaternityApproveDialogueComponent } from './leave/maternity-approve/maternity-approve-dialogue/maternity-approve-dialogue.component';
import { PolicyDetailsComponent } from './admin/policy/policy-details/policy-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ApplyLeaveComponent,
    AddEpmloyeeComponent,
    FooterComponent,
    HeaderComponent,
    LeaveHistoryComponent,
    ApproveLeaveComponent,
    ApprovalDailogComponent,
    ManageHolidayComponent,
    DialogueViewComponent,
    DialogueCancelComponent,
    MenuSideBarComponent,
    LogoutComponent,
    ChangePassDialogueComponent,
    EditRecordComponent,
    PendingleaveDialogComponent,
    ProfileDialogComponent,
    EmployeeListComponent,
    HolidayListComponent,
    DetailHolidayListComponent,
    EmpidVerifyDirective,
    LeavedetailsComponent,
    BreadcrumbComponent,
    PageHeadingComponent,
    LeaveAppliedDetailComponent,
    IndividualLeaveHistoryComponent,
    LeaveBarchartComponent,
    AddleaveComponent,
    MaternityLeaveComponent,
    PolicydialogComponent,
    WorkfromhomeComponent,
    InfoDetailsComponent,
    PolicyComponent,
    LeavePolicyComponent,
    ApproveWFHComponent,
    ApproveWfhDialogComponent,
    FileuploadComponent,
    DragAndDropDirectiveDirective,
    ProgressComponent,
    WfhHistoryComponent,
    DialogViewComponent,
    DialogCancelComponent,
    MaternityHistoryComponent,
    MaternityDialogueViewComponent,
    MaternityDialogueCancelComponent,
    MaternityApproveComponent,
    MaternityApproveDialogueComponent,
    PolicyDetailsComponent,

   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatDialogModule,
    MatGridListModule,
    HttpClientModule,
    DatePipe,
    MatProgressSpinnerModule,
    NgChartsModule,
    NgxMatFileInputModule,
    CKEditorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      outerStrokeColor: "#78C000",
      showInnerStroke:false,
      showSubtitle:false,
      animationDuration: 300,
    }),
    MatSnackBarModule
  ],
  providers: [DatePipe, {
    provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true
  },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true,} },
    { provide: NgChartsConfiguration, useValue: { generateColors: false }},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
