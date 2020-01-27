import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  isAuthenticated(){
    return false;
  }

  onLogin(){
    const URL = "https://app-rvillaester.auth.ap-southeast-1.amazoncognito.com/login?response_type=code&client_id=1i0tfvtm79vht8iihvmbecgtng&redirect_uri=http://localhost:4200";
    window.location.assign(URL);
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

  }

}
