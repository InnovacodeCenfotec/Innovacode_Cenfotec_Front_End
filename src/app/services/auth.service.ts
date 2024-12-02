import { inject, Injectable } from '@angular/core';
import { IAuthority, ILoginResponse, IResponse, IRoleType, IUser } from '../interfaces';
import { Observable, catchError, firstValueFrom, map, of, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accessToken!: string;
  private expiresIn! : number;
  private user: IUser = {email: '', authorities: []};
  private http: HttpClient = inject(HttpClient);
  private alertService: AlertService = inject(AlertService);


  constructor() {
    this.load();
  }

  public save(): void {
    if (this.user) localStorage.setItem('auth_user', JSON.stringify(this.user));

    if (this.accessToken)
      localStorage.setItem('access_token', JSON.stringify(this.accessToken));

    if (this.expiresIn)
      localStorage.setItem('expiresIn',JSON.stringify(this.expiresIn));
  }

  private load(): void {
    let token = localStorage.getItem('access_token');
    if (token) this.accessToken = token;
    let exp = localStorage.getItem('expiresIn');
    if (exp) this.expiresIn = JSON.parse(exp);
    const user = localStorage.getItem('auth_user');
    if (user) this.user = JSON.parse(user);
  }

  public getUser(): IUser | undefined {
    return this.user;
  }

  public getAccessToken(): string | null {
    return this.accessToken;
  }

  public check(): boolean {
    if (!this.accessToken){
      return false;
    } else {
      return true;
    }
  }
/*
  public login(credentials: {email: string; password: string;}): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>('auth/login', credentials).pipe(
      tap((response: any) => {
        this.accessToken = response.token;
        this.user.email = credentials.email;
        this.expiresIn = response.expiresIn;
        this.user = response.authUser;
        this.save();
        this.alertService.displayAlert(
          'success',
          '¡Bienvenido '+ this.user.name + '!',
          'center',
          'top',
          ['success-snackbar']
        )
      })
    );
  }*/
    public login(credentials: { email: string; password: string }): Observable<ILoginResponse> {
      return this.http.post<ILoginResponse>('auth/login', credentials).pipe(
        tap((response: any) => {
          this.accessToken = response.token;
          this.user.email = credentials.email;
          this.expiresIn = response.expiresIn;
          this.user = response.authUser;
          this.save();
          this.alertService.displayAlert(
            'success',
            '¡Bienvenido ' + this.user.name + '!',
            'center',
            'top',
            ['success-snackbar']
          );
        }),
        catchError((err: any) => {
          console.error('Caught error:', err);
          let errorMessage = 'Error de login.';
          if (err.status === 401) {
            errorMessage = 'Correo o contraseña inválida.';
          } else if (err.status === 403) {
            errorMessage = 'Cuenta deshabilitada.';
          }
          this.alertService.displayAlert(
            'error',
            errorMessage,
            'center',
            'top',
            ['error-snackbar']
          );
          return throwError(() => err);
        })
      );
    }
    

  public hasRole(role: string): boolean {
    return this.user.authorities ?  this.user?.authorities.some(authority => authority.authority == role) : false;
  }

  public isSuperAdmin(): boolean {
    return this.user.authorities ?  this.user?.authorities.some(authority => authority.authority == IRoleType.superAdmin) : false;
  }

  public hasAnyRole(roles: any[]): boolean {
    return roles.some(role => this.hasRole(role));
  }

  public getPermittedRoutes(routes: any[]): any[] {
    let permittedRoutes: any[] = [];
    for (const route of routes) {
      if(route.data && route.data.authorities) {
        if (this.hasAnyRole(route.data.authorities)) {
          permittedRoutes.unshift(route);
        } 
      }
    }
    return permittedRoutes;
  }

  public signup(user: IUser): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>('auth/signup', user);
  }

  public logout() {
    this.accessToken = '';
    localStorage.removeItem('access_token');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('auth_user');
  }

  public getUserAuthorities (): IAuthority[] | undefined {
    return this.getUser()?.authorities ? this.getUser()?.authorities : [];
  }

  public areActionsAvailable(routeAuthorities: string[]): boolean  {
    // definición de las variables de validación
    let allowedUser: boolean = false;
    let isAdmin: boolean = false;
    // se obtienen los permisos del usuario
    let userAuthorities = this.getUserAuthorities();
    // se valida que sea una ruta permitida para el usuario
    for (const authority of routeAuthorities) {
      if (userAuthorities?.some(item => item.authority == authority) ) {
        allowedUser = userAuthorities?.some(item => item.authority == authority)
      }
      if (allowedUser) break;
    }
    // se valida que el usuario tenga un rol de administración
    if (userAuthorities?.some(item => item.authority == IRoleType.superAdmin)) {
      isAdmin = userAuthorities?.some(item => item.authority == IRoleType.superAdmin);
    }          
    return allowedUser && isAdmin;
  }
  loginWithGoogle(idToken: string | null): Observable<any> {
    return this.http.post("http://localhost:8080/auth/google-login", { idToken });
  }
}
