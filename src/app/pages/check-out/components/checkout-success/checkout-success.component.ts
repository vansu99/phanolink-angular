import { Component, OnInit } from '@angular/core';
import { STORAGE_KEYS, StorageService } from '@core/services/storage.service';

@Component({
  selector: 'phanolink-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.scss'],
})
export class CheckoutSuccessComponent implements OnInit {
  idPayment!: any;
  constructor(private readonly storage: StorageService) {}

  ngOnInit(): void {
    this.idPayment = this.storage.getValue<any[]>(STORAGE_KEYS.PAYMENT);
  }
}
