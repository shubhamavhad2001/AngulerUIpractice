import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import * as uuid from 'uuid';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Geometry } from 'src/app/models/geometry';
import { SensorsModel } from 'src/app/models/sensors-model';
import { DevicesModel } from 'src/app/models/devices-model';
import { SensorType } from 'src/app/models/sensor-type';
@Component({
  selector: 'app-add-devices',
  templateUrl: './add-devices.component.html',
  styleUrls: ['./add-devices.component.scss']
})
export class AddDevicesComponent {
  constructor(private service: AuthService,private dialog:MatDialogRef<AddDevicesComponent>,private toastr:ToastrService,private builder:FormBuilder ) {
  }
  toppings=new FormControl('');
  values: any =[];
  selectedItem=[];
  licenses:any;
  license:any=[];
  userId=sessionStorage.getItem('userId')
  orgId=sessionStorage.getItem('orgId')
  geometry: Geometry = new Geometry();
  // Sensors:any=[];
  sensors:any=[];
  registerDeviceForm=this.builder.group({
    sensorName:this.builder.control("",Validators.compose([Validators.required,Validators.minLength(1)])),
    sensorType:this.builder.control([],Validators.compose([Validators.required,Validators.minLength(1)])),
    license:this.builder.control("",Validators.compose([Validators.required,Validators.minLength(1)])),
    Health:this.builder.control("")
  });
  
  private sensor:any=[];
  private devices:DevicesModel = new DevicesModel();
  
  
  private sensorType:Array<SensorType> = [];
  sensorDetails=[];
  
  device = {
    id:"",
    name:this.registerDeviceForm.value.sensorName,
    sensors:this.sensor,
    geometry:this.geometry,
    userId:this.userId,
    orgId:this.orgId,
    licenseId:this.registerDeviceForm.value.license,
    Health:true,
    lastBootTime:new Date().getTime(),
    activationTime:new Date().getTime(),
    lastSyncTime:new Date().getTime(),
    expirationTime:new Date().getTime(),
    masterfqdn:"kSemin Systems.Pvt.Ltd"
  }



  ngOnInit(){
   this.getSensors()
   this.service.GetLicensesByUserId(this.userId).subscribe(res=>{
    this.license=res;
    });
  }
  
 
  
  AddDevice()
  {
    
    // for(let i=0;i < this.values.length ; i++)
    // {
    //   let stype:any = this.registerDeviceForm.value?.sensorType;
    //   if(this.values[i].sensorTypeId == stype[i])
    //   {
    //     this.sensorType.push(this.values[i]);
    //     this.sensor.push({
    //       sensorId: this.sensorType[i].sensorTypeId,
    //       sensorName: this.sensorType[i].sensorType,
    //       vendorId: "0971be8b-75b4-4f92-b56d-022bd0e7df8c",
    //       threshold: "0",
    //       sensorHealthStatus: this.registerDeviceForm.value.Health
    //     });
    //   }
    // }
  const selectedSensorTypes = this.registerDeviceForm.value.sensorType ?? [];
  const licenseId = this.registerDeviceForm.value.license;

  for (const selectedSensorType of selectedSensorTypes) {
    const selectedSensor = this.values.find((sensor: { sensorTypeId: any; }) => sensor.sensorTypeId === selectedSensorType);

    if (selectedSensor) {
      this.sensorType.push(selectedSensor); // Push the selected sensor type to the array
      this.sensor.push({
        sensorId: selectedSensor.sensorTypeId,
        sensorName: selectedSensor.sensorType,
        vendorId: "0971be8b-75b4-4f92-b56d-022bd0e7df8c",
        threshold: "0",
        sensorHealthStatus: this.registerDeviceForm.value.Health
      });
    }
  }
    this.devices.id= uuid.v4().toString();
    this.devices.sensors = this.sensor;
    this.devices.userId=this.userId;
    this.devices.orgId=this.orgId;
    this.devices.licenseId=this.registerDeviceForm.value.license;
    this.devices.Health=this.registerDeviceForm.value.Health;
    this.devices.activationTime=new Date().getTime();
    this.devices.lastBootTime=new Date().getTime();
    this.devices.lastSyncTime=new Date().getTime();    
    this.registerDevice()
    // console.log(this.device);
    
  }
  
  registerDevice()
  { 
      // console.log(this.device);
      
    for(let i=0;i< this.license.length;i++)
    {
      if(this.license[i].licenseId == this.registerDeviceForm.value.license)
      {
        this.device.licenseId = this.license[i].licenseId;
        this.device.expirationTime = this.license[i].expiryTime;
        
      }
    }    
    for(let i=0;i< this.license.length;i++)
    {
      if(this.device.sensors[i].sensorId != null)
      {
        this.service.AddDevice(this.device).subscribe((res)=>{
          
          if(res)
          {
            this.toastr.success("Device Added Successfully","Thank you")
            this.dialog.close();
          }
          else
          {
            this.toastr.error("Something Went Wrong","Error")
            this.dialog.close();
          }
        },(error) =>{
          if(error === 409)
          {
            this.toastr.error("Please Try Again Later","Server Conflict")
            this.dialog.close();
          }
          else if(error === 406)
          {
            this.toastr.error("Please Fill the form correctly","Response Not Acceptable")
          }
          else if(error === 206)
          {
            this.toastr.error("Please Fill the form correctly","Response Not Acceptable")
          }
          else
          {
            this.toastr.error("Please try again after some time","Something went wrong")
            this.dialog.close();
          }
        }
        );
      }
      else{
        this.toastr.error("Please Fill the form correctly","Response Not Acceptable");
      }
    
    }
  }
  getSensors()
  {
    this.service.Sensortype().subscribe((data: any)=>
    {
     this.values=data;
    });
    
  }
}
