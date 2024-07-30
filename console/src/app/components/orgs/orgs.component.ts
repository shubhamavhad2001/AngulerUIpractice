import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { AddOrgsComponent } from './add-orgs/add-orgs.component';
import { ToastrService } from 'ngx-toastr';
import { UpdateOrgsComponent } from './update-orgs/update-orgs.component';

@Component({
  selector: 'app-orgs',
  templateUrl: './orgs.component.html',
  styleUrls: ['./orgs.component.scss']
})
export class OrgsComponent {
  displayedColumns: string[] = ['orgId', 'orgName', 'orgStatus', 'creationTime',"Actions"];
  orgsList: any;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  element: any;
  dataModify: any;
  date: any;
  constructor(private service: AuthService, private dialog: MatDialog,private toastr:ToastrService) {
  }
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  ngOnInit(): void {
    this.LoadOrgs();
  }
  LoadOrgs() {
    if (sessionStorage.getItem('userrole') === '1') {
      this.service.GetAllOrgs().subscribe(res => {
        console.log(res);
        
        this.orgsList = res.content;
        this.dataSource = new MatTableDataSource<any>(this.orgsList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    }
    else {
      const request={
        orgId:sessionStorage.getItem('orgId'),
        orgName:""
      }
      this.service.GetOrg(request).subscribe(res => {
        this.orgsList = res;
        this.dataSource = new MatTableDataSource<any>(this.orgsList);
      })

    }

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  AddOrgs() {
    if(sessionStorage.getItem('userrole') === '1')
    {
      const popup = this.dialog.open(AddOrgsComponent,{
        enterAnimationDuration:'1000ms',
        exitAnimationDuration:'500ms',
        width:'15%'
      });
      popup.afterClosed().subscribe(res =>{
        this.LoadOrgs();
      });
    }
    else
    {
      this.toastr.error("Sorry you don't have access to the Action! This is going to be reported to the Admin","Admin Only");
    }
    }

    updateOrgs(id:any)
    {
      if(sessionStorage.getItem('userrole') === '1')
    {
      const popup = this.dialog.open(UpdateOrgsComponent,{
        enterAnimationDuration:'1000ms',
        exitAnimationDuration:'500ms',
        width:'15%',
        data:{
          data:id
        }
      });
      popup.afterClosed().subscribe(res =>{
        this.LoadOrgs();
      });
    }
    else
    {
      this.toastr.error("Sorry you don't have access to the Action! This is going to be reported to the Admin","Admin Only");
    }
    }
    deleteOrgs(id:any)
    {
      if(confirm("Do you want to Delete?"))
      {
        this.service.deleteOrgs(id).subscribe((res) =>{
          if(res)
          {
            this.toastr.success("Deleted Successfully.","Org Deleted successfully.");
            this.LoadOrgs();
          }
          else
          {
            this.toastr.success("Not Found.","Org Not Found.");
            this.LoadOrgs();
          }
        })
      }
    }
  }
