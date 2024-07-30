import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-update-devices',
  templateUrl: './update-devices.component.html',
  styleUrls: ['./update-devices.component.scss']
})
export class UpdateDevicesComponent {

  device:any;
  sensor:any;
  updateform = this.builder.group({
    sensorId:this.builder.control(this.data.sensorId),
    sensorName:this.builder.control(''),
    threshold: this.builder.control(''),
    vendorId:this.builder.control(''),
    sensorHealthStatus: this.builder.control(false)
  });
  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: AuthService,@Inject(MAT_DIALOG_DATA) public data:any,
  private dialog:MatDialogRef<UpdateDevicesComponent>) {

  }
  request:any = {
      deviceId: String,
      id: String,
      licenseId: String,
      orgId: String,
      sensorId:String
  }
  
  ngOnInit()
  {
    this.request.deviceId = this.data.deviceId;
    this.service.getDeviceById(this.request).subscribe((res)=>{      
      this.device = res;
      for(let i = 0; i< this.device.sensors.length;i++)
      {
        if(this.device.sensors[i].sensorId === this.data.sensorId)
        {
          this.updateform.setValue({
            sensorId:this.device.sensors[i].sensorId,
            sensorName:this.device.sensors[i].sensorName,
            threshold:'',
            sensorHealthStatus:this.device.sensors[i].sensorHealthStatus,
            vendorId:this.device.sensors[i].vendorId
          });
        }
      }
      
    });
    
  }

  updateDevice()
  {
    if(this.updateform.valid)
    {
      if(sessionStorage.getItem('userrole') !== '4')
      {
        for(let i=0;i < this.device.sensors.length;i++)
        {
          if(this.device.sensors[i].sensorId === this.data.sensorId)
          {
            
            this.sensor = this.updateform;
            this.device.sensors[i] = this.sensor.value;
            this.service.updateDevice(this.device).subscribe((res) =>{
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
        
      }
    }
  }
}
