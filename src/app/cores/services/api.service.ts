import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = 'https://boiling-brook-88386.herokuapp.com/api';
  constructor(private readonly http: HttpClient) {}

  get(
    path: string,
    params?: { [header: string]: string | string[] | number },
    headers?: { [header: string]: string | string[] }
  ): Observable<HttpResponse<any>> {
    return this.http.get(this.baseUrl + '/' + path, {
      params,
      headers,
      observe: 'response',
      responseType: 'json',
    });
  }

  post(
    path: string,
    body: any = null,
    params?: { [header: string]: string | string[] },
    headers?: { [header: string]: string | string[] }
  ): Observable<HttpResponse<any>> {
    return this.http.post(this.baseUrl + '/' + path, body, {
      params,
      headers,
      observe: 'response',
      responseType: 'json',
    });
  }

  put(
    path: string,
    body: any = null,
    params?: { [header: string]: string | string[] },
    headers?: { [header: string]: string | string[] }
  ): Observable<HttpResponse<any>> {
    return this.http.put(this.baseUrl + '/' + path, body, {
      params,
      headers,
      observe: 'response',
      responseType: 'json',
    });
  }

  delete(
    path: string,
    params?: { [header: string]: string | string[] },
    headers?: { [header: string]: string | string[] }
  ): Observable<HttpResponse<any>> {
    return this.http.delete(this.baseUrl + '/' + path, {
      params,
      headers,
      observe: 'response',
      responseType: 'json',
    });
  }
}
