import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { UserState } from '@features/auth/auth.model';
import { AuthService } from '@features/auth/auth.service';
import { generateYear } from '@shared/utils/generateYear';
import { UsersService } from '@pages/users/users.service';
import { AlertMessageService } from '@core/services/alert-message.service';

@Component({
  selector: 'phanolink-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  host: {
    class: 'userInfo',
  },
})
export class UserInfoComponent implements OnInit {
  userInfoForm!: FormGroup;
  days: number[] = Array.from(Array(31), (_, i) => i + 1);
  months: number[] = Array.from(Array(12), (_, i) => i + 1);
  years: number[] = generateYear();

  constructor(
    private readonly fb: FormBuilder,
    private readonly auth: AuthService,
    private readonly users: UsersService,
    private readonly alertMsg: AlertMessageService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.auth.currentUser.subscribe((user) => {
      this.updateForm(user);
    });
  }

  initForm() {
    this.userInfoForm = this.fb.group({
      name: this.fb.control('', Validators.required),
      email: this.fb.control('', Validators.compose([Validators.required, Validators.email])),
      phone: this.fb.control('', Validators.required),
      gender: this.fb.control('', Validators.required),
      birthday: this.fb.group({
        day: this.fb.control(''),
        month: this.fb.control(''),
        year: this.fb.control(''),
      }),
      isChangePassword: this.fb.control(false),
      old_password: this.fb.control(''),
      new_password: this.fb.control(''),
      new_password_confirmation: this.fb.control(
        '',
        Validators.compose([Validators.required, this.checkMatchPassword()])
      ),
    });
  }

  updateForm(userInfo: UserState) {
    const day = userInfo?.birthday?.slice(0, 1).replace('0', '');
    const month = userInfo?.birthday?.slice(2, 3).replace('0', '');
    const year = userInfo?.birthday?.slice(4);
    console.log(month, year, userInfo?.birthday);

    this.userInfoForm.patchValue({
      name: userInfo?.name,
      email: userInfo?.email,
      phone: userInfo?.phone,
      gender: userInfo?.gender,
      birthday: {
        day,
        month,
        year,
      },
    });
  }

  checkMatchPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const pass = this.userInfoForm?.value.new_password;
      const confirmPass = control.value;
      return pass === confirmPass ? null : { notSame: true };
    };
  }

  onSubmit() {
    const { birthday, isChangePassword, name, email, phone, gender } = this.userInfoForm.value;
    if (!isChangePassword) {
      const newValueFormNotPwd = {
        name,
        email,
        phone,
        gender,
        birthday: Object.values(birthday).join('/'),
      };
      this.users.updateUserInfo(newValueFormNotPwd).subscribe((res) => {
        if (res.body.success) {
          this.alertMsg.success('Cập nhật thành công.');
        }
      });
    } else {
      const newValueForm = {
        ...this.userInfoForm.value,
        birthday: Object.values(birthday).join('/'),
      };
      delete newValueForm.isChangePassword;
      this.users.updateUserInfo(newValueForm).subscribe((res) => {
        if (res.body.success) {
          this.alertMsg.success('Cập nhật thành công.');
        }
      });
    }
  }
}
