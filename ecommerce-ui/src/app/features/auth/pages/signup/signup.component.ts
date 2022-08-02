import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import notify from 'devextreme/ui/notify';
import { ValidationCallbackData } from 'devextreme/ui/validation_rules';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  loading = false;
  formData: any = {};


  ngOnInit(): void {
  }

  constructor(private authService: AuthenticationService, private router: Router) { }

  async onSubmit(e: Event) {
    e.preventDefault();
    const { email, password } = this.formData;
    this.loading = true;

    const result = await this.authService.createUser(email, password).subscribe(
    () => {
      this.loading = false;
      notify({ message: 'Account successfully created. You will be redirected in 5 seconds.'
              , width: 300,
              shading: true
            }, 'success', 5000);
      setTimeout(() => this.router.navigateByUrl('/login-form'), 6000);
    },

    err =>{
      this.loading = false;
      notify({ message: 'There was a problem creating your account.'
              , width: 300,
              shading: true
            }, 'error', 5000)
          }

  );


  }

  confirmPassword = (e: ValidationCallbackData) => {
    return e.value === this.formData.password;
  }
}
