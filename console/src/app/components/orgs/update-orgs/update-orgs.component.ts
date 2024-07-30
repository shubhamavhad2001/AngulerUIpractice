import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-update-orgs',
  templateUrl: './update-orgs.component.html',
  styleUrls: ['./update-orgs.component.scss']
})
export class UpdateOrgsComponent {
  constructor(private builder:FormBuilder,private service: AuthService,@Inject(MAT_DIALOG_DATA) public data:any,private toastr:ToastrService,private dialog:MatDialogRef<UpdateOrgsComponent>) {
  }
  updateForm = this.builder.group({
    orgId:this.builder.control(""),
    orgName: this.builder.control(""),
    orgStatus:this.builder.control(false),
    creationTime:this.builder.control(Number)  
  });
  orgData:any;
  ngOnInit()
  {
    const request = {
      orgId:this.data.data,
      orgName:""
    }
    this.service.getOrgById(request).subscribe((res) =>{
      if(res !== null)
      {
        this.orgData = res;
        this.updateForm.setValue({
          orgId:this.orgData.orgId,
          creationTime:this.orgData.creationTime,
          orgName:this.orgData.orgName,
          orgStatus:this.orgData.orgStatus,
        });
      }
    })
  }



  updateOrg()
  {
    if(this.updateForm.valid)
    {
      if(sessionStorage.getItem('userrole') === '1')
      {
        this.service.updateOrg(this.updateForm.value.orgId,this.updateForm.value).subscribe((res) =>{
          if(res)
          {
            this.toastr.success("Org Updated Successfully");
            this.dialog.close();
          }
          else
          {
            this.toastr.error("Org Not Found","Error: 404 Occurred")
            this.dialog.close();
          }
        },(error) =>{
          if(error === "404")
          {
            this.toastr.error("Org Not Found","Error: 404 Occurred")
            this.dialog.close();
          }
          else if(error === "200")
          {
            this.toastr.success("Org Updated Successfully");
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
        this.toastr.warning("Global Admin can only update license","Admin Only")
      }
    }
  }
}
