import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { AddLicenseComponent } from './add-license/add-license.component';
import { UpdateLicenseComponent } from './update-license/update-license.component';

@Component({
  selector: 'app-licenses',
  templateUrl: './licenses.component.html',
  styleUrls: ['./licenses.component.scss']
})
export class LicensesComponent {

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  licenseList:any;
  displayedColumns: string[] = ['licenseId', 'orgId', 'userId' , 'licenseStatus','creationTime','expiryTime','Actions'];
  usrRole:any;
  orgId:any;
  orgsList:any;
  @ViewChild(MatPaginator) paginator !:MatPaginator;
  @ViewChild(MatSort) sort !:MatSort;
  constructor(private service: AuthService,private dialog:MatDialog,private toastr:ToastrService) {
  }
  ngOnInit(): void 
  {
    this.usrRole = sessionStorage.getItem('userrole');
    this.orgId = sessionStorage.getItem('orgId');
    this.LoadOrg();
    if(sessionStorage.getItem("userrole") != '1'){
      this.LoadLicenses()
    }
  }
  LoadLicenses()
  {
    
    if(sessionStorage.getItem("userrole") === '1')
    {
     const request={
      licenseId:"",
      orgId:this.orgId,
      userId:"",
      licenseStatus:false,
      creationTime:new Date()
   }
      this.service.GetAllLicensesByOrgId(request).subscribe(res =>{
        this.licenseList = res;
          this.dataSource = new MatTableDataSource<any>(this.licenseList);
          this.dataSource.paginator=this.paginator;
          this.dataSource.sort=this.sort;
      },error =>{
        if(error.status === 404)
        {
          this.toastr.warning('Licenses Not Found');
        }
        else{
          this.toastr.error('Unknown Error Occured: Please try again later');
        }
      }
      );
    }
    else{
      const request={
        licenseId:"",
        orgId:sessionStorage.getItem("orgId"),
        userId:"",
        licenseStatus:false,
        creationTime:new Date()
     }
      this.service.GetAllLicensesByOrgId(request).subscribe(res =>{
        this.licenseList = res;
        
          this.dataSource = new MatTableDataSource<any>(this.licenseList);
          this.dataSource.paginator=this.paginator;
          this.dataSource.sort=this.sort;
      },error =>{
        if(error.status === 404)
        {
          this.toastr.warning('Licenses Not Found');
        }
        else{
          this.toastr.error('Unknown Error Occured: Please try again later');
        }
      }
      );
    }
      
  }
  LoadOrg()
  {
    if(sessionStorage.getItem('userrole')==='1'){
    this.service.GetAllOrgs().subscribe(res =>{
      this.orgsList = res.content;     
    });
   }
   else{
    const request={
      id:"",
      orgId:sessionStorage.getItem("orgId"),
      usrId:""
    }
      this.service.getOrgById(request).subscribe(res =>{
        this.orgsList = [res];     
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  Addlcs() 
  {
    if(sessionStorage.getItem('userrole') === '1' || sessionStorage.getItem('userrole') === '2')
    {
      const popup = this.dialog.open(AddLicenseComponent,{
        enterAnimationDuration:'1000ms',
        exitAnimationDuration:'500ms',
        width:'15%'
      });
      popup.afterClosed().subscribe(res =>{
        this.LoadLicenses();
      });
    }
    else
    {
      this.toastr.error("Sorry you don't have access to the Action! This is going to be reported to the Admin","Admin Only");
    }
  }
  updateLicense(license:any)
  {
    if(sessionStorage.getItem('userrole') === '1' || sessionStorage.getItem('userrole') === '2')
    {
      const popup = this.dialog.open(UpdateLicenseComponent,{
        enterAnimationDuration:'1000ms',
        exitAnimationDuration:'500ms',
        width:'15%',
        data:{
          licenseId:license
        }
      });
      popup.afterClosed().subscribe(res =>{
        this.LoadLicenses();
      });
    }
    else
    {
      this.toastr.error("Sorry you don't have access to the Action! This is going to be reported to the Admin","Admin Only");
    }
  }
  deleteLicense(licenseId:any)
  {
    if(confirm("Do you want to delete the license?"))
    {
      this.service.deleteLicenses(licenseId).subscribe((res)=>{
        if(res)
        {
          this.toastr.success("License removed from your profile sucessfully","Deleted Successfully");
          this.LoadLicenses();
        }
        else
        {
          this.toastr.error("Unknown Error occurred please try again after sometime","Unknown Error");
          this.LoadLicenses();
        }
      },(error)=>{
        if(error === '404')
        {
          this.toastr.warning("License is already deleted","License Not Found");
          this.LoadLicenses();
        }
        else
        {
          this.toastr.error("Unknown Error occurred please try again after sometime","Unknown Error");  
          this.LoadLicenses();
        }
      }
      )
    }
  }
}
