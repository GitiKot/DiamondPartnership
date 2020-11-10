import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md/lib/free/modals/modal.directive';

@Component({
  selector: 'app-expenses-form',
  templateUrl: './expenses-form.component.html',
  styleUrls: ['./expenses-form.component.css']
})

export class ExpensesFormComponent implements OnInit {
  @ViewChild('frame1') public showModalOnClick1: ModalDirective;//model big

  public hideModal2(): void {

  }
  constructor() { }

  ngOnInit(): void {
  }
save(){

}
}
