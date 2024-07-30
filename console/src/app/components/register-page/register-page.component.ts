import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as uuid from 'uuid';
import { ToastrService} from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  constructor(private builder:FormBuilder,private toastr:ToastrService,private service:AuthService,private router:Router)
  {
    
  }
  registerform = this.builder.group({
    id:this.builder.control(uuid.v4()),
    name: this.builder.control("",Validators.compose([Validators.required,Validators.minLength(1)])),
    orgId: this.builder.control('',Validators.compose([Validators.required])),
    username:this.builder.control('',Validators.compose([Validators.required,Validators.minLength(5)])),
    password:this.builder.control("",Validators.compose([Validators.required,Validators.minLength(8)])),
    usrRole:this.builder.control(''),
    status:this.builder.control(false)  
  });

  proceedregistration()
  {
    if(this.registerform.valid){
      this.service.ProceedRegister(this.registerform.value).subscribe(res => {
          this.toastr.success('Please Contact Organizational Admin to enable access','Registered Successfully');
          this.router.navigate(['login']);       
      },error =>{
        if(error.status === 302)
        {
          this.toastr.warning('User Already Registered.',"Try with Different Email");
        }
        else if(error.status === 200){
          console.log(error);
          this.toastr.success('Please Contact Organizational Admin to enable access','Registered Successfully');
          this.router.navigate(['login']);
        }
        else
        {
          this.toastr.error('Unknown Error Ocurred',"Please try again after sometime");
        }
      }
      
      )
    }
    else
    {
      this.toastr.warning('Please Enter Valid Data');
    }
  }
  goToLogin()
  {
    this.router.navigate(['']);
  }
}
