import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import notify from 'devextreme/ui/notify';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading = false;
  formData: any = {};
  returnUrl: string;

  constructor(private authService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute) {
        // if (Object.keys(this.authService.currentUserValue).length !== 0) {
        //    this.router.navigate(['/home']);
        // }
  }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl =  '/product';
}

  async onSubmit(e: Event) {
    e.preventDefault();
    const { email, password } = this.formData;
    this.loading = true;

    this.authService.userLogin(email, password).subscribe(
      () => {
        this.router.navigate([this.returnUrl]);
        this.loading = false;
      },

      err =>{
        this.loading = false;
        notify({ message: 'Login failed. Check your login credentials.'
                , width: 300,
                shading: true
              }, 'error', 5000)
            }

    );
  }

  onCreateAccountClick = () => {
    this.router.navigate(['/create-account']);
  }
}
