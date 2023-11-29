import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OldPwdValidators } from './old-pwd.validators';
import { UpdatePassword, ValidateService } from '../validate.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-pass-dialogue',
  templateUrl: './change-pass-dialogue.component.html',
  styleUrls: ['./change-pass-dialogue.component.css']
})
export class ChangePassDialogueComponent {

  changePasswordForm: FormGroup;
  changPassword: UpdatePassword = {
    oldPassword: '',
    newPassword: ''

  }
  constructor(fb: FormBuilder, private validService: ValidateService) {
    this.changePasswordForm = fb.group({
      'oldPassword': ['', Validators.required, OldPwdValidators.isValidOldPassword(this.validService)],
      'newPassword': ['', Validators.required],
      'confirmPassword': ['', Validators.required]
    }, {
      // validator: OldPwdValidators.matchPwds
    });
  }
  label: string = 'Current Password'
  labelchange() {
    if (this.confirmPassword?.touched) {
      if (this.confirmPassword.hasError('required')) {
        return 'Password should not be empty';
      } else if (!(this.newPassword?.value === this.confirmPassword?.value)) {
        return 'Passwords do not match';
      }
    }
    return 'Current Password';

  }

  labelchange1() {
    if (this.newPassword?.touched) {
      if (this.newPassword.hasError('required')) {
        return 'Password should not be empty';
      }
    }
    return 'New Password';

  }

  get oldPassword() {
    return this.changePasswordForm.get('oldPassword');
  }

  get newPassword() {
    // console.log(this.changePasswordForm.get('newPassword'))
    return this.changePasswordForm.get('newPassword');
  }

  get confirmPassword() {
    return this.changePasswordForm.get('confirmPassword');
  }
  onSubmit() {
    if (this.newPassword?.value === this.confirmPassword?.value) {
      this.changPassword.oldPassword = this.oldPassword?.value
      this.changPassword.newPassword = this.newPassword?.value

      console.log(this.changPassword)
      this.validService.updatePassword(this.changPassword).subscribe(
        res => {
          console.log(res)
          if (res === true) {
            Swal.fire({
              title: 'Password Changed Successfully!',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              location.reload(); // Reload the page
            });
          }
        }
      )
    }




  }
}
