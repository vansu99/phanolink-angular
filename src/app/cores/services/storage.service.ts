import { Injectable } from '@angular/core';

export enum STORAGE_KEYS {
  TOKEN = 'token',
  USER = 'user',
  CART = 'carts',
  PAYMENT= 'payment'
}

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  storage!: Storage;
  constructor() {
    this.storage = window.localStorage;
  }

  set(key: STORAGE_KEYS, value: string): void {
    this.storage[key] = value;
  }

  get(key: STORAGE_KEYS): string {
    return this.storage[key] || '';
  }

  setObject(key: STORAGE_KEYS, value: any): void {
    if (!value) return;
    this.storage[key] = JSON.stringify(value);
  }

  getObject(key: STORAGE_KEYS): any {
    return JSON.parse(this.storage[key] || '{}');
  }

  getValue<T>(key: STORAGE_KEYS): T {
    const obj = JSON.parse(this.storage[key] || null);
    return <T>obj;
  }

  remove(key: STORAGE_KEYS): any {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }

  get length(): number {
    return this.storage.length;
  }

  get isStorageEmpty(): boolean {
    return this.length === 0;
  }
}
