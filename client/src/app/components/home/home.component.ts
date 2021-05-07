import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { UserService } from 'src/app/services/user.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  accsessForm: FormGroup
  constructor(private router: Router, private formBuilder: FormBuilder, public userService: UserService
  ) { }

  ngOnInit(): void {
    this.accsessForm = this.formBuilder.group({
      dateStart: ['', [Validators.required]],
      password: ['', [Validators.compose([Validators.required, Validators.email])]]
      , AllowingAccess: ['', Validators.required]
    })
    this.accsessForm.controls['dateStart'].setValue(Date())
    console.log("date", this.accsessForm.controls['dateStart'].value);

    // this.partnersForm = this.formBuilder.group({
    //   name: ['', [Validators.required]],
    //   email: ['', [Validators.compose([Validators.required, Validators.email])]],
    //   contact: ['', [Validators.required]],
    //   phone: ['', [Validators.compose([Validators.minLength(9), Validators.pattern('[0][2,3,4,8,9][0-9]{7}')])]],
    //   pel: ['', [Validators.compose([Validators.minLength(10), Validators.pattern('[0][5][0-9]{8}'), phoneValidator()])]],
    //   fax: ['', [Validators.required]],
    //   Remarks: [''],
    // },
  }
  SingIn() {
    this.userService.returnSign(this.accsessForm.value)
   
    console.log(this.userService.allowingAccess(this.accsessForm.value));
    
    // if ()
    //  this.router.navigate(['/tabs'])
    //  else
    //  alert("סיסמה לא נכונה")
      }
 
  get password() {
    return this.accsessForm.get('password');
  }
  get AllowingAccess() {
    return this.accsessForm.get('AllowingAccess');
  }
}
