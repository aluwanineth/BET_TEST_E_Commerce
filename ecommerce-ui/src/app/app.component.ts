import { Component, HostBinding } from '@angular/core';
import { AuthenticationService } from './core/services/authentication.service';
import { ScreenService, AppInfoService } from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes).filter(cl => this.screen.sizes[cl]).join(' ');
  }

  constructor(private authService: AuthenticationService, private screen: ScreenService, public appInfo: AppInfoService) { }

  isAuthenticated() {
    var islogin = false;
    if( this.authService.currentUserValue){
      if (Object.keys(this.authService.currentUserValue).length === 0) {
        islogin = false;
      } else {
        var islogin = true;
      }
  }
    return islogin;
  }
}
