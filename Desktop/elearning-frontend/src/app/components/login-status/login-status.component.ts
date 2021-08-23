import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {
  isAuthenticated: boolean = false;
  username?: string;

  storage: Storage = sessionStorage;

  constructor(private oktaAuthService: OktaAuthService) { }

  ngOnInit(): void {
    //subscribe to authentication state changes
    this.oktaAuthService.$authenticationState.subscribe(
      (result) => {
        this.isAuthenticated = result;
        this.getUserDetails();
        console.log(this.isAuthenticated);
      }
    )
  }
  getUserDetails() {
    if(this.isAuthenticated){
      //fetch the logged in user details (user's claim)

      //user full name is exposed as a property name
      this.oktaAuthService.getUser().then(
        res => {
          this.username = res.name;
        }
      )
    }
  }
  logout(){
    //Terminates the session with okta and removes current tokens
    this.oktaAuthService.signOut();
  }
}
