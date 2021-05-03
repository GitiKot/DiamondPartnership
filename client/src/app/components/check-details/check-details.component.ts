import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDirective } from 'angular-bootstrap-md';
import { Checks } from 'src/app/data/checks';
import { ModalService } from 'src/app/services/modal.service';
import { Sale } from '../../data/sale'
@Component({
  selector: 'app-check-details',
  templateUrl: './check-details.component.html',
  styleUrls: ['./check-details.component.css']
})
export class CheckDetailsComponent implements OnInit {

  currentChecks: Checks;
  @ViewChild('framec') public showModalOnClick: ModalDirective;
  constructor(public modalService: ModalService) { }

  ngOnInit(): void { console.log(this.modalService.data.c);
    this.currentChecks = this.modalService.data.check;
   
    
  }

  ngAfterViewInit() {
    this.showModalOnClick.show();
  }

  close(e) {
    this.modalService.closeModal();
  }
  
  print(e) {
    let printContents = document.getElementById('toPrint').innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;

    window.print();  

    document.body.innerHTML = originalContents;

    
  //  document.body.append(printContents);

    
  }
}
