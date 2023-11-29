export interface EmployeeDetails {
    id?: string;
    empId?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    userName?: string;
    password?: string;
    gender?:string;
    email?: string;
    firstLvlMgrId?: string;
    secondLvlMgrId?: string;
    isManager?: string;
    isAdmin?: string;
    location?: string;
    doj?: Date;
    doe?: Date;
    isActive?: boolean;
    createdDate?: Date;
    createdBy?: string;
    updatedDate?: Date;
    updatedBy?: number;
}
