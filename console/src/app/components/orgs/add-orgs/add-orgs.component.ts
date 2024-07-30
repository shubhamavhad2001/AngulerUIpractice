import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-add-orgs',
  templateUrl: './add-orgs.component.html',
  styleUrls: ['./add-orgs.component.scss']
})
export class AddOrgsComponent {
  
  constructor(private builder:FormBuilder,private service: AuthService,private toastr:ToastrService,private dialog:MatDialogRef<AddOrgsComponent>) {
  }
  registerOrgForm = this.builder.group({
    orgId:this.builder.control(uuid.v4()),
    orgName: this.builder.control("",Validators.compose([Validators.required,Validators.minLength(1)])),
    orgStatus:this.builder.control(false)  
  });
  AddOrgs()
  {
    this.service.AddOrgs(this.registerOrgForm.value).subscribe((res)=>{
      if(res)
      {
        this.toastr.success('Thank you for joining us!','Registered Successfully');
        this.dialog.close();
      }
      else
      {
        console.log("The Error Occurred");
        this.toastr.error('Try Again Later','Unknown Error Occurred');
      }
    },(error) =>{
      if(error.status === 302)
        {
          this.toastr.warning('Organization Already Registered.',"Try with Different Name");
        }
        else if(error.status === 200){
          this.toastr.success('Thank you for joining us!','Registered Successfully');
          this.dialog.close();
          console.log("The Error  Occurred");
          this.toastr.error('Try Again Later','Unknown Error Occurred');
        }
        else
        {
          console.log("Something Fishy");
          this.toastr.error('Unknown Error Ocurred',"Please try again after sometime");
        }
    }
    );
  }
}
