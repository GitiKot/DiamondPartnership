import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ModalService } from '../../services/modal.service';

/**
 * @title Tab group with dynamically changing tabs
 */

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent {
  
 public tabs = [];
  selected = new FormControl(0);
  brc: ThemePalette = 'warn';
  constructor( public modalService:ModalService){
    if(this.modalService.saleFormPage)
    this.tabs.push({classification:'sale-form',name:''})
  }
  ngOnInit(): void {
  }
  addTab(tab:{classification:string;name:string}) {
    this.tabs.push(tab);
    this.selected.setValue(this.tabs.length - 1);
  }
  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }
}