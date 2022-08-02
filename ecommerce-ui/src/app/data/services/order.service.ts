import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandlerService } from 'src/app/shared/services/http-error-handler.service';
import { environment } from 'src/environments/environment';
import { GetOrderParams, Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url: string = `${environment.apiUrl}/api/v1.0/Order`;

  constructor(
    private http: HttpClient,
    private eh: HttpErrorHandlerService) { }

  createOrder(): Observable<Order> {
    return this.http.post<Order>(this.url,
      {
        "orderNo": "000001",
        "userId": "1c7f0df8-97ce-4a66-8ecf-e22a76959edc"
      },
      { headers: { 'Content-Type': 'application/json' } })
      .pipe(catchError(this.eh.handleError));
  }

  checkout(orderId: string, email: string): Observable<any> {
    return this.http.post<any>(`${this.url}/checkout`,
    {
      "orderId": orderId,
      "userEmail": email
    },
    { headers: { 'Content-Type': 'application/json' } })
    .pipe(catchError(this.eh.handleError));
  }

  getOrder(id: string, orderParam: GetOrderParams): Observable<Order> {
    let params = {};
    if (orderParam != GetOrderParams.none) {
      params = { [orderParam]: 'true' };
    }

    return this.http.get<Order>(`${this.url}/${id}`, { params: params })
      .pipe(catchError(this.eh.handleError));
  }
}
