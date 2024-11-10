import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {
  public tokenReceived$ = new Subject<string>();

  constructor(private oauthService: OAuthService) { 
    this.configureOAuth();
  }

  private configureOAuth() {
    const config: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: '586708376606-g1577kothlf55g5e8ijle3tcl2vvjnnu.apps.googleusercontent.com',
      redirectUri: window.location.origin + '/app/dashboard',
      scope: 'openid profile email',
    };
    this.oauthService.configure(config);
    this.oauthService.setupAutomaticSilentRefresh();

    this.oauthService.events.subscribe(event => {
      if (event.type === 'token_received') {
        const idToken = this.getIdToken();
        if (idToken) {
          this.tokenReceived$.next(idToken);
        }
      }
    });
  }

  login() {
    this.oauthService.loadDiscoveryDocumentAndLogin();
  }

  logout() {
    this.oauthService.revokeTokenAndLogout();
    this.oauthService.logOut();
  }

  getProfile() {
    return this.oauthService.getIdentityClaims();
  }

  getAccessToken(): string | null {
    return this.oauthService.getAccessToken();
  }

   getIdToken(): string | null {
    return this.oauthService.getIdToken();
  }
}
