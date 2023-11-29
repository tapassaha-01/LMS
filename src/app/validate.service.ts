import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface UpdatePassword {
  oldPassword: string;
  newPassword: string;
}

@Injectable({
  providedIn: 'root'
})
export class ValidateService {
  validateUrl: any;
  updateUrl: any
  constructor(private http: HttpClient) {
    this.validateUrl = 'http://localhost:8080/auth/getPwd'
    this.updateUrl = 'http://localhost:8080/auth/update'
  }

  async validateOldPassword(oldPassword: string): Promise<boolean> {
    try {
      const url = `${this.validateUrl}/${oldPassword}`
      const response: any = await this.http.get<boolean>(url).toPromise();
      return response;
    } catch (error) {
      // Handle error
      throw error;
    }
  }

  updatePassword(data: UpdatePassword): Observable<any> {
    const url = `${this.updateUrl}`;
    console.log(data)

    return this.http.post<void>(url, data);
  }
}
