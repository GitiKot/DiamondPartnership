import { Component, Input, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { Partner } from 'src/app/data/partner';
import { PartnerService } from 'src/app/services/partner.service';
import { phoneValidator } from 'src/app/validtors/phone.validator';
import { ContactNumberValidator } from 'src/app/validtors/contact.validator'
@Component({
  selector: 'app-partners-form',
  templateUrl: './partners-form.component.html',
  styleUrls: ['./partners-form.component.css']
})
export class PartnersFormComponent implements OnInit {
  constructor(private partnerService: PartnerService, private router: Router) { }
  partnersList: Array<Partner>;
  partnersForm: FormGroup;

  ngOnInit()//: void 
  {
    var firstInput = document.getElementById('name');
    var allInput = document.querySelectorAll('input');



    firstInput.focus();


    ///פוקוס
    var input = document.getElementById("name");

    allInput.forEach(a => a.addEventListener("keypress", function (event) {


      if (event.code === "Enter") {
        var current = (event.target as Element);
        event.preventDefault();
        var index = current.getAttribute('tabindex');
        var num = (Number(index));
        num += 1;
        // let nextInput= document.querySelector('[tabindex=num]');
        let nextInput = FindByAttributeValue("tabindex", num, "input");
        if (nextInput != undefined) {
          // alert(nextInput);
          nextInput.focus();
        }
        else {
          var save = document.getElementById('save');
          save.focus();
          alert("האם הנך בטוח במה שאתה עושה");

        }
        function FindByAttributeValue(attribute, value, element_type) {
          element_type = element_type || "*";
          var All = document.getElementsByTagName(element_type);
          for (var i = 0; i < All.length; i++) {
            if (All[i].getAttribute(attribute) == value) { return All[i]; }
          }
        }
      }
    }, false))


    // this.partnerService.getAllPartners().subscribe(ans=>this.partnersList=ans);
    this.partnersForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      contact: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.compose([Validators.minLength(9), Validators.pattern('[0][2,3,4,8,9][0-9]{7}')])),
      pel: new FormControl('', Validators.compose([Validators.minLength(10), Validators.pattern('[0][5][0-9]{8}'), phoneValidator()])),
      fax: new FormControl('', Validators.required),
      Remarks: new FormControl(''),

    }, ContactNumberValidator(['phone', 'pel', 'email'])); console.log(this.partnersForm.controls.email.value);
  }

  save() {

    alert("האם הנך בטוח במה שאתה עושה");
    if (this.partnersForm.valid) {
      const p = new Partner();
      this.partnerService.addPartner(this.partnersForm.value)
        .subscribe(a => {
          this.router.navigate(['partners-form/modal-form', 'שותף'])
          this.partnersForm.reset();
        }, () => {
          console.log("error");
        });
    }

 this.router.navigate(['partners-form']);
  }
  cancel() {
    this.router.navigate(['/partners']);
  }
 
}

