import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandlerService } from 'src/app/shared/services/http-error-handler.service';
import { environment } from 'src/environments/environment';
import { OrderItem } from '../models/order.item';
import { OrderItemResponse } from '../models/orderResponse';


@Injectable({
  providedIn: 'root'
})
export class OrderItemService {
  private url: string = `${environment.apiUrl}/api/v1.0/OrderItem`;

  constructor(private http: HttpClient, private eh: HttpErrorHandlerService) { }

  createOrderItem(orderItem: OrderItem): Observable<OrderItem> {
    return this.http.post<OrderItem>(this.url, orderItem)
      .pipe(catchError(this.eh.handleError));
  }

  getOrderItem(id: string): Observable<OrderItemResponse> {
    return this.http.get<OrderItemResponse>(`${this.url}/${id}`)
      .pipe(catchError(this.eh.handleError));
  }

  deleteOrderItem(id: string): Observable<OrderItem> {
    return this.http.delete<OrderItem>(`${this.url}/${id}`)
      .pipe(catchError(this.eh.handleError));
  }
}
