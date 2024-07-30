import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.scss']
})
export class UpdatepopupComponent implements OnInit {
  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: AuthService,@Inject(MAT_DIALOG_DATA) public data:any,
  private dialog:MatDialogRef<UpdatepopupComponent>) {

  }

  updateform = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(""),
    orgId: this.builder.control(''),
    username: this.builder.control(''),
    password: this.builder.control(""),
    usrRole: this.builder.control('', Validators.required),
    status: this.builder.control(false)
  });
  editdata:any;
  ngOnInit(): void {
    this.service.getAllRole().subscribe(res => {
      this.rolelist = res;
      
    });
    if(this.data.username != null && this.data.username !='')
    {
      console.log(this.data);
      const userUpdate = {
        id: "",
        orgId: "",
        username: this.data.username
      }
      this.service.GetById(userUpdate).subscribe(res =>{
        this.editdata = res;
        this.updateform.setValue({
          id:this.editdata.id,
          name:this.editdata.name,
          orgId:this.editdata.orgId,
          username:this.editdata.username,
          password:this.editdata.password,
          usrRole:this.editdata.usrRole,
          status:this.editdata.status
        });
      });
    }


  }

  rolelist: any;

  

  updateuser() {
    if(this.updateform.valid)
    {
      if(sessionStorage.getItem('userrole') === '1')
      {
        this.service.Updateuser(this.updateform.value.id,this.updateform.value).subscribe(res=>{
          this.toastr.success("User Updated Successfully");
          this.dialog.close();
        });
      }
      else if(sessionStorage.getItem('userrole') === '2')
      {
        if(this.updateform.value.usrRole === '1' || this.updateform.value.usrRole === '2')
        {
          this.toastr.error('You cannot change user role to Global Admin','Global Admin Only');
        }
        else
        {
          this.service.Updateuser(this.updateform.value.id,this.updateform.value).subscribe(res=>{
            this.toastr.success("User Updated Successfully");
            this.dialog.close();
          });
        }
      }
      
    }
    else
    {
      this.toastr.warning('Please Select Role');
    }
  }

}
