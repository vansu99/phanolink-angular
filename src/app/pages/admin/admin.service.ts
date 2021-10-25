import { Injectable } from '@angular/core';
import { ApiService } from '@core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private readonly api: ApiService) {}

  getProduct() {
    return this.api.get('products');
  }

  addProduct(data: any) {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('original_price', data.original_price)
    formData.append('description', data.description)
    formData.append('category_id', data.category_id)
    formData.append('discount', data.discount)
    formData.append('status', data.status)
    formData.append('quantity', data.quantity)
    formData.append('image', data.image)
    formData.append('is_gift', data.is_gift)
    formData.append('is_free_shipping', data.is_free_shipping)

    return this.api.post('products', formData);
  }

  updateProduct(data: any) {
    return this.api.put(`products/${data.id}`, data);
  }

  removeProduct(id: number | string) {
    return this.api.delete(`products/${id}`);
  }
}
