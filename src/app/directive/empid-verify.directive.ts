import { Directive, Input } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ValidateFieldService } from '../services/validate-field.service';

@Directive({
  selector: '[appEmpidVerify]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS,
    useExisting: EmpidVerifyDirective,
    multi: true
  }]
})
export class EmpidVerifyDirective implements AsyncValidator {

  @Input("appEmpidVerify") recordId!: string | undefined

  @Input('source') source !: string;


  constructor(private validateService: ValidateFieldService) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    if (this.source == 'empId') {
      return this.validateService.validateEmpid(control.value, this.recordId ? this.recordId : "null").pipe(
        map((res) => {
          return res ? { empidInvalid: true } : null;
        }),
        catchError(() => {
          return of(null);
        })
      );
    }
    else if (this.source == 'userName') {
      return this.validateService.validateUserName(control.value, this.recordId ? this.recordId : "null").pipe(
        map((res) => {
          return res ? { empidInvalid: true } : null;
        }),
        catchError(() => {
          return of(null);
        })
      );
    }
    else if (this.source == 'email') {
      return this.validateService.validateEmail(control.value, this.recordId ? this.recordId : "null").pipe(
        map((res) => {
          return res ? { empidInvalid: true } : null;
        }),
        catchError(() => {
          return of(null);
        })
      );
    }
    return of(null);
  }
}
