import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService){}

  ngOnInit() {
  }

  onSignin(form: NgForm) {
    const username = form.value.username;
    const password = form.value.password;
    Auth.signIn(
      username, 
      password,
    ).then(user => {
      this.router.navigate(["/"]);
      this.authService.loginSuccess(user.attributes.name, username)
    }).catch(err => {
      alert('Invalid Username or Password')
    });
  }

  onCancel(){
    this.router.navigate(["/"]);
  }

  onSocialLogin(provider: string){
    Auth.federatedSignIn({customProvider: provider});
  }

}
