export interface WfhRequest {
    id?: string;
    empId?: string;
    workType?: string;
    workDuration?: string;
    day?: number;
    applicationStatus?: string;
    applicationDate?: string[];
    applicationReason?: string;
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
}
