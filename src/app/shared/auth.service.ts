import { Auth } from 'aws-amplify';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './user.model';

const oauth = {
    domain: 'app-rvillaester.auth.ap-southeast-1.amazoncognito.com',
    scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
    redirectSignIn: 'http://localhost:4200/',
    redirectSignOut: 'http://localhost:4200/',
    responseType: 'code'
};

@Injectable()
export class AuthService{

    stateChange = new Subject<any>();

    loginSuccess(name: string, email: string){
        let user = new User(name, email);
        this.stateChange.next(
            {
                status: true,
                user: user
            }
        );
    }

    logoutSuccess(){
        let user = new User('', '');
        this.stateChange.next(
            {
                status: false,
                user: user
            }
        );
    }

    async getAccessToken(): Promise<string>{
        return await Auth.currentAuthenticatedUser()
        .then(
            (user) => {
                return user.signInUserSession.idToken.jwtToken
            }
        ).catch(
            (error) => {return '';}
        );
    }

    async isUserLoggedIn(): Promise<any> {
        return await Auth.currentAuthenticatedUser()
        .then((data) => {return true;})
        .catch(() => {return false;});
    }

    async getUserName(): Promise<any> {
        return await Auth.currentAuthenticatedUser()
        .then((user) => {return user.attributes.name;})
        .catch(() => {return '';});
    }

    async getCurrentAuthenticatedUser(): Promise<any>{
        return await Auth.currentAuthenticatedUser()
        .then((user) => {return user; console.log('0', user)})
        .catch((data) => {return null; console.log('1', data)});
    }



}