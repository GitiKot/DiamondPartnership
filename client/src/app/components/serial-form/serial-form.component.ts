import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormArray, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalModule } from 'angular-bootstrap-md';
import { ModalDirective } from 'angular-bootstrap-md/lib/free/modals/modal.directive';
import { Expenses } from 'src/app/data/expenses';
import { ExpensesService } from 'src/app/services/expenses.service'
import { seriousnessService } from 'src/app/services/seriousness.service';
import { ModalFormComponent } from '../modal-form/modal-form.component';
@Component({
  selector: 'app-serial-form',
  templateUrl: './serial-form.component.html',
  styleUrls: ['./serial-form.component.css']
})
export class SerialFormComponent implements OnInit {
  serialForm: FormGroup;
 
  @ViewChild('frame1') frame1: ModalDirective;
  constructor(private r: Router,private seriousnessService:seriousnessService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.serialForm = this.formBuilder.group({
      serialName: ['', [Validators.required]],
      dateBuy: ['', [Validators.required]],
      cost: ['', [Validators.required]],
      partnersPercent: ['', [Validators.required]],
      finishDate: ['', [Validators.required]],    
      detail: this.formBuilder.array([]), 
      Remarks: ['', [Validators.required]],//requierd?
    });

  }
  ngAfterViewInit() {
    this.frame1.show();
  }
  save() {

    console.log(this.serialForm.value);

    alert("האם ברצונך לשמור את הנתונים") 
  this.serialForm.reset();
this.r.navigate(['./seriousness'])
    // if (this.serialForm.valid) {
    //   this.seriousnessService.addSeria(this.serialForm.value).subscribe(e => {
          
       
    //   })

    // }
    
  }
 
  close(){
    this.r.navigate(['seriousness']);
  }
  cancelex() {

   
    this.detail.reset();
    
   
  } get serialName() {
    return this.serialForm.get('serialName');
  }
  get dateBuy() {
    return this.serialForm.get('dateBuy');
  }

  get cost() {
    return this.serialForm.get('cost');
  }

  get partnersPercent() {
    return this.serialForm.get('partnersPercent');
  }
  get detail(): FormArray {
    return this.serialForm.get('detail') as FormArray
  }
  
  get finishDate() {
    return this.serialForm.get("detail").get('finishDate');
  }
  get price() {
    return this.serialForm.get("detail").get('price');
  }
  get Remarks() {
    return this.serialForm.get('Remarks');
  }

  newDetail(): FormGroup {
    return this.formBuilder.group({
      expenses: '',
      price: '',
    })
  }

  addDetail() {
    this.detail.push(this.newDetail());
  }

  removeDetail(i: number) {
    this.detail.removeAt(i);
  }
}
   
 



  



