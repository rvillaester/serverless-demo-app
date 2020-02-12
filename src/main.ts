import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import Amplify from 'aws-amplify';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

const oauth = {
  domain: 'app-rvillaester.auth.ap-southeast-1.amazoncognito.com',
  scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
  redirectSignIn: 'http://localhost:4200/',
  redirectSignOut: 'http://localhost:4200/',
  responseType: 'code'
}

// Auth.configure({
//   oauth: oauth
// });

Amplify.configure({
  Auth: {
    region: 'ap-southeast-1',
    identityPoolRegion: 'ap-southeast-1',
    userPoolId: 'ap-southeast-1_j4dyRSpNY',
    userPoolWebClientId: '1i0tfvtm79vht8iihvmbecgtng',
    oauth: oauth
  },
  API: {
    endpoints: [
        {
            name: "MyAPI",
            endpoint: "https://uv575pkor0.execute-api.ap-southeast-1.amazonaws.com/dev"
        }
    ]
}
});

// Amplify.configure({...awsconfig,
//   Auth: {
//     oauth: oauth
//   }
// });

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
