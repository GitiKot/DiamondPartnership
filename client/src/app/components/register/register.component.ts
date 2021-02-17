import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { DataService } from 'src/app/services/data.service';
// import { User } from 'src/app/models/user';
// import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm;
  failedMessage = false;
  holdMessage = false;
  passMassage = false;
  passwordOk;
  constructor(
    // private dataservice: DataService, private loginService: LoginService, 
    private router: Router
    ) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      passwordOk: new FormControl('', Validators.required)
    });
  }
  checkUser() {
    // const user = new User();
    // user.name = this.registerForm.controls.username.value;
    // user.password = this.registerForm.controls.password.value;
    // if (this.dataservice.Users.find(u => u.name === user.name || u.password === user.password)) {

    //   this.holdMessage = true;
    //   this.registerForm.reset();

    // }
    // else {
    //   if (user.name === null || user.password === null || this.registerForm.controls.passwordOk.value === null) {
    //     this.loginService.setCurrentUser(undefined);
    //     this.failedMessage = true;
    //     this.registerForm.reset();
    //   }
    //   else {
    //     console.log(user.password)
    //     console.log(this.registerForm.controls.passwordOk.value)
    //     if (user.password != this.registerForm.controls.passwordOk.value) {
    //       this.passMassage = true;
    //     }
    //     else {
    //       // const currentUser = this.dataservice.Users.find(u => u.name === user.name || u.password === user.password)
    //       let currentUser = user;
    //       currentUser.logedInDates.push(new Date());
    //       this.loginService.setCurrentUser(currentUser);
    //       // this.dataservice.Users.push(currentUser)

          this.router.navigate(['nav-bar']);
    //     }
    //   }

    // }
  }
  res() {
    this.passMassage = false;
    this.holdMessage = false;
    this.failedMessage = false;
    this.registerForm.reset();
  }
  addUser() {
    // const u = new User();
    // u.name = this.registerForm.controls.username.value;
    // u.password = this.registerForm.controls.password.value;
    // this.passwordOk = this.registerForm.controls.passwordOk.value;
    
  }
}




