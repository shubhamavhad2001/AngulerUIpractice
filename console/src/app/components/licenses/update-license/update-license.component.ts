import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-update-license',
  templateUrl: './update-license.component.html',
  styleUrls: ['./update-license.component.scss']
})
export class UpdateLicenseComponent {
  constructor(private builder:FormBuilder,private service: AuthService,private toastr:ToastrService,@Inject(MAT_DIALOG_DATA) public licenseId:any,private dialog:MatDialogRef<UpdateLicenseComponent>) {
  }
  updateLcsForm = this.builder.group({
    licenseId:this.builder.control(''),
    orgId:this.builder.control(""),
    userId: this.builder.control(""),
    licenseStatus:this.builder.control(Boolean),
    creationTime:this.builder.control(Number),
    expiryTime:this.builder.control(new Date())
  });
  lcsData:any;
  ngOnInit()
  {
    if(this.licenseId !== null)
    {
      console.log(this.licenseId.licenseId);
      const request={
        licenseId:this.licenseId.licenseId,
        orgId:"",
        userId:"",
        licenseStatus:false,
        creationTime:new Date()
     }
     this.service.GetLicenseById(request).subscribe((res) =>{
      this.lcsData = res;
      this.updateLcsForm.setValue({
        licenseId:this.lcsData.licenseId,
        orgId:this.lcsData.orgId,
        userId:this.lcsData.userId,
        licenseStatus:this.lcsData.licenseStatus,
        creationTime:this.lcsData.creationTime,
        expiryTime:this.lcsData.expiryTime
      });
     })
    }
  }





  updateLicense()
  {
    if(this.updateLcsForm.valid)
    {
      console.log("In the Update License function")
      if(sessionStorage.getItem('userrole') === '1' || sessionStorage.getItem('userrole') === '2')
      {
        this.service.updateLicense(this.updateLcsForm.value.licenseId,this.updateLcsForm.value).subscribe((res) =>{
          if(res)
          {
            this.toastr.success("License Updated Successfully");
            this.dialog.close();
          }
          else
          {
            this.toastr.error("License Not Found","Error: 404 Occurred")
            this.dialog.close();
          }
        },(error) =>{
          if(error === "404")
          {
            this.toastr.error("License Not Found","Error: 404 Occurred")
            this.dialog.close();
          }
          else
          {
            this.toastr.error("Please try again later ","Unknown error Occurred")
            this.dialog.close();
          }
        }
        )
      }
      else
      {
        this.toastr.warning("Organisation Admin can only update license","Admin Only")
      }
    }
  }
  
}
