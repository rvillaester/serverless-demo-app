const oauth = {
    domain: 'app-rvillaester.auth.ap-southeast-1.amazoncognito.com',
    scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
    redirectSignIn: 'http://localhost:4200/',
    redirectSignOut: 'http://localhost:4200/',
    responseType: 'code'
};

export class AuthService{

}