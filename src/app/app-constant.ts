export class AppConstant {

    public static BASE_SERVICE_URL: string = "http://localhost:8080";

    public static LOGIN_API = AppConstant.BASE_SERVICE_URL + "/auth/login";

    public static RESET_API = AppConstant.BASE_SERVICE_URL + "/auth/reset";

    public static GET_LEAVE_SUMMARY_BY_LOGGED_USER = AppConstant.BASE_SERVICE_URL + "/leave-summary";

    public static GET_LEAVE_SUMMARY_FOR_APPLIED_LEAVE= AppConstant.BASE_SERVICE_URL + "/leave-request"+"/leave-history";
    public static GET_INDIVIDUAL_LEAVE_SUMMARY_FOR_APPLIED_LEAVE= AppConstant.BASE_SERVICE_URL + "/leave-request"+"/employee-leave-history";


    public static LIST_LEAVE_SUMMARY = AppConstant.BASE_SERVICE_URL + "/leave-summary/get";
    public static ADD_LEAVE = AppConstant.BASE_SERVICE_URL + "/leave-summary/addleave";
    public static GET_EXCEL_EMPLOYEEDETAILS = AppConstant.BASE_SERVICE_URL + "/leave-summary/get/Excel";

    public static GET_LEAVE_REQUESTS_BY_ID = AppConstant.BASE_SERVICE_URL + "/leave-request";
    public static GET_LEAVE_REQUESTS_BY_EMP_ID = AppConstant.BASE_SERVICE_URL + "/leave-request/get";
    public static GET_LEAVE_REQUESTS_BY_MANAGER = AppConstant.BASE_SERVICE_URL + "/leave-request/approve-request";
    public static GET_LEAVE_TAKEN_BY_MONTH = AppConstant.BASE_SERVICE_URL + "/leave-request/leavetakenbymonth";
    public static GET_INDIVIDUAL_APR_PND_LEAVE = AppConstant.BASE_SERVICE_URL + "/leave-request/individual-leave-history";
    
    public static GET_DOCUMENT_DOWNLOAD=AppConstant.BASE_SERVICE_URL + "/leave-request/download";

    public static GET_LEAVE_SUMMRY_FOR_ALL = AppConstant.BASE_SERVICE_URL + "/leave-summary/get/ALL";

    public static POST_APPROVE_LEAVE = `${this.BASE_SERVICE_URL}/leave-request/approval`;
    public static POST_APPLY_LEAVE = `${this.BASE_SERVICE_URL}/leave-request/apply`;
    public static POST_SUBMIT_CANCEL_LEAVE = `${this.BASE_SERVICE_URL}/leave-request/submit-cancellation`;
    public static POST_WFH_APPLY = `${this.BASE_SERVICE_URL}/wfh-request/upload-WFH-attachment`

    public static GET_HOLIDAY_LIST = AppConstant.BASE_SERVICE_URL + "/holiday/holidayList";
    public static SAVE_HOLIDAY = AppConstant.BASE_SERVICE_URL + "/holiday/holidayPost";
    public static DELETE_HOLIDAY = AppConstant.BASE_SERVICE_URL + "/holiday/deletePost";

    public static POST_SAVE_EMPLOYEE = AppConstant.BASE_SERVICE_URL + "/employee-details";
    public static POST_UPDATE_EMPLOYEE = AppConstant.BASE_SERVICE_URL + "/employee-details/edit";

    public static GET_ALL_EMPLOYEE = AppConstant.BASE_SERVICE_URL + "/employee-details";

    public static GET_CHECK_EMPLOYEE_ID = `${this.BASE_SERVICE_URL}/employee-details/checkempid`;
    public static GET_CHECK_USERNAME = `${this.BASE_SERVICE_URL}/employee-details/checkusername`;
    public static GET_CHECK_EMAIL = `${this.BASE_SERVICE_URL}/employee-details/checkemail`;

    public static GET_FETCH_ACTIVE_MANAGERS = AppConstant.BASE_SERVICE_URL + "/employee-details/fetch-managers";

    public static POST_LEAVE_POLICY_DETAILS = AppConstant.BASE_SERVICE_URL + "/leave-policy/upload-policy-details";
    public static GET_LEAVE_POLICY_DETAILS = AppConstant.BASE_SERVICE_URL + "/leave-policy/get-policy-details";

    public static POST_APPLY_WFH=AppConstant.BASE_SERVICE_URL+"/wfh-request/apply"
    public static LIST_WFH_SUMMARY = AppConstant.BASE_SERVICE_URL+"/wfh-request/get";

    public static GET_WFH_REQUESTS_BY_ID = AppConstant.BASE_SERVICE_URL + "/wfh-request";
    public static POST_APPROVE_LEAVE_WFH = `${this.BASE_SERVICE_URL}/wfh-request/approval`;
    public static GET_LEAVE_REQUESTS_BY_MANAGER_WFH = AppConstant.BASE_SERVICE_URL + "/wfh-request/approve-request";
    public static POST_SUBMIT_CANCEL_WFH = `${this.BASE_SERVICE_URL}/wfh-request/submit-cancellation`;

    public static POST_APPLY_MATERNITY=AppConstant.BASE_SERVICE_URL+"/maternity-request/apply"
    public static LIST_MATERNITY_SUMMARY = AppConstant.BASE_SERVICE_URL+"/maternity-request/get";
    public static GET_MATERNITYLEAVE_REQUESTS_BY_ID = AppConstant.BASE_SERVICE_URL + "/maternity-request";
    public static POST_SUBMIT_CANCEL_MATERNITY_LEAVE = `${this.BASE_SERVICE_URL}/maternity-request/submit-cancellation`;
    public static POST_MATERNITY_APPLY = `${this.BASE_SERVICE_URL}/maternity-request/upload-Maternity-attachment`;

    public static GET_MATERNITYLEAVE_REQUESTS_BY_MANAGER_WFH = AppConstant.BASE_SERVICE_URL + "/maternity-request/approve-request";
    public static POST_APPROVE_LEAVE_MATERNITY = `${this.BASE_SERVICE_URL}/maternity-request/approval`;
    public static GET_MATERNITYLEAVE_TAKEN_BY_MONTH = AppConstant.BASE_SERVICE_URL + "/maternity-request/leavetakenbymonth";
     
    public static POST_FILEMETADATA_WFH = AppConstant.BASE_SERVICE_URL + "/wfh-request/get-filemeta";
    public static POST_FILEDATA_WFH = AppConstant.BASE_SERVICE_URL + "/wfh-request/get-file";
}