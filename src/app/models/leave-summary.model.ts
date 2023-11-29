export interface LeaveSummary {
    id?: string;
   firstName?:string;
   middleName?:string;
   lastName?:string;
    empId?: string;
    totalPL: number;
    totalCL: number;
    totalFL: number;

    remaingPL: number;
    remaingCL: number;
    remaingFL: number;

    remaingLeave : number;

    lastUpdDate?: Date;
    lastUpdBy?: string;

    pendingCL?:number;
    pendingFL?:number;
    pendingPL?:number;

    totalPending?:number;
}
