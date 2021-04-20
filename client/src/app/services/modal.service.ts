import { Injectable } from '@angular/core';
import { TabsComponent } from '../components/tabs/tabs.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  isOpen = false;
  component = '';
  data: any;
  saleFormPage= false
  constructor() { }

  openModal(componentName, componentData = {}) {
    this.isOpen = true;
    this.component = componentName;
    this.data = componentData;
  };

  closeModal() {
    this.isOpen = false;
    this.component = ''
  }
  changeSaleTab() {
    // this.tabsComponent.tabs.push('sale-form', '')
    // console.log(this.tabsComponent.tabs);
    this.saleFormPage=!this.saleFormPage;
  }
}
