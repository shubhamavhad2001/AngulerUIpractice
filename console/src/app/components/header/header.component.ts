import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from 'src/app/services/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  
  constructor(private router:Router,private selectionService: AuthService)
  {

  }
  get selectedItem(): any {
    // console.log(this.selectionService.selectItem);
    return this.selectionService.selectItem;
    
  }
  @Output() toggleSidebarForMe: EventEmitter<any>=new EventEmitter();
  name = sessionStorage.getItem('name');
  toggleSidebar()
  {
    this.toggleSidebarForMe.emit();
  }
  loggedOut()
  {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

}
