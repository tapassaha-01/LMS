export interface MaternityLeaveRequest {
    id?: string;
    empId?: string;
    leaveType?: string;
    leaveDuration?: string;
    day?: number;
    leaveStatus?: string;
    leaveDate?: string[];
    leaveReason?: string;
    requestedBy?: string;
    requestedDate?: Date;
    currentAssignee?: string;
    approvedBy?: string;
    approvedDate?: Date;
    cancelReason?: string;
    approvedrejectReason?: string;
    isActive?: boolean;
    createdBy?: string;
    createdDate?: Date;
    updatedBy?: string;
    updatedDate?: Date;
    uniqueId?: string;
     expectedDeliveryDate?: Date;
   noOfChild?: number;  
}
