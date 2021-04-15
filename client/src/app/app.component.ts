import { Component } from '@angular/core';
import { Email } from './data/Email';
import {SendEmailService}from './services/send-email.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  constructor(private ff:SendEmailService){}
  
  send(){ 
    const e=new Email()
    e.recipientsEmail="bguko34"
this.ff.sendEmail(e);
  }
  
}
