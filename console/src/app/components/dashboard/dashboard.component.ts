import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogState } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { interval } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ChartComponent } from '../charts/chart/chart.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  displayedColumns: string[] = ['sensorId', 'sensorName', 'status', 'Action'];
  sensorList: any;
  deviceList: any;
  currentSensors:any;
  currents:any[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  deviceSelected:any;
  sensorSelected:any;
  element: any;
  dataModify:any;
  date:any;
  myinterval:any;
  myObservable=interval(60000);
  usrRole:any;
  //Declaration Done Here

  constructor(private builder:FormBuilder,private service: AuthService,private dialog:MatDialog) {
  }
  @ViewChild(MatPaginator) paginator !:MatPaginator;
  @ViewChild(MatSort) sort !:MatSort;
  
  ngOnInit(): void {
    this.usrRole = sessionStorage.getItem('userrole');
    this.LoadDevices();
  }
  LoadSensors(selecteDeviceId:any) {
    const request = {
      id: "",
      deviceId: selecteDeviceId,
      sensorId:"",
      orgId:"",
      licenseId:""
    }
    this.service.GetAllSensors(request).subscribe(res =>{
      this.sensorList = res;
      this.dataSource = new MatTableDataSource<any>(this.sensorList);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  LoadDevices(){
    let orgId = sessionStorage.getItem('orgId');
    const request = {
      id:"",
      sensorId:"",
      orgId:orgId,
      licenseId:""
    }
    this.service.getAllDevicesByOrgId(request).subscribe(res => {
      this.deviceList = res;
    })
  }
  loadSensorView(sensorId:any)
  {
    const popup = this.dialog.open(ChartComponent,{
      enterAnimationDuration:'500ms',
      exitAnimationDuration:'500ms',
      width:'80%',
      data:{
        
        sensorId:sensorId,
        deviceId:this.deviceSelected
      }
    });
    if(popup.getState() === MatDialogState.CLOSED)
    {
      popup.close();
    }
  }
}
