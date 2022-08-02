import { Component, NgModule, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPanelModule } from '../user-panel/user-panel.component';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';

import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  checkoutButtonOptions : any;
  @Output()
  menuToggle = new EventEmitter<boolean>();

  @Input()
  menuToggleEnabled = false;

  @Input()
  title!: string;

  userMenuItems = [
  {
    text: 'Logout',
    icon: 'runner',
    onClick: () => {
      this.authenticationService.logout();
    }
  }];

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.checkoutButtonOptions= {
    icon: 'assets/img/shopping_cart_accept.ico',
      text: 'Shopping Cart',
      onClick: () => {
        this.router.navigate(['/cart']);
      },
    };
  }

  ngOnInit() {

  }

  toggleMenu = () => {
    this.menuToggle.emit();
  }
}

@NgModule({
  imports: [
    CommonModule,
    DxButtonModule,
    UserPanelModule,
    DxToolbarModule
  ],
  declarations: [ HeaderComponent ],
  exports: [ HeaderComponent ]
})
export class HeaderModule { }
