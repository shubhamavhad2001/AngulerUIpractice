import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component';
import { ToastrService } from 'ngx-toastr';
import { AddUserComponent } from './add-user/add-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  
  displayedColumns: string[] = ['name', 'username', 'usrRole', 'status', 'action'];
  userList: any;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  element: any;
  userRole:any;
  constructor(private service: AuthService,private dialog:MatDialog,private toastr:ToastrService) {
  }

  @ViewChild(MatPaginator) paginator !:MatPaginator;
  @ViewChild(MatSort) sort !:MatSort;


  ngOnInit(): void {
    this.LoadUsers();
    this.userRole = sessionStorage.getItem('userrole');
  }
  
  LoadUsers() {
    let orgId = sessionStorage.getItem('orgId');
    let userrole = sessionStorage.getItem('userrole');
    if(userrole === '1')
    {
      this.service.GetAllUsers().subscribe(res =>{
        this.userList = res.content;        
        this.dataSource = new MatTableDataSource<any>(this.userList);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
      });
    }
    else
    {
      const userLogin = {
        id: "",
        orgId: orgId,
        username: ""
      }
    this.service.GetAllUsersByOrgId(userLogin).subscribe(res => {
      this.userList = res;     
      this.dataSource = new MatTableDataSource<any>(this.userList);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    });
  }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  UpdateUser(username: any) {
    if(sessionStorage.getItem('userrole') === '1' || sessionStorage.getItem('userrole') === '2')
    {
      const popup = this.dialog.open(UpdatepopupComponent,{
        enterAnimationDuration:'1000ms',
        exitAnimationDuration:'500ms',
        width:'13%',
        data:{
          username:username
        }
      });
      popup.afterClosed().subscribe(res =>{
        this.LoadUsers();
      });
    }
    else
    {
      this.toastr.error("Sorry you don't have access to the Action! This is going to be reported to the Admin","Admin Only");
    }
    }
    
   AddUser(){
    if(sessionStorage.getItem('userrole') === '1'||sessionStorage.getItem('userrole')==='2')
    {
      const popup=this.dialog.open( AddUserComponent ,{
        enterAnimationDuration:'1000ms',
        exitAnimationDuration:'500ms',
        width:'15%',
      });
      popup.afterClosed().subscribe(res =>{
        this.LoadUsers();
      });
    }
    else
    {
      this.toastr.error("Sorry you don't have access to the Action! This is going to be reported to the Admin","Admin Only");
    }
   }
}


