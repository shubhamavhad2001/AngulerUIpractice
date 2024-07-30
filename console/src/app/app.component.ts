import { Component,DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck {
  title = 'nbot-server-ui';
  sideBarOpen = false;
  ismenurequired = false;
  isadminuser =false;
  issuperadminuser = false;
  constructor(private router:Router,private service:AuthService)
  {

  }
  ngDoCheck(): void {
    let currenturl = this.router.url;
    if(currenturl == '/login' || currenturl == '/register')
    {
      this.ismenurequired =false;
      this.sideBarOpen = false;
    }
    else
    {
      this.ismenurequired =true;
      
    }
    if(this.service.getUserRole() === '2' && this.service.getUserRole() === '1')
    {

      this.isadminuser = true;
      sessionStorage.setItem('isadminuser','true');
    }
    else
    {
      this.isadminuser = false;
      this.issuperadminuser = false;
    }
  }
  
  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen;
  }
}
