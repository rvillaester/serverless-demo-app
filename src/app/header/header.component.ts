import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { Auth } from 'aws-amplify';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private name: String = ""
  private isLoggedIn: boolean = false;


  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) { 
    Auth.currentAuthenticatedUser().then(
      (user => {
        this.authService.loginSuccess(user.attributes.name, '');
      })
    );
  }

  ngOnInit() {
    this.authService.stateChange.subscribe
    (
      (data) => {
        this.isLoggedIn = data.status;
        this.name = data.user.name;
      }
    );
    // this.user = Auth.currentAuthenticatedUser();
    // this.user = this.authService.getCurrentAuthenticatedUser();
  }

  onLogin(){
    this.router.navigate(["/signin"]);
    // const URL = "https://app-rvillaester.auth.ap-southeast-1.amazoncognito.com/login?response_type=code&client_id=1i0tfvtm79vht8iihvmbecgtng&redirect_uri=http://localhost:4200";
    // window.location.assign(URL);
  }

  // onLogin(){
  //   const URL = "https://app-rvillaester.auth.ap-southeast-1.amazoncognito.com/login?response_type=code&client_id=1i0tfvtm79vht8iihvmbecgtng&redirect_uri=http://localhost:4200";
  //   window.open(URL,"awsGoogleAuth",
  //     "location,toolbar,resizable,scrollbars,status,width=600,height=600");

  //   window.addEventListener("message", res => {
  //     let tokensData = res.data;
  //     console.log('0', tokensData);
  //     let idToken = tokensData.IdToken;
  //     let accessToken = tokensData.AccessToken;
  //     console.log('1', idToken);
  //     console.log('2', accessToken);
  //   });
  // }

  onLogout(){
    Auth.signOut().then(
      (data => {
        this.authService.logoutSuccess();
      })
    );
    this.router.navigate(['']);
  }

}
