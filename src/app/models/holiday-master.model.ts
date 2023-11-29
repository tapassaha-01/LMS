export interface HolidayMaster {
    id?: string;
    country?:string;
    holidayPlace?:string;
    holidayName?: string;
    holidayType?: string;
    holidayDate?: Date;
    isActive?: boolean;
    createdBy?: number;
    createdDate?: Date;
    updatedBy?: number;
    updatedDate?: Date;
}
