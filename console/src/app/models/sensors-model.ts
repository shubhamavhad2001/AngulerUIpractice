export class SensorsModel {
    sensorId:any;
    sensorName:any;
    sensorType!: {
        sensorTypeId: any;
        sensorType: any;
    };
    currentValue:any;
    threshold:any;
    vendorId:any;
    sensorHealthStatus:any;
}
