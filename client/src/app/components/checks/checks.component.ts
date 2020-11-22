import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checks',
  templateUrl: './checks.component.html',
  styleUrls: ['./checks.component.css']
})
export class ChecksComponent implements OnInit {
  checksForm:FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.checksForm=new FormGroup({
      
    })
  }
  keypressevt(){

  }
}
