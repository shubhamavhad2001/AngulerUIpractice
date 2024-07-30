import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  userdata: any;
  constructor(private builder:FormBuilder,private toastr:ToastrService,private service:AuthService,private router:Router)
  {
    sessionStorage.clear();
  }
  loginform = this.builder.group({
    username:this.builder.control('',Validators.compose([Validators.required,Validators.minLength(5)])),
    password:this.builder.control("",Validators.compose([Validators.required,Validators.minLength(8)])),
  })
  proceedLogin()
  {
    const userLogin = {
      id: "",
      orgId: "",
      username: this.loginform.value.username
    }
    console.log(userLogin);
    if(this.loginform.valid){
      this.service.GetById(userLogin).subscribe(res =>{
        this.userdata = res;
        if(this.userdata.password === this.loginform.value.password)
        {
          if(this.userdata.status)
          {
            sessionStorage.setItem('username',this.userdata.username);
            sessionStorage.setItem('userId',this.userdata.id);

            sessionStorage.setItem('userrole',this.userdata.usrRole);
            sessionStorage.setItem('name',this.userdata.name);
            sessionStorage.setItem('orgId',this.userdata.orgId);
            this.router.navigate(['home']);
          }
          else
          {
            this.toastr.warning("Please Contact your organization's admin",'In Active User Account')
          }
        }
        else
        {
          this.toastr.error("Invalid Credentials");
        }
      });
    }
  }
}
