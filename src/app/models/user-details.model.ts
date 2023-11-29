export interface UserDetails {
    empId: string;
    userName?: string;
    password?: string;
    roles?: string[];
    isManager?: string;
    isAdmin?: string;
    isActive?: boolean;
}
