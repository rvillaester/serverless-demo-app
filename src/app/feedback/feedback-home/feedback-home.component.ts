import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth, API } from 'aws-amplify';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-feedback-home',
  templateUrl: './feedback-home.component.html',
  styleUrls: ['./feedback-home.component.css']
})
export class FeedbackHomeComponent implements OnInit {

  private results: string = "";

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  onWriteFeedback(){
    this.router.navigate(['submit'], {relativeTo: this.route});
  }

  onRequiresAuth(){
    Auth.currentAuthenticatedUser()
      .then(
        (user) => {
          let jwtToken = user.signInUserSession.idToken.jwtToken
          const options = {
            headers: {
              Authorization: jwtToken
            }
          };

            API.get('MyAPI', '/authenticatedAPI', options).then(response => {
              console.log(response);
              this.results = response.results;
            }).catch(error => {
                console.log(error)
            });
        }
      );
  }

  onPublicAPI(){
    console.log('2')
    let myInit = { 
      headers: {},
      response: true,
      queryStringParameters: {
          name: 'param'
      }
    }
    API.get('MyAPI', '/publicAPI', myInit).then(response => {
      this.results = response.data.results;
      console.log(response.data.results);
    }).catch(error => {
        console.log(error)
    });

  }

}
