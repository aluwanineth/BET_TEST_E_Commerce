import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandlerService } from 'src/app/shared/services/http-error-handler.service';
import { environment } from 'src/environments/environment';
import { ProductResponse } from '../models/product.response';
import { ProductsResponse } from '../models/productsResponse';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url: string = `${environment.apiUrl}/api/v1.0/Product`;

  constructor(private http: HttpClient, private eh: HttpErrorHandlerService) { }

  getProduct(id: string): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.url}/${id}`)
      .pipe(catchError(this.eh.handleError));
  }

  getProducts(pageNumber: number, pageSize: number): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(
      this.url,
      {
        params: {
          'PageNumber': pageNumber.toString(),
          'PageSize': pageSize.toString()
        }
      })
      .pipe(catchError(this.eh.handleError));
  }
}
