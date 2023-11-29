export interface LeaveRequest {
    id?: string;
    empId?: string|undefined;
    leaveType?: string;
    leaveDuration?: string;
    day?: number;
    noOfChild?:number,
    leaveStatus?: string;
    leaveDate?: string[];
    leaveReason?: string;
    requestedBy?: string;
    requestedDate?: Date;
    expectedDate?:Date;
    currentAssignee?: string;
    approvedBy?: string;
    approvedDate?: Date;
    cancelReason?: string;
    approvedrejectReason?:string;
    uniqueId?:string;

    employeeFullName?: string;

   
}
