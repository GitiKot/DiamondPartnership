

import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';

/**
 * @title Tab group with dynamically changing tabs
 */

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent {
  tabs = [];
  selected = new FormControl(0);
  brc: ThemePalette = 'warn';
  ngOnInit(): void {

  }
  addTab(Classification) {
    this.tabs.push(Classification);

    this.selected.setValue(this.tabs.length - 1);
  }

  removeTab(index: number) {

    this.tabs.splice(index, 1);
  }

  
}