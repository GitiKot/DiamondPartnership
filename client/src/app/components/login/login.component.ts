import { Component, OnInit } from '@angular/core';
// import { DataService } from 'src/app/services/data.service';
// import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { User } from 'src/app/models/user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm;
  failedMessage = false;

  constructor(
    // private userservice: DataService, private loginService: LoginService, 
    private router: Router) { }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  checkUser() {
  //   const user = new User();
  //   user.name = this.loginForm.controls.username.value;
  //   user.password = this.loginForm.controls.password.value;
  //   if (this.dataservice.Users.find(u => u.name === user.name && u.password === user.password)) {
  //     const currentUser = this.dataservice.Users.find(u => u.name === user.name && u.password === user.password)
  //     currentUser.logedInDates.push(new Date());
  //     this.loginService.setCurrentUser(currentUser);

      this.router.navigate(['nav-bar']);
  //   }
  //   else {
  //     this.loginService.setCurrentUser(undefined);
  //     this.failedMessage = true;
  //     this.loginForm.reset();
  //   }
  }
}
