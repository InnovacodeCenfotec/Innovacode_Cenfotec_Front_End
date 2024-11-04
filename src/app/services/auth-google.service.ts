// import { Injectable } from '@angular/core';
// import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGoogleService {

//   constructor(private oauthService: OAuthService) { 
//     this.initLogin();
//   }

//   initLogin() {
//     const config: AuthConfig = {
//       issuer: 'https://accounts.google.com',
//       strictDiscoveryDocumentValidation: false,
//       clientId: '586708376606-g1577kothlf55g5e8ijle3tcl2vvjnnu.apps.googleusercontent.com',
//       redirectUri: window.location.origin + '/app/dashboard',
//       scope: 'openid profile email',
//     }

//     this.oauthService.configure(config);
//     this.oauthService.setupAutomaticSilentRefresh();
//     this.oauthService.loadDiscoveryDocumentAndLogin();
//   }

//   login() {
//     this.oauthService.initLoginFlow();
//   }

//   logout() {
//     this.oauthService.logOut();
//   }

//   getProfile() {
//     return this.oauthService.getIdentityClaims();
//   }
// }
