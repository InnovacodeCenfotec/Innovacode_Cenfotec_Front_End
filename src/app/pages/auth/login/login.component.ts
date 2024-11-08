import { Component, ViewChild, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AuthGoogleService } from '../../../services/auth-google.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
  private authGoogleService = inject(AuthGoogleService);
  public loginError!: string;
  loginStatus: boolean = false;
  @ViewChild('email') emailModel!: NgModel;
  @ViewChild('password') passwordModel!: NgModel;

  public loginForm: { email: string; password: string } = {
    email: '',
    password: '',
  };

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  public handleLogin(event: Event) {
    event.preventDefault();
    if (!this.emailModel?.valid) {
      this.emailModel.control.markAsTouched();
    }
    if (!this.passwordModel?.valid) {
      this.passwordModel.control.markAsTouched();
    }
    if (this.emailModel.valid && this.passwordModel.valid) {
      this.authService.login(this.loginForm).subscribe({
        next: () => this.router.navigateByUrl('/app/dashboard'),
        error: (err: any) => {
          console.log("error");
          this.loginStatus = true;
          this.loginError = err.error.description;
        }
      });
    }
  }

  public loginGoogle() {
    // this.authGoogleService.login();
    this.authGoogleService.getProfile();
    const profile = this.authGoogleService.getProfile();

    if (profile) {
      const userCredentials = {
        email: profile['email'],
        name: profile['given_name'],
        lastname: profile['family_name'],
        idToken: this.authGoogleService.getAccessToken()
      };

      this.authService.checkUserExists(userCredentials.email).subscribe({
        next: (exists: any) => {
          if (exists) {
            this.authService.login({ email: userCredentials.email, password: '' }).subscribe({
              next: () => this.router.navigateByUrl('/app/dashboard'),
              error: (err) => {
                this.loginStatus = true;
                this.loginError = err.error.description;
              }
            });
          } else {
            this.authService.signup(userCredentials).subscribe({
              next: () => {
                this.authService.login({ email: userCredentials.email, password: '' }).subscribe({
                  next: () => this.router.navigateByUrl('/app/dashboard'),
                  error: (err) => {
                    this.loginStatus = true;
                    this.loginError = err.error.description;
                  }
                });
              },
              error: (err) => {
                this.loginStatus = true;
                this.loginError = err.error.description;
              }
            });
          }
        },
        error: (err) => {
          this.loginStatus = true;
          this.loginError = 'Error checking user existence.';
        }
      });
    } else {
      this.loginStatus = true;
      this.loginError = 'No profile found, login failed.';
    }
  }

}