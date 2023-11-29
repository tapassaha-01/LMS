import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { AuthonticationService } from '../../shared/authontication.service';
import { UserDetails } from 'src/app/models/user-details.model';
import { ResetPassword } from 'src/app/models/reset-password';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  empId: string = ""
  password: string = ""
  user: UserDetails = {
    empId: ""
  };
  isLoggedIn: any;
  resetPassworddetails: ResetPassword = {}


  constructor(private router: Router,
    private authService: AuthonticationService) {

  }

  showForgetPassword: boolean = false;

  toggleForgetPassword() {
    this.showForgetPassword = !this.showForgetPassword;
  }



  login(): void {
    this.authService.login(this.user).subscribe(
      (resp: HttpResponse<any>) => {
        if (resp.body != null) {
          let data = resp.body;
          // Assuming 'data' is the response from the API
          let token = resp.headers.get('Authorization');
          this.authService.setToken = token;
          this.authService.setUserDetails = data;

          // Save the received data into the SharedDataService
          if (data.isActive) {
            // Successful login, navigate to appropriate dashboard based on role
            this.isLoggedIn = this.authService.isLoggedIn();
            if (this.authService.isAdmin()) {
              this.router.navigate(['/dashboard']);
            } else if (this.authService.isManager()) {
              this.router.navigate(['/dashboard']);
            } else if (this.authService.isEmployee()) {
              this.router.navigate(['/dashboard']);
            }
          }
        }
        else{
          Swal.fire({
            title: 'Failed!',
            text: 'Ohooo...Sorry Please Re-Check Your password or userid.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      },
      (error: any) => {
        Swal.fire({
          title: 'Failed!',
          text: 'Ohooo...Sorry Please Re-Check Your password and userid.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }


  forgetPassword() {
    console.log(this.resetPassworddetails)

    this.authService.resetPassword(this.resetPassworddetails).subscribe(data => {
      this.resetPassworddetails = data
      if (this.resetPassworddetails.status === 'SUCCESS') {
        Swal.fire({
          title: 'Successfully saved!',
          text: 'New password sent to your email.',
          icon: 'success',
          confirmButtonText: 'OK'
        });

      }
      else {
        Swal.fire({
          title: 'Failed!',
          text: 'Ohooo...Sorry Please Re-Check Your userid.',
          icon: 'error',
          confirmButtonText: 'OK'
        });

      }
    });



  }

}

