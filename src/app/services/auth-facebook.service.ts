import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthFacebookService {
  public tokenReceived$ = new Subject<string>();

  constructor(private oauthService: OAuthService) { 
    this.configureOAuth();
  }

  private configureOAuth() {
    const config: AuthConfig = {
      issuer: 'https://www.facebook.com',
      strictDiscoveryDocumentValidation: false,
      clientId: '529879463244664',
      redirectUri: window.location.origin + '/app/dashboard',
      scope: 'public_profile email',
      responseType: 'token'
    };
    this.oauthService.configure(config);
    this.oauthService.setupAutomaticSilentRefresh();

    this.oauthService.events.subscribe(event => {
      if (event.type === 'token_received') {
        const accessToken = this.getAccessToken();
        if (accessToken) {
          this.tokenReceived$.next(accessToken);
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

  getAccessToken(): string | null {
    return this.oauthService.getAccessToken();
  }
}
