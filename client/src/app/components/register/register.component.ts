import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log("onsubmit",this.form);
    
    this.authService.addUser(this.form).subscribe(
          data => {
            console.log("register, data:",data);
            this.isSuccessful = true;
            this.isSignUpFailed = false;
          },
          err => {
            this.errorMessage = err.message;
            this.isSignUpFailed = true;
          });
  //   this.authService.register(this.form).subscribe(
  //     data => {
  //       console.log("register, data:",data);
  //       this.isSuccessful = true;
  //       this.isSignUpFailed = false;
  //     },
  //     err => {
  //       this.errorMessage = err.message;
  //       this.isSignUpFailed = true;
  //     }
  //   );
  }

}