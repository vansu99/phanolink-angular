import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '@features/auth/auth.service';

@Component({
  selector: 'phanolink-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  error!: Observable<string>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly auth: AuthService
  ) {
    this.error = this.auth.errorMsg$;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formLogin = this.fb.group({
      email: this.fb.control(
        '',
        Validators.compose([Validators.required, this.validEmailOrPhoneNumber()])
      ),
      password: this.fb.control(
        '',
        Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(32)])
      ),
    });
  }

  onSubmit() {
    const formValue = this.formLogin.value;
    this.auth.login(formValue);
  }

  validEmailOrPhoneNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let emailOrPhone = control.value;
      let regexEmail = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
      let regexPhoneNumber = new RegExp(
        '(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$'
      );

      if (!emailOrPhone) return null;

      if (regexEmail.test(emailOrPhone) || regexPhoneNumber.test(emailOrPhone)) {
        return null;
      } else {
        return { invalidField: true };
      }
    };
  }
}
