import { Component, OnInit } from '@angular/core';
import { AuthService } from '@features/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '@features/auth/login/login.component';
import { DialogFormComponent } from '@layouts/public-layout/components/phanolink-header/modals/dialog-form/dialog-form.component';

@Component({
  selector: 'phanolink-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  userInfo = '';
  formRegister!: FormGroup;
  isRegisterSuccess = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly auth: AuthService,
    private readonly dialog: MatDialog,
    private readonly dialogRef: MatDialogRef<LoginComponent>
  ) {}

  ngOnInit(): void {
    this.initFormLogin();
  }

  initFormLogin() {
    this.formRegister = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      email: this.fb.control('', Validators.compose([Validators.required, Validators.email])),
      password: this.fb.control(
        '',
        Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(32)])
      ),
      phone: this.fb.control(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            '(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$'
          ),
        ])
      ),
      notifySale: this.fb.control(false),
    });
  }

  onSubmit() {
    const { name, email, password, phone } = this.formRegister.value;
    this.auth.register({ name, email, password, phone }).subscribe(({ success, data }: any) => {
      if (success) {
        this.isRegisterSuccess = true;
        this.userInfo = data.email;
      }
      return;
    });
  }

  openLogin() {
    this.dialog.open(DialogFormComponent, {
      width: '470px',
      panelClass: 'custom-dialog-form',
      data: {
        isLoginActive: true,
      },
    });
    this.dialogRef.close();
  }
}
