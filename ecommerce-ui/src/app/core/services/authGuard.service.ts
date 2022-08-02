import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';


@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
      private router: Router,
      private authenticationService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const currentUser = this.authenticationService.currentUserValue;

      if (Object.keys(currentUser).length === 0) {
          // logged in so return true
          this.router.navigate(['/login-form'], { queryParams: { returnUrl: state.url } });
          return false;
      }

      // not logged in so redirect to login page with the return url
      return true;
  }
}

// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
// import { JwtHelperService } from '@auth0/angular-jwt';
// import { environment } from 'src/environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuardService implements CanActivate  {
//   private url: string = `${environment.apiUrl}/api/Account`;
//   constructor(private router:Router, private jwtHelper: JwtHelperService, private http: HttpClient){}

//   async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     const token = localStorage.getItem("jwt") || '';

//     if (token && !this.jwtHelper.isTokenExpired(token)){
//       console.log(this.jwtHelper.decodeToken(token))
//       return true;
//     }

//     const isRefreshSuccess = await this.tryRefreshingTokens(token);
//     if (!isRefreshSuccess) {
//       this.router.navigate(["/login-form"]);
//     }

//     return isRefreshSuccess;
//   }

//   private async tryRefreshingTokens(token: string): Promise<boolean> {
//     const refreshToken: string = localStorage.getItem("refreshToken") || '';
//     if (!token || !refreshToken) {
//       return false;
//     }

//     const credentials = JSON.stringify({ accessToken: token, refreshToken: refreshToken });
//     let isRefreshSuccess: boolean;

//     const refreshRes = await new Promise<any>((resolve, reject) => {
//       this.http.post<any>("https://localhost:5001/api/token/refresh", credentials, {
//         headers: new HttpHeaders({
//           "Content-Type": "application/json"
//         })
//       }).subscribe({
//         next: (res: any) => resolve(res),
//         error: (_) => { reject; isRefreshSuccess = false;}
//       });
//     });

//     localStorage.setItem("jwt", refreshRes.token);
//     localStorage.setItem("refreshToken", refreshRes.refreshToken);
//     isRefreshSuccess = true;

//     return isRefreshSuccess;
//   }


// }
