import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import * as uuid from 'uuid';
    

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
 
  rolelist:any=[];
  orgsList: any;
  list:any;
  success:any;
  userForm:any;
  userRole=sessionStorage.getItem('userrole');
  rolelist1:any;
  variable:any;
  orgid=sessionStorage.getItem('orgId');
  constructor(private service: AuthService,private dialog:MatDialog,private toastr:ToastrService,private builder:FormBuilder){
    
  }

  ngOnInit(){
    this.featchUser();
    this.loadOrg();
  }
    
    
  registerUserForm=this.builder.group({
    name:this.builder.control(""),
    username:this.builder.control(""),
    orgId:this.builder.control(""),
    usrRole:this.builder.control(""),
    password:this.builder.control(""),
    confirm_password:this.builder.control(""),
    Status:this.builder.control("")
  });  
  
  matchPassword(){
    if(this.registerUserForm.get('password')?.value != this.registerUserForm.get('confirm_password')?.value){
        this.success=false;
        this.toastr.error('Password and confirm password does not match');
    }
    else{
      this.success=true;
    }
  }
  featchUser(){
    this.service.getAllRole().subscribe(res => {
        this.list = res;
        console.log(this.list);
        if(this.userRole==='1')
        {
          console.log("1 st loop");
          
          this.rolelist=this.list;
        }
        else if(this.userRole==='2'){
           this.rolelist=this.list.filter((item: { userRoleId: string; }) => item.userRoleId !== '1' && item.userRoleId !== '2');
           console.log(this.rolelist);
          }
      });
    } 
  loadOrg(){
    if (this.userRole === '1' ) {
      this.service.GetAllOrgs().subscribe(res => {
          this.orgsList = res.content;
        });
      }
      else{
        const request={
          orgId:sessionStorage.getItem('orgId'),
          orgName:""
        }
        this.service.GetOrg(request).subscribe(res =>{
          this.orgsList = res;
          console.log(this.orgsList);
          
        });
      }
    }
   addUser(){
    if(this.userRole==='1'){
    this.userForm=this.builder.group({
      id:uuid.v4().toString(),
      name:this.registerUserForm.value.name,
      username:this.registerUserForm.value.username,
      orgId:this.registerUserForm.value.orgId,
      password:this.registerUserForm.value.password,
      usrRole:this.registerUserForm.value.usrRole,

      status:this.registerUserForm.value.Status
    });
    this.service.addUser(this.userForm.value).subscribe(res=>{
      if(res){
        this.toastr.success('User Added Succesfully');
        this.dialog.closeAll();
      }
      else{
        this.toastr.error('Try Again Later','Unknown Error Occurred');
      }
    },(error)=>{
      if(error.status === 302)
        {
          this.toastr.warning(' Already Registered.',"Try with Different Name");
        }
        else if(error.status === 200){
          this.toastr.success('Registered Successfully');
          this.dialog.closeAll();
          
          }
        else{
          console.log("Something Fishy");
          console.log('Unknown Error Ocurred',"Please try again after sometime");
        }
    });
  }else if(this.userRole==='2')
  {
    this.userForm=this.builder.group({
      id:uuid.v4().toString(),
      name:this.registerUserForm.value.name,
      orgId:this.orgid,
      username:this.registerUserForm.value.username,
      password:this.registerUserForm.value.password,
      usrRole:this.registerUserForm.value.usrRole,
      status:this.registerUserForm.value.Status
     });
     this.service.addUser(this.userForm.value).subscribe(res=>{
      if(res){
        this.toastr.success('User Added Succesfully');
        this.dialog.closeAll();
      }
      else{
        this.toastr.error('Try Again Later','Unknown Error Occurred');
      }
    },(error)=>{
      if(error.status === 302)
        {
          this.toastr.warning(' Already Registered.',"Try with Different Name");
        }
        else if(error.status === 200){
          this.toastr.success('Registered Successfully');
          this.dialog.closeAll();
          console.log("The Error Occurred");
          
          this.toastr.error('Try Again Later','Unknown Error Occurred');
        }
        else{
          console.log("Something Fishy");
          this.toastr.error('Unknown Error Ocurred',"Please try again after sometime");
        }
    });
    
     
    }
  }
}



