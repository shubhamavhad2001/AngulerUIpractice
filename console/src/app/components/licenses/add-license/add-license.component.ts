import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import * as uuid from 'uuid';
import { DatePipe,formatDate } from '@angular/common';

@Component({
  selector: 'app-add-license',
  templateUrl: './add-license.component.html',
  styleUrls: ['./add-license.component.scss'],
  providers: [DatePipe]
})
export class AddLicenseComponent {
orgSelected: any;
orgList: any
deviceSelected: any;
usrList: any;
usrRole=sessionStorage.getItem('userrole');
constructor(private datePipe: DatePipe,private builder:FormBuilder,private service: AuthService,private toastr:ToastrService,private dialog:MatDialogRef<AddLicenseComponent>) {
}
ngOnInit()
{
  this.LoadOrgs();
}
LoadOrgs()
{
  if (sessionStorage.getItem('userrole') === '1') {
    this.service.GetAllOrgs().subscribe(res => {
      this.orgList = res.content;
    })
  }
  else {
    const request={
      orgId:sessionStorage.getItem('orgId'),
      orgName:""
    }
    this.service.GetOrg(request).subscribe(res => {
      // console.log(res);
      
      this.orgList = [res];
      console.log(this.orgList);
      
    })

  }
}
LoadUsers(selectedOrgId:any) {
  const userLogin = {
    id: "",
    orgId: selectedOrgId,
    username: ""
  }
  this.service.GetAllUsersByOrgId(userLogin).subscribe((res) =>{
    this.usrList = res;
    
  });
}



registerLcsForm = this.builder.group({
  licenseId:this.builder.control(uuid.v4()),
  orgId:this.builder.control("",Validators.compose([Validators.required,Validators.minLength(1)])),
  userId: this.builder.control("",Validators.compose([Validators.required,Validators.minLength(1)])),
  licenseStatus:this.builder.control(false),
  expiryTime:this.builder.control(new Date(),Validators.compose([Validators.required,Validators.minLength(1)]))
});

AddLicense()
{
  this.service.AddLicenses(this.registerLcsForm.value).subscribe((res)=>{
    if(res)
    {
      this.toastr.success('Thank you for purchasing!','Added Successfully');
      
      this.dialog.close();
    }
    else
    {
      this.toastr.error('Try Again Later','Unknown Error Occurred');
    }
  },(error) =>{
     if(error.status === 200){
        this.toastr.success('Thank you for purchasing!','Added Successfully');
        this.dialog.close();
      }
      else
      {
        this.toastr.error('Unknown Error Ocurred',"Please try again after sometime");
      }
  }
  );
}

}
