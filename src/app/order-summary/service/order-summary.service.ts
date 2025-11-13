import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { K8ExternalIp } from '../../constants/url/url';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = K8ExternalIp+'/order/saveOrder'; 

  constructor(private http: HttpClient) { }

    saveOrder(data: any):Observable<any>  {
    return this.http.post<any>(this.apiUrl, data);
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => error.message || error);
  }
}