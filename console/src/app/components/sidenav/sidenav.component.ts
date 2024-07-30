import { Component } from '@angular/core';
import {AuthService} from 'src/app/services/auth.service'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  userRole:any;
  constructor(private selectionService: AuthService) {

  }
  onSelect(item: any): void {
    
    this.selectionService.selectItem = item;
  }

}
