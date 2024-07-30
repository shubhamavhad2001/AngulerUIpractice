import { LOCALE_ID, Component, Inject, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subject, interval, takeUntil } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {DateAdapter, MatNativeDateModule} from '@angular/material/core';
import {
  MatDateRangeSelectionStrategy,
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';

declare var google:any;


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})

export class ChartComponent {
  isLoading: boolean = false;

  chart:any;
  currentSensors: any;
  sensorDataWithTime:any;
  hourData:any;
  myData:any[][]=[["Date/Time","Threshold Values"]];
  values:any[][]=[["Date/Time","Threshold Values"]];
  averageValue:any=[];
  time:any=[]
  average=0;
  allaverage=0;
  startTimeStamp:any;
  sensorvalue=0;
  myinterval: any;
  timestamp:any;
  endTimeStamp:any;
  private unsubscribe = new Subject<void>();
  myObservable = interval(10000)
  Data:any;
  startDate:any;
  endDate:any;
  ToatalDays:any;
  constructor(private service:AuthService,@Inject(LOCALE_ID) public locale: string,@Inject(MAT_DIALOG_DATA) public data:any) { }
  ngOnInit() {
     google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);
    this.getCurrentSensors();  
    // this.isLoading= true;
  }
  ngOnDestroy()
  {
      this.unsubscribe.next();
      this.unsubscribe.complete();
      
  }

   drawChart(Data: any) {  
    var options = {
      legent:'none',
      title: 'Company Performance',
      hAxis: {title:'Date', minValue: 0 , maxValue:100},
      vAxis: {title: 'CurrentValue', minValue: 0, maxValue: 100},
      curveType: 'function',
      pointSize: 10,
      
    };
    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
  
    chart.draw(Data, options);
  }
  updateSensor(){
    this.getCurrentSensors()
  }
  // printDateRange(){
  //   const startDateTime = this.startDate.getTime();
  //   //ending point of api 
  //   this.endTimeStamp=Math.floor(this.startDate.getTime());
  //   const endDateTime = this.endDate.getTime();
  //   //starting point of api 
  //   this.startTimeStamp=Math.floor(this.endDate.getTime());
  //   console.log(this.startTimeStamp);
  //   console.log(this.endTimeStamp);
  //   const oneDayInMilliseconds = 24 * 60 * 60 * 1000; 
  //   this.ToatalDays = Math.round(Math.abs((endDateTime - startDateTime) / oneDayInMilliseconds)); 
  //   console.log(this.ToatalDays);
  //   this.getCurrentSensorwithTime();
  // }
  timeStamp(timevalue:any){
  //  console.log(timevalue);
   this.timestamp=timevalue;
   const selectedTimestamp=this.timestamp*60*1000
  //  console.log(selectedTimestamp);
   const currentTimesstamp=Date.now();
  //  console.log(currentTimesstamp);
   this.startTimeStamp=currentTimesstamp
   this.endTimeStamp=currentTimesstamp-selectedTimestamp;
  //  console.log(this.endTimeStamp);
   this.getCurrentSensorwithTime();
  }

  getCurrentSensorwithTime(){
    const request={
      id: "",
      deviceId: this.data.deviceId,
      orgId: "",
      startTime:this.startTimeStamp,
      endTime:this.endTimeStamp
    };
    this.isLoading = true; 
    this.service.GetAllCurrentSensorsByTime(request).pipe(takeUntil(this.unsubscribe)).subscribe(res=>{
        this.sensorDataWithTime=res;
        // console.log(this.sensorDataWithTime);
        
        if(this.timestamp===5)
        {
          for (let i = 0; i < this.sensorDataWithTime.length; i++) {
            for (let k = 0; k < this.sensorDataWithTime[i].sensors.length; k++) {
              const date = new Date(this.sensorDataWithTime[i].creationTime).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });
              var xaxis = Number(this.sensorDataWithTime[i].sensors[k++].currentValue);
              this.myData.push([date, xaxis]);
            }
          }
          // console.log(this.myData);
          
          this.values=[["Date/Time","Threshold Values"]];
          for(let i=1;i<this.myData.length;i++)
          {
            this.values.push(this.myData[i]);
          }
          this.Data = google.visualization.arrayToDataTable(this.values);
          this.drawChart(this.Data);
          this.isLoading = false; 
              // this.reloadValues()
          this.values=[]
          this.myData=[]
        }
        else if(this.timestamp===60){
          for (let i = 0; i < this.sensorDataWithTime.length; i++) {
            for (let k = 0; k < this.sensorDataWithTime[i].sensors.length; k++) {
              const date = new Date(this.sensorDataWithTime[i].creationTime).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });
              var xaxis = Number(this.sensorDataWithTime[i].sensors[k++].currentValue);
              this.myData.push([date, xaxis]);
            }
          }
          // console.log(this.myData);
          
          this.values=[["Date/Time","Threshold Values"]];
          for(let i=1;i<this.myData.length;i++)
          {
            this.values.push(this.myData[i]);
          }
          this.Data = google.visualization.arrayToDataTable(this.values);
          this.drawChart(this.Data);
          this.isLoading = false; 
              // this.reloadValues()
          this.values=[]
          this.myData=[]
        }
        else if(this.timestamp===720){
          const count=Math.round(this.sensorDataWithTime.length/24);
          // console.log(count);
          for(let i=0;i<24;i++)
          {
            this.hourData=this.sensorDataWithTime.slice(i*count,(i+1)*count);
            // console.log(this.hourData);
            
            for(let k=0;k<this.hourData.length;k++){
                   for(let j=0;j < this.hourData[i].sensors.length;j++){
                     this.sensorvalue=Number(this.hourData[i].sensors[j++].currentValue);
                     this.average=this.sensorvalue+this.average;
                    }
                  }
            // console.log(this.average);
            
            this.allaverage=this.average/this.hourData.length;
            // console.log(this.allaverage);      
            this.averageValue.push(this.allaverage);
            this.average=0
            const now= new Date();
            const times=new Date(now.getTime()-i*1800000);
            this.time.push(times);    
          }
          this.time.reverse();
          // console.log(this.averageValue);
          for(let i=0;i<24;i++){
              const date= new Date(this.time[i]).toLocaleString(undefined,{timeZone:'Asia/Kolkata'});
              var xaxis=Number(this.averageValue[i]);
              this.myData.push([date,xaxis]);     
            }

          this.values=[["Date/Time","Threshold Values"]];
          for(let i=1;i<this.myData.length;i++)
          {
            this.values.push(this.myData[i]);
          }
          this.Data = google.visualization.arrayToDataTable(this.values);
          this.drawChart(this.Data);
          this.isLoading = false; 
              // this.reloadValues()
          this.values=[]
          this.myData=[]
          this.time=[]
        }
        else if(this.timestamp===1440){
          const count=Math.round(this.sensorDataWithTime.length/24);
          // console.log(count);
          for(let i=0;i<24;i++)
          {
            this.hourData=this.sensorDataWithTime.slice(i*count,(i+1)*count);
            for(let k=0;k<this.hourData.length;k++){
              for(let j=0;j < this.hourData[i].sensors.length;j++){
                this.sensorvalue=Number(this.hourData[i].sensors[j++].currentValue);
                this.average=this.sensorvalue+this.average;
               }
             }
            // console.log(this.average);
            
            this.allaverage=this.average/this.hourData.length;
            // console.log(this.allaverage);      
            this.averageValue.push(this.allaverage);
            this.average=0
            const now= new Date();
            const times=new Date(now.getTime()-i*3600000);
            this.time.push(times);  
          }
          this.time.reverse();
          // console.log(this.averageValue);
          for(let i=0;i<24;i++){
            const date= new Date(this.time[i]).toLocaleString(undefined,{timeZone:'Asia/Kolkata'});
            var xaxis=Number(this.averageValue[i]);
            this.myData.push([date,xaxis]);     
          }

          
        this.values=[["Date/Time","Threshold Values"]];
        for(let i=0;i<this.myData.length;i++)
        {
          this.values.push(this.myData[i]);
        }
        this.Data = google.visualization.arrayToDataTable(this.values);
        this.drawChart(this.Data);
        this.isLoading = false; 
            // this.reloadValues()
        this.values=[]
        this.myData=[]
        this.time=[]
        }
        else{
          // console.log(this.sensorDataWithTime);
          
          
          // for(let i=0;i<this.ToatalDays;i++)
          // {
          //   if(this.ToatalDays===1 || this.ToatalDays===2 || this.ToatalDays===3 || this.ToatalDays===4 || this.ToatalDays===5)
          //   {
          //     const count=Math.round(this.sensorDataWithTime.length/8);
             
          //       this.hourData=this.sensorDataWithTime.slice(i*count,(i+1)*count);
          //       for(let k=0;k<this.hourData.length;k++){
          //         for(let j=0;j < this.hourData[i].sensors.length;j++){
          //           this.sensorvalue=Number(this.hourData[i].sensors[j++].currentValue);
          //           this.average=this.sensorvalue+this.average;
          //          }
          //        }
          //        this.allaverage=this.average/this.hourData.length;
          //        // console.log(this.allaverage);      
          //        this.averageValue.push(this.allaverage);
              
          //     console.log(this.averageValue);
              
          //     }
          // }
        }
    })
   
  }

  getCurrentSensors() {
    const request = {
      id: "",
      deviceId: this.data.deviceId,
      orgId: "",
      limit:"30"
    };
    this.isLoading = true; 
    this.service.GetAllCurrentSensorsByLimit(request).pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      
      this.currentSensors = res;
      this.average=0
      this.allaverage=0; 
      for (let i = 0; i < this.currentSensors.length; i++) {
        for (let k = 0; k < this.currentSensors[i].sensors.length; k++) {
          const date = new Date(this.currentSensors[i].creationTime).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });
          var xaxis = Number(this.currentSensors[i].sensors[k++].currentValue);
          this.myData.push([date, xaxis]);
        }
      }
  
      var numPoints = 30; // Number of data points to display
  
      if (this.myData.length > numPoints) {
        this.myData = this.myData.slice(this.myData.length - numPoints); // Keep only the last 10 data points
        // console.log(this.myData.slice(this.myData.length - numPoints));
       }
      this.values=[["Date/Time","Threshold Values"]];
      for(let i=1;i<this.myData.length;i++)
      {
        this.values.push(this.myData[i]);
      }
      // console.log(this.values);
      this.Data = google.visualization.arrayToDataTable(this.values);
      // this.isLoading = false;
      this.drawChart(this.Data);
      this.isLoading = false; 
      // this.reloadValues()
      this.myData=[];
      this.values=[];
    });
    
  }
  
  reloadValues(): any {
    this.myinterval = this.myObservable.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
      this.values=[];
      this.myData=[];
      this.Data=null;
      this.chart=null;
      this.getCurrentSensorwithTime();
    }); 
  }
}
