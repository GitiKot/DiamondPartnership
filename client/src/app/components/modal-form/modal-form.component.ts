import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css']
})
export class ModalFormComponent implements OnInit {
  validatingForm: FormGroup;
  typeModel = this.route.snapshot.paramMap.get('type');
  @ViewChild('frame1') frame1: ModalDirective;
  constructor(private route:ActivatedRoute,private r:Router) { }

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
  hideFrame1(){
    this.frame1.hide();
this.r.navigate(['']);
  }

// import { Component } from '@angular/core';

// @Component({
//   selector: 'modal-form',
//   templateUrl: './modal-form.component.html',
//   styleUrls: ['./modal-form.component.css']
// })

  
  

  
}
