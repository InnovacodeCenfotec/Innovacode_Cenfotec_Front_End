import { Injectable, signal } from '@angular/core';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGithubService {

  profile = signal<any>(null);

  constructor(private oauthService: OAuthService) { 
    this.configureOAuth();
  }

  private configureOAuth() {
    const config: AuthConfig = {
      issuer: 'https://github.com',
      clientId: 'Ov23liip1JzeoYjbgcUE',
      redirectUri: window.location.origin + '/auth/github/callback',
      scope: 'read:user user:email',
      responseType: 'code',
      oidc: false,
      requireHttps: false
    };
    this.oauthService.configure(config);

    this.oauthService.setupAutomaticSilentRefresh();

    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {

      if (this.oauthService.hasValidIdToken()) {
        console.log(this.oauthService.getIdentityClaims());
      }

    });
  }

  login() {
    this.oauthService.initCodeFlow();
  }

  logout() {
    this.oauthService.revokeTokenAndLogout();
    this.oauthService.logOut();
    this.profile.set(null);
  }

  getProfileClaims() {
    return this.oauthService.getIdentityClaims();
  }

  getProfile() {
    return this.profile();
  }

  getAccessToken(): string | null {
    return this.oauthService.getAccessToken();
  }

   getIdToken(): string | null {
    return this.oauthService.getIdToken();
  }
}
