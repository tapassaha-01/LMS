import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AppConstant } from '../app-constant';
import { UserDetails } from '../models/user-details.model';
import { Observable } from 'rxjs';
import { ResetPassword } from '../models/reset-password';

@Injectable({
  providedIn: 'root'
})
export class AuthonticationService {

  constructor(private http: HttpClient) { }

  private _token: string | null = '';
  private _userDetails: UserDetails | null = null;
 

  public set setToken(token: string | null) {
    sessionStorage.setItem("token", token ? token : "");
    this._token = token
  }

  public get getToken(): string | null {
    return this._token ? this._token : sessionStorage.getItem("token");
  }

  public set setUserDetails(userDetails: UserDetails | null) {
    sessionStorage.setItem("user-details", userDetails ? JSON.stringify(userDetails) : "{}");
    this._userDetails = userDetails;
  }

  public get getUserDetails(): UserDetails | null {
    if (this._userDetails) {
      return this._userDetails;
    } else {
      var userDtls = sessionStorage.getItem("user-details");
      return JSON.parse(userDtls ? userDtls : "{}");
    }
  }

  public getLoggedInEmpId(): string | undefined {
    return this.getUserDetails?.empId ? this.getUserDetails?.empId : undefined;
  }

  public login(userDetails: UserDetails): Observable<HttpResponse<UserDetails>> {
    return this.http.post<any>(AppConstant.LOGIN_API, userDetails, { observe: 'response' });
  }

  public resetPassword(resetPassword: ResetPassword): Observable<ResetPassword> {
    return this.http.post<ResetPassword>(AppConstant.RESET_API, resetPassword);
  }


  public isAdmin(): boolean {
    return this.getUserDetails?.isAdmin !== undefined && this.getUserDetails?.isAdmin?.toLocaleLowerCase() == "yes";
  }

  public isLoggedIn(): boolean {
    return this.getUserDetails?.empId !== undefined && this.getUserDetails?.empId !== null;
  }

  public isManager(): boolean {
   
    return this.getUserDetails?.isManager !== undefined && this.getUserDetails?.isManager?.toLowerCase() === 'yes';
  }

  public isEmployee(): boolean {
    return (this.getUserDetails?.isAdmin === undefined || this.getUserDetails?.isAdmin?.toLowerCase() !== 'yes')
      && this.getUserDetails?.isManager === undefined || this.getUserDetails?.isManager?.toLowerCase() !== 'yes';
  }

  userDesignation(): any {
    if (this.isManager()) {
      return 'Manager';
    }
    else if (this.isAdmin()) {
      return 'Admin'
    }
    else {
      return 'Employee'
    }
  }

  logout() {
    this.setUserDetails = null;
    sessionStorage.removeItem('user-details');
  }

}
