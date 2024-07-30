import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { interval } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sensor-data',
  templateUrl: './sensor-data.component.html',
  styleUrls: ['./sensor-data.component.scss']
})
export class SensorDataComponent {
  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: AuthService,@Inject(MAT_DIALOG_DATA) public data:any) {

  }
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[] = ["CurrentValues"];
  currentSensors:any;
  currents:any[] = [];
  usrRole:any;
  myinterval:any;
  myObservable=interval(60000);
  @ViewChild(MatPaginator) paginator !:MatPaginator;
  @ViewChild(MatSort) sort !:MatSort;
  ngOnInit(): void {
    this.LoadCurrentValues();
  }


  LoadCurrentValues()
  {
    const request = {
      id:"",
      sensorId:"",
      deviceId:this.data.deviceId
    }
    if (this.data.sensorId!=""){
    this.service.GetAllCurrentSensors(request).subscribe(res=>{
      this.currentSensors = res;
      for(let i=0;i< this.currentSensors.length;i++)
    {
        
      for(let k=0; k < this.currentSensors[i].sensors.length;k++)
      {
       if(this.currentSensors[i].sensors[k].sensorId === this.data.sensorId)
        {
          this.currents.push(this.currentSensors[i].sensors[k].currentValue);
        }
      }
`` }
        this.dataSource = new MatTableDataSource<any>(this.currents);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
        this.currents=[];
        this.reloadValues();
        
        
    });
  }
  else{
    clearInterval(this.myinterval);
  }
  }


  reloadValues():any {
      this.myinterval=this.myObservable.subscribe(() => {
        this.LoadCurrentValues(); 
      });
    }



    getReport():any{
      const dId = this.data.deviceId;
      const sId = this.data.sensorId;
      const orgId = sessionStorage.getItem('orgId');
      const startTime:number = Date.now()-(86400000 * 7);
      const endTime:number = Date.now()+(10000);
      const reportForm = this.builder.group({
        dId: this.builder.control(dId,Validators.compose([Validators.required,Validators.minLength(1)])),
        orgId: this.builder.control(orgId,Validators.compose([Validators.required,Validators.minLength(1)])),
        sId:this.builder.control(sId,Validators.compose([Validators.required,Validators.minLength(1)])),
        startDate:this.builder.control(startTime,Validators.compose([Validators.required,Validators.minLength(1)])),
        endDate:this.builder.control(endTime,Validators.compose([Validators.required,Validators.minLength(1)]))});


        this.service.GetReport(reportForm.value).subscribe((res) =>{
          let blob:Blob=res.body as Blob;
          let url = window.URL.createObjectURL(blob);
          window.open(url);
        },error =>{
          if(error.status === 500)
          {
            this.toastr.warning('No Data found for this week','Please try again');
          }
          else{
            this.toastr.error('Unknown Error Occured.' ,'Please try again later');
          }
        }
        
        )
  }
}
