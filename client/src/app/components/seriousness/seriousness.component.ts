import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'angular-bootstrap-md';
import{Seriousness} from 'src/app/data/seriousness'
import{seriousnessService} from 'src/app/services/seriousness.service'
@Component({
  selector: 'app-seriousness',
  templateUrl: './seriousness.component.html',
  styleUrls: ['./seriousness.component.css'],
})
export class SeriousnessComponent implements OnInit {
  @ViewChild('frame2') frame2: ModalDirective;
indexSerial:number;
  constructor(private seriousnessService:seriousnessService,private r:Router) { }

  
seriousnessList:Array<Seriousness>
  ngOnInit(): void {

    this.seriousnessService.getAllSeriousness().subscribe(ans => {this.seriousnessList = ans});

  }
 
  cancel() {
    console.log("ertyui");
    
    this.r.navigate(['/seriousness']);
  }
}
