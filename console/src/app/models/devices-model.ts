import { Geometry } from './geometry';
import { SensorsModel } from './sensors-model';
export class DevicesModel {
    id:any;
    sensors: SensorsModel[] = [];
    geometry:Geometry = new Geometry();
    userId:any;
    orgId:any;
    licenseId:any;
    Health:any;
    lastBootTime:any;
    activationTime:any;
    lastSyncTime:any;
    expirationTime:any;
}
