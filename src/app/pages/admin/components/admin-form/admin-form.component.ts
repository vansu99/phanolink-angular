import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from '@pages/admin/admin.service';
import { ProductsService } from '@pages/products/products.service';
import { AlertMessageService } from '@core/services/alert-message.service';
import { ConfirmDialogService } from '@shared/components/confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'phanolink-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss'],
})
export class AdminFormComponent implements OnInit {
  adminForm!: FormGroup;
  categoryList: any[] = [];
  discount: number[] = [10, 15, 20, 25, 30];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly fb: FormBuilder,
    private readonly product: ProductsService,
    private readonly adminService: AdminService,
    private readonly alertMsg: AlertMessageService,
    private readonly dialogRef: MatDialogRef<AdminFormComponent>,
    private readonly confirm: ConfirmDialogService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCategory();
    if (this.data?.productDetail) {
      this.updateForm();
    }
  }

  loadCategory() {
    this.product.getCategory().subscribe((response) => (this.categoryList = [...response]));
  }

  initForm() {
    this.adminForm = this.fb.group({
      name: this.fb.control(''),
      original_price: this.fb.control(0),
      description: this.fb.control(''),
      category_id: this.fb.control(''),
      discount: this.fb.control(''),
      status: this.fb.control(''),
      quantity: this.fb.control(''),
      image: this.fb.control(null),
      is_gift: this.fb.control(Number(false)),
      is_free_shipping: this.fb.control(Number(false)),
    });
  }

  onSubmit() {
    const newProduct = {
      ...this.adminForm.value,
      original_price: Number(this.adminForm.value.original_price),
      discount: Number(this.adminForm.value.discount),
      category_id: Number(this.adminForm.value.category_id),
      quantity: Number(this.adminForm.value.quantity),
      is_gift: Number(this.adminForm.value.is_gift),
      is_free_shipping: Number(this.adminForm.value.is_free_shipping),
    };
    this.adminService.addProduct(newProduct).subscribe((response) => {
      if (response) {
        this.alertMsg.success('Thêm thành công.');
        this.adminForm.reset();
        this.dialogRef.close();
      }
    });
  }

  updateForm() {
    const {
      name,
      original_price,
      description,
      category_id,
      discount,
      status,
      quantity,
      img_path,
      is_gift,
      is_free_shipping,
    } = this.data.productDetail;
    this.adminForm.setValue({
      name,
      original_price,
      description,
      category_id,
      discount,
      status: 'Còn hàng',
      quantity,
      image: img_path,
      is_gift: is_gift,
      is_free_shipping,
    });
  }

  onUpdate() {
    const updatedProduct = {
      ...this.adminForm.value,
      id: this.data.productDetail.id,
      original_price: Number(this.adminForm.value.original_price),
      discount: Number(this.adminForm.value.discount),
      category_id: Number(this.adminForm.value.category_id),
      quantity: Number(this.adminForm.value.quantity),
      is_gift: Number(this.adminForm.value.is_gift),
      is_free_shipping: Number(this.adminForm.value.is_free_shipping),
    };
    this.adminService.updateProduct(updatedProduct).subscribe((response: any) => {
      if (response.body.data?.id) {
        this.alertMsg.success('Cập nhật thành công.');
      }
      this.dialogRef.close();
    });
  }

  onDelete(id: number | string) {
    this.confirm
      .openConfirmDialog('Bạn có chắc muốn xóa sản phẩm này?')
      .afterClosed()
      .subscribe((res: any) => {
        if (id && res) {
          this.adminService.removeProduct(id).subscribe();
          this.alertMsg.success('Xóa thành công.');
          this.dialogRef.close();
        }
      });
  }

  onClose() {
    this.dialogRef.close();
  }

  onFileChange(event: Event) {
    // @ts-ignore
    const file = (event.target as HTMLInputElement).files[0];
    this.adminForm.patchValue({
      image: file,
    });
    this.adminForm.get('image')?.updateValueAndValidity();
  }
}
