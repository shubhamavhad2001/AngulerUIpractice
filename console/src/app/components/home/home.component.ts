import { Component } from '@angular/core';
import { FormBuilder, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { InfopopupComponent } from '../infopopup/infopopup.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent {
[x: string]: any;
  dots:any;
  moreText:any;
  btnText:any;
  id:any;


  constructor(private builder: FormBuilder, private dialog:MatDialog, private toastr: ToastrService, private service: AuthService, private router: Router) {

  }
  updateform = this.builder.group({
    name: this.builder.control(""),
    email: this.builder.control('',Validators.compose([Validators.required,Validators.minLength(5)])),
    message: this.builder.control(''),
    phone: this.builder.control('',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    subject: this.builder.control('About Nbot Sever'),

  });

  sendMail() {

    const mailform = this.builder.group({
      recipient: this.builder.control('support@ksemin.in'),
      msgBody: this.builder.control("Name: "+this.updateform.value.name + '\n'+"Email " + this.updateform.value.email + "\n"+"Phone No: " +this.updateform.value.phone+"\n"+"Meassage: "+ this.updateform.value.message),
      subject: this.builder.control('About Nbot Sever'),

    });
    this.service.sendEmail(mailform.value).subscribe((result) => {
        this.toastr.success('Email send succesfully');
        this.updateform.reset();      
    });
    
  }

  InfoPopup()
  {
    const popup = this.dialog.open(InfopopupComponent,{
      enterAnimationDuration:'1000ms',
      exitAnimationDuration:'500ms',
      width:'30%',
    });
  }
 

   
  
}
 
 
 


