import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
   title = 'client';
  // private roles: string[];
  isLoggedIn = false;
  // showAdminBoard = false;
  // showModeratorBoard = false;
  userName: string;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
  }

ngAfterViewInit(){
  console.log("ngAfterViewInit");
  console.log("this.tokenStorageService",this.tokenStorageService);
  console.log("this.tokenStorageService.getToken()",this.tokenStorageService.getToken());
  
    if(this.tokenStorageService){
      this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
        const user = this.tokenStorageService.getUser();
        // this.roles = user.roles;
  
        // this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
        // this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
        this.userName = user.userName;
      }  
    }
}
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
