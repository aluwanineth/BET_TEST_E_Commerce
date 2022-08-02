import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/data/models/user';
import { HttpErrorHandlerService } from 'src/app/shared/services/http-error-handler.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';


@Injectable()
export class AuthenticationService {
  private url: string = `${environment.apiUrl}/api/Account`;
  private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient,
                private eh: HttpErrorHandlerService,
                private storage: LocalStorageService,
                private router: Router) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')|| '{}'));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    createUser(email: string, password: string): Observable<User> {
      return this.http.post<User>(`${this.url}/register`, {
        email: email,
        password: password,
        confirmPassword: password
      })
        .pipe(catchError(this.eh.handleError));
    }

    userLogin(email: string, password: string): Observable<object> {
      return this.http.post<any>(`${this.url}/authenticate`,
        { email: email, password: password, grantType: 'password' },
        { headers: { 'Content-Type': 'application/json' } })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                this.storage.addItem('currentUser', JSON.stringify(user));
                this.storage.addItem("jwt", user.data.jwToken);
                this.storage.addItem("refreshToken", user.data.refreshToken);
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    refreshToken() {
      const token = localStorage.getItem("jwt") || '';
      const refreshToken: string = localStorage.getItem("refreshToken") || '';

      const credentials = JSON.stringify({ accessToken: token, refreshToken: refreshToken });
      return this.http.post<any>(`${this.url}/refresh`, credentials,
      { headers: { 'Content-Type': 'application/json' } },
      )
      .pipe(map((res) => {
        this.storage.addItem("jwt", res.token);
        this.storage.addItem("refreshToken", res.refreshToken);
          return res;
        }));
    }

    logout() {
        // remove user from local storage to log user out
        this.storage.deleteItem('currentUser');
        this.storage.deleteItem("jwt");
        this.storage.deleteItem("refreshToken");
        //var userLogin: User = null || {data: {}, succeeded: false, message: '', id:'', jw};
        this.currentUserSubject.next(null);
        this.router.navigate(['/login-form']);
    }
  }

