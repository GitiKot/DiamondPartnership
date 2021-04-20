import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'angular-bootstrap-md';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-sucsses-form',
  templateUrl: './sucsses-form.component.html',
  styleUrls: ['./sucsses-form.component.css']
})
export class SucssesFormComponent implements OnInit {
  validatingForm: FormGroup;
  typeModel: string;
  @ViewChild('frame1') frame1: ModalDirective;
  constructor(private route:ActivatedRoute,private r:Router, private modalService: ModalService) {
    this.typeModel = modalService.data?.name;
   }

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
//     this.frame1.hide();
// this.r.navigate(['']);
this.modalService.closeModal()
  }  
}
