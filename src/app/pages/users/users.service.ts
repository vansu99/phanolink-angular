import { Injectable } from '@angular/core';
import {ApiService} from "@core/services/api.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private readonly api: ApiService) {}

  updateUserInfo(user: any) {
    return this.api.put('change-info', user)
  }
}
