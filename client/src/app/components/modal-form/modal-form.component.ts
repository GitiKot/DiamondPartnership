import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css']
})
export class ModalFormComponent implements OnInit {
  validatingForm: FormGroup;
  @ViewChild('frame1') frame1: ModalDirective;
  constructor() { }

  // ngOnInit(): void {
  // }
  ngOnInit() {
  
    // this.validatingForm = new FormGroup({
    //   contactFormModalName: new FormControl('', Validators.required),
    //   contactFormModalEmail: new FormControl('', Validators.email),
    //   contactFormModalSubject: new FormControl('', Validators.required),
    //   contactFormModalMessage: new FormControl('', Validators.required)
    // });
  }
  ngAfterViewInit() { 
    this.frame1.show();
  }


// import { Component } from '@angular/core';

// @Component({
//   selector: 'modal-form',
//   templateUrl: './modal-form.component.html',
//   styleUrls: ['./modal-form.component.css']
// })

  
  

  
}
