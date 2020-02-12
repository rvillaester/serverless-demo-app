import { Component, OnInit } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Auth } from 'aws-amplify';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private amplifyService: AmplifyService, private route: ActivatedRoute,
    private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  onSignup(){
    let authState = {state: 'signUp', user: null}
    this.amplifyService.setAuthState(authState);
    this.router.navigate(['signup']);
  }

  test(){
    this.authService.isUserLoggedIn().then (
      (data: boolean) => {
        console.log('1', data);
      }
    );

    console.log(this.authService.isUserLoggedIn());
    Auth.signIn(
      'rey.villaester@iselect.com.au', 
      'P@ssword123',
    ).then(user => {
      console.log(user)
      console.log(user.attributes.name)
    })
    .catch(err => console.log('Error', err));
    
    this.authService.isUserLoggedIn().then (
      (data: boolean) => {
        console.log('1', data);
      }
    );
  }

}
