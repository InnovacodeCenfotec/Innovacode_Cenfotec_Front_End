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
  ) {
  }

  ngOnInit(): void {
    this.authGoogleService.tokenReceived$.subscribe({
      next: (idToken) => {
        this.authService.loginWithGoogle(idToken).subscribe({
          next: () => this.router.navigateByUrl('/app/dashboard'),
          error: (err: any) => {
            this.loginStatus = true;
            this.loginError = 'Error al iniciar sesión con Google';
          }
        });
      }
    });
  }

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
    this.authGoogleService.login();
  }

}