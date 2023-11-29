export interface LeaveSummryDetail {
    id?: string;
    empId?: string;
    location?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    leaveType?: string;
    leaveReason?:string;
    leaveStatus?:string;
    leaveDuration?:number;
    leaveDate?:Date[];
    appliedPL?:string;
    appliedCL?:string;
    appliedFL?:string;
    email?:string;
    isActive?:boolean

}
