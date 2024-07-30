import { Bounds } from './bounds';
import { Location } from './location';
import { Viewport } from './viewport';
export class Geometry {
    bounds:Bounds = new Bounds;
    location:Location = new Location;
    viewport:Viewport = new Viewport;
    location_type="APPROXIMATE";
}
