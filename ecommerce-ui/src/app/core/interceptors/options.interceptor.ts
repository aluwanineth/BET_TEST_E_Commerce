import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService
      ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if( this.authenticationService.currentUserValue){
      if (Object.keys(this.authenticationService.currentUserValue).length !== 0) {
        const user = this.authenticationService.currentUserValue;
        const isLoggedIn = user && user.data.jwToken;
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${user.data.jwToken}` }
            });
        }
      }
  }
    return next.handle(request);
  }
}
