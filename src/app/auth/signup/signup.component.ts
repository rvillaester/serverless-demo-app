import { Component, OnInit } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import { AuthState } from 'aws-amplify-angular/dist/src/providers';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private authState: AuthState;
  private signUpConfig = {
    header: 'Sign Up',
    hideAllDefaults: true,
    defaultCountryCode: '1',
    signUpFields: [
      {
        label: 'Email',
        key: 'email',
        required: true,
        displayOrder: 1,
        type: 'string',
      },
      {
        label: 'Password',
        key: 'password',
        required: true,
        displayOrder: 2,
        type: 'password'
      },
      {
        label: 'Name',
        key: 'name',
        required: true,
        displayOrder: 3,
        type: 'string'
      }
    ]
  }

  constructor(private amplifyService: AmplifyService, private router: Router) {
    this.amplifyService.authStateChange$
            .subscribe(authState => {
              if(authState.state == 'signIn_failure'){
                alert('Invalid username or password');
              }
        });
   }

  ngOnInit() {
  }

  onSignup(form: NgForm){
    const username = form.value.email;
    const name = form.value.name;
    const password = form.value.password;
    const confPassword = form.value.confPassword;
    if(password !== confPassword){
      alert('Password don\'t match');
    } else if(password.length < 6) {
      alert('Password should be at least 6 characters in lenght');
    } else {
      Auth.signUp({
        username,
        password,
        attributes: {
          name
        }
      }).then(
        data => {this.router.navigate(['/'])}
      ).catch(
        error => {alert('Unexpected error occured during signup')}
      )

    }
  }

  onCancel(){
    this.router.navigate(["/"]);
  }
}
