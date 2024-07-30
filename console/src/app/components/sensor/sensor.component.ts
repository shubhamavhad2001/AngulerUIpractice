import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { AddDevicesComponent } from '../add-devices/add-devices.component';
import { interval } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { SensorDataComponent } from '../sensor-data/sensor-data.component';
import { UpdateDevicesComponent } from './update-devices/update-devices.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.scss']
})
export class SensorComponent {
  displayedColumns: string[] = ['sensorId', 'sensorName', 'status', 'Action'];
  sensorList: any;
  deviceList: any;
  currentSensors: any;
  currents: any[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  deviceSelected: any;
  sensorSelected: any;
  element: any;
  dataModify: any;
  date: any;
  myinterval: any;
  myObservable = interval(60000);
  usrRole: any;
  //Declaration Done Here

  constructor(private builder: FormBuilder, private service: AuthService, private dialog: MatDialog, private toastr: ToastrService) {
  }
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  ngOnInit(): void {
    this.usrRole = sessionStorage.getItem('userrole');
    this.LoadDevices();
  }
  LoadSensors(selecteDeviceId: any) {
    sessionStorage.setItem("dId", selecteDeviceId);
    const request = {
      id: "",
      deviceId: selecteDeviceId,
      sensorId: "",
      orgId: "",
      licenseId: ""
    }
    this.service.GetAllSensors(request).subscribe(res => {

      this.sensorList = res;
      this.dataSource = new MatTableDataSource<any>(this.sensorList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  LoadDevices() {
    if (sessionStorage.getItem('userrole') === '1') {
      this.service.getEveryDevices().subscribe(res => {
        this.deviceList = res.content;
      })
    }
    else {
      let orgId = sessionStorage.getItem('orgId');
      const request = {
        id: "",
        sensorId: "",
        orgId: orgId,
        licenseId: ""
      }
      this.service.getAllDevicesByOrgId(request).subscribe(res => {
        this.deviceList = res;
      });
    }

  }

  loadSensorView(sensorId: any) {
    this.sensorSelected = sensorId;
    const popup = this.dialog.open(SensorDataComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      width: '25%',
      data: {
        sensorId: sensorId,
        deviceId: this.deviceSelected
      }
    });
  }
  loadSensorUpdate(sensorId: any) {
    this.sensorSelected = sensorId;
    const popup = this.dialog.open(UpdateDevicesComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      width: '%',
      data: {
        sensorId: sensorId,
        deviceId: this.deviceSelected
      }
    });
    popup.afterClosed().subscribe(res => {
      this.LoadDevices();
    });
  }

  getReport(): any {
    const dId = this.deviceSelected;
    const sId = this.sensorSelected;
    const orgId = sessionStorage.getItem('orgId');
    const startTime: number = Date.now() - (86400000 * 7);
    const endTime: number = Date.now() + (10000);
    const reportForm = this.builder.group({
      dId: this.builder.control(dId, Validators.compose([Validators.required, Validators.minLength(1)])),
      orgId: this.builder.control(orgId, Validators.compose([Validators.required, Validators.minLength(1)])),
      sId: this.builder.control(sId, Validators.compose([Validators.required, Validators.minLength(1)])),
      startDate: this.builder.control(startTime, Validators.compose([Validators.required, Validators.minLength(1)])),
      endDate: this.builder.control(endTime, Validators.compose([Validators.required, Validators.minLength(1)]))
    });
    this.service.GetReport(reportForm.value).subscribe((res) => {
      let blob: Blob = res.body as Blob;
      let url = window.URL.createObjectURL(blob);
      window.open(url);
    })
  }

  AddDevices() {
    const popup = this.dialog.open(AddDevicesComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '25%',
      
    });
    popup.afterClosed().subscribe(res => {
      this.LoadDevices();
    });
  }

  DeleteDevices() {
    if (sessionStorage.getItem("userId") !== '4' || sessionStorage.getItem("userId") !== '3') {
      if (confirm("Do you want to delete the Device?")) {
        this.service.deleteDevice(this.deviceSelected).subscribe((res) => {
          if (res) {
            this.toastr.success("Device removed from your profile sucessfully", "Deleted Successfully");
          } else {
            this.toastr.error("Unknown Error occurred please try again after sometime", "Unknown Error");
          }
          this.LoadDevices();
          this.dataSource = new MatTableDataSource<any>();
        }, (error) => {
          if (error.status === 404) {
            this.toastr.warning("Device is already deleted", "License Not Found");
          } else {
            this.toastr.error("Unknown Error occurred please try again after sometime", "Unknown Error");
          }
          this.LoadDevices();
          this.dataSource = new MatTableDataSource<any>();
        });
      }
    } else {
      this.toastr.error("You don't have permissions to delete device", "Cannot Delete Device");
      this.LoadDevices();
      this.dataSource = new MatTableDataSource<any>();
    }
  }
  


}
