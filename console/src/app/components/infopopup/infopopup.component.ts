import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-infopopup',
  templateUrl: './infopopup.component.html',
  styleUrls: ['./infopopup.component.scss']
})
export class InfopopupComponent {
  requestForm = this.builder.group({
    name: this.builder.control(""),
    organisation_name: this.builder.control(''),
    email: this.builder.control(''),
    industry: this.builder.control('', Validators.required),
    phone: this.builder.control('')
  });
  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: AuthService,@Inject(MAT_DIALOG_DATA) public data:any,
  private dialog:MatDialogRef<InfopopupComponent>) {

  }
  ngOnInit(): void {
  }
  sendMail() {

    const mailform = this.builder.group({
      recipient: this.builder.control('pranav@ksemin.in'),
      msgBody: this.builder.control("Hi There,\n"+"My name is "+this.requestForm.value.name + '. '+"I am from this organization"+this.requestForm.value.organisation_name +" and i want a demo of our product for the "+this.requestForm.value.industry+" industry"+".\nPlease call me on this number "+this.requestForm.value.phone+" or you can mail me on "+this.requestForm.value.email+" this email.\n\n"+"--\nThanks & Regards,\n"+this.requestForm.value.name),
      subject: this.builder.control('About Nbot Sever Demo'), 

    });
    this.service.sendEmail(mailform.value).subscribe((result) => {
        this.toastr.success('Email send succesfully');
        this.requestForm.reset();
        this.dialog.close();    
    });
    
  }
}
