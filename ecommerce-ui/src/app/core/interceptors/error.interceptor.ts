import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {

          if (Object.keys(this.authenticationService.currentUserValue).length !== 0) {
            if ([401, 403].includes(err.status) && this.authenticationService.currentUserValue) {
              // auto logout if 401 response returned from api
              console.log('Error login in: ', err.status);
              this.authenticationService.logout();
            }
          }

          const error = err.error.message || err.statusText;
          console.log(err.error);
          return throwError(err.error);
        }));
    }
}
