import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Auth } from 'aws-amplify';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

const oauth = {
  domain: 'app-rvillaester.auth.ap-southeast-1.amazoncognito.com',
  scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
  redirectSignIn: 'http://localhost:4200/',
  redirectSignOut: 'http://localhost:4200/',
  responseType: 'code',
  options: {
    AdvanceSecurityDataCollectionFlag: false
  }
};

// Auth.configure({
//   oauth: oauth
// });

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
