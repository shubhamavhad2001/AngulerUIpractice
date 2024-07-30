import { HttpClient } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor(private http:HttpClient) { }
  // @ViewChild(MatPaginator) paginator !: MatPaginator;
  // @ViewChild(MatSort) sort !: MatSort;
  request = {
    pageNo: 0,
    pageSize: 10000,
    sortBy: "id",
    sortDir: "asc"
  }
  apiUrl='https://users.nbot.web.ksemin.in/';
  apiSensorUrl='https://sensor.nbot.web.ksemin.in/';
  apiDeviceUrl='https://devices.nbot.web.ksemin.in/';
  apiEmailUrl='https://emails.nbot.web.ksemin.in/mail';
  apiLicenseUrl='https://licenses.nbot.web.ksemin.in/';
  apiReporUrl='https://reports.nbot.web.ksemin.in/';  
  apiOrgUrl='https://organisation.nbot.web.ksemin.in/';

  getEveryDevices()
  {
    return this.http.post<any>(this.apiDeviceUrl+'dvcs',this.request);
  }
  getDeviceById(request:any)
  {
    return this.http.post<any>(this.apiDeviceUrl+'/ids/',request);
  }
  getAllDevicesByOrgId(orgId: any) {
    return this.http.post(this.apiDeviceUrl+'dvs/',orgId);
  }
  GetAllUsersByOrgId(orgId:any)
  {

    return this.http.post(this.apiUrl+'orgs',orgId);
  }
  GetAllUsers()
  {
    
    return this.http.post<any>(this.apiUrl,this.request);
  }
  GetById(code:any)
  {
    return this.http.post(this.apiUrl+'login/',code);
  }

  ProceedRegister(inputData:any)
  {
    return this.http.post(this.apiUrl+'users/',inputData);
  }

  Updateuser(code: any,inputData: any)
  {
    return this.http.put(this.apiUrl+'users/?id='+code,inputData)
  }
  IsloggedIn()
  {
    return sessionStorage.getItem('username')!==null;
  }
  getUserRole()
  {
    return sessionStorage.getItem('userrole')!= null?sessionStorage.getItem('userrole')?.toString():'';
  }
  getAllRole()
  {
    return this.http.get(this.apiUrl+'users');
  }
//done for now

  GetAllSensors(code:any)
  {
    return this.http.post<any>(this.apiDeviceUrl+'sensors/',code);
  }
  GetAllCurrentSensors(code:any)
  {
    return this.http.post<any>(this.apiSensorUrl+'dvs/',code);
  }
  GetAllCurrentSensorsByLimit(code:any)
  {
    return this.http.post<any>(this.apiSensorUrl+'dvs/limit',code);
  }
  GetAllCurrentSensorsByTime(code:any)
  {
    return this.http.post<any>(this.apiSensorUrl+'dvs/time',code);
  }
  GetAllOrgs()
  {
    
    return this.http.post<any>(this.apiOrgUrl,this.request);
  }
  GetOrg(code:any)
  {
    return this.http.post<any>(this.apiOrgUrl+'ids/',code);
  }
  GetAllLicenses()
  {

    return this.http.post<any>(this.apiLicenseUrl,this.request);
  }
  GetAllLicensesByOrgId(code:any)
  {
    return this.http.post<any>(this.apiLicenseUrl+'orgs',code);
  }
  sendEmail(inputData:any){
    return this.http.post(this.apiEmailUrl,inputData);
  }
  GetReport(inputData:any){
    return this.http.post(this.apiReporUrl,inputData,{observe:'response',responseType:'blob'});
  }
  AddOrgs(inputData:any)
  {
    return this.http.post(this.apiOrgUrl+'orgs/',inputData);
  }
  AddLicenses(inputData:any)
  {
    return this.http.post(this.apiLicenseUrl+'licenses',inputData);
  }
  selectItem:any;
  Sensortype(){
    return this.http.post(this.apiSensorUrl+'sensortype',this.request);
  }
  AddDevice(inputData:any){
    return this.http.post(this.apiDeviceUrl+'dvs',inputData);
  }
  GetLicensesByUserId(id:any)
  {
    return this.http.get(this.apiLicenseUrl+'users?userId='+id);
  }
  deleteLicenses(id:any)
  {
    return this.http.delete(this.apiLicenseUrl+'licenses?licenseId='+id);
  }
  updateLicense(id:any,inputData:any)
  {
    return this.http.put(this.apiLicenseUrl+'licenses?licenseId='+id,inputData);
  }
  GetLicenseById(id:any)
  {
    return this.http.post(this.apiLicenseUrl+'ids',id);
  }
  deleteOrgs(id:any)
  {
    return this.http.delete(this.apiOrgUrl+'orgs/?orgId='+id);
  }
  getOrgById(id:any)
  {
    return this.http.post(this.apiOrgUrl+'ids/',id);
  }
  updateOrg(id:any,inputData:any)
  {
    return this.http.put(this.apiOrgUrl+'orgs/?orgId='+id,inputData);
  }
  addUser(inputData:any)
  {
    return this.http.post(this.apiUrl+'users',inputData);
  }
  updateDevice(request:any)
  {
    return this.http.put(this.apiDeviceUrl+'/dvs/?id='+request.id+"&userId="+request.userId,request);
  }
  deleteDevice(request:any)
  {
    return this.http.delete(this.apiDeviceUrl+'/dvs/?id='+request+'&userId='+sessionStorage.getItem('userId'));
  }
}
