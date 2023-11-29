import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { ValidateService } from '../validate.service';

export class OldPwdValidators {
  static isValidOldPassword(validService:ValidateService): AsyncValidatorFn {
    return async (control: AbstractControl): Promise<ValidationErrors | null> => {
      const oldPassword = control.value;
      console.log('call')
      if (!oldPassword) {
        return null; // No need to validate if the field is empty
      }

      try {
        const isValid = await validService.validateOldPassword(oldPassword);
        return isValid ? null : { invalidOldPwd: true };
      } catch (error) {
        return null; // You can handle the error if needed
      }
    };
  }

  // static matchPwds(control: AbstractControl) {
  //   let newPwd2 = control.get('newPassword');
  //   let confirmPwd2 = control.get('confirmPassword');
  //    console.log(newPwd2?.value)
  //   if(newPwd2?.value !== confirmPwd2?.value){
  //     console.log(confirmPwd2)
  //     return { pwdsDontMatch: true };
  //   }
  //   return null;
  // }
}