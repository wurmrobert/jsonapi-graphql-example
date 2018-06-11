import { Device } from './Device';
import { Customer } from './Customer';
import { ModelRelationMany } from './base/ModelRelationMany';
import { ModelRelation } from './base/ModelRelation';
import { BaseAttribute } from './base/BaseAttribute';
import { BaseModel } from './base/BaseModel';

export class Installation extends BaseModel {

    public static MODEL_TYPE = "installation";    
    public static MODEL_TYPES = "installations";


    private street = new BaseAttribute<string>("street");
    private city = new BaseAttribute<string>("city");
    private postalCode = new BaseAttribute<string>("postal_code");
    private country = new BaseAttribute<string>("country");
    private streetNr = new BaseAttribute<string>("street_nr");
    private topNr = new BaseAttribute<number>("top_nr");
    private floor = new BaseAttribute<string>("floor");
    private longitude = new BaseAttribute<number>("longitude");
    private latitude = new BaseAttribute<number>("latitude");
    
    
    private customer = new ModelRelation<Customer>(this, Customer.MODEL_TYPE, Customer.MODEL_TYPES);    
    private devices = new ModelRelationMany<Device>(this, Device.MODEL_TYPE, Device.MODEL_TYPES);


    public constructor(id?: string) {
        super(Installation.MODEL_TYPES, id);
        this.setRelationship(this.customer);
    }


    public get Street(): string {
        return this.street.value;
    }
    public set Street(value: string) {
        this.setAttribute(this.street.key, value);
        this.street.value = value;
    }

    public get City(): string {
        return this.city.value;
    }
    public set City(value: string) {
        this.setAttribute(this.city.key, value);
        this.city.value = value;
    }



    public get PostalCode(): string {
        return this.postalCode.value;
    }
    public set PostalCode(value: string) {
        this.setAttribute(this.postalCode.key, value);
        this.postalCode.value = value;
    }


    public get Country(): string {
        return this.country.value;
    }
    public set Country(value: string) {
        this.setAttribute(this.country.key, value);
        this.country.value = value;
    }

    public get Customer(): ModelRelation<Customer> {
        return this.customer;
    }

    public set Customer(value: ModelRelation<Customer>) {
        this.setRelationship(value);
        this.customer = value;
    }

    public get Devices(): ModelRelationMany<Device> {
        return this.devices;
    }

    public set Devices(value: ModelRelationMany<Device>) {
        this.devices = value;
    }


    public get StreetNr(): string {
        return this.streetNr.value;
    }
    public set StreetNr(value: string) {
        this.setAttribute(this.streetNr.key, value);
        this.streetNr.value = value;
    }

    public get TopNr(): number {
        return this.topNr.value;
    }
    public set TopNr(value: number) {
        this.setAttribute(this.topNr.key, value);
        this.topNr.value = value;
    }
    
    public get Floor(): string {
        return this.floor.value;
    }
    public set Floor(value: string) {
        this.setAttribute(this.floor.key, value);
        this.floor.value = value;
    }


    public get Longitude(): number {
        return this.longitude.value;
    }
    public set Longitude(value: number) {
        this.setAttribute(this.longitude.key, value);
        this.longitude.value = value;
    }


    public get Latitude(): number {
        return this.latitude.value;
    }
    public set Latitude(value: number) {
        this.setAttribute(this.latitude.key, value);
        this.latitude.value = value;
    }

    public get Address(): string {
        if(this.Street === "EMPTY") {
            return `${this.PostalCode} ${this.City} ${this.Country}`;
        }

        if(this.StreetNr === "EMPTY") {
            return `${this.Street}, ${this.PostalCode} ${this.City} ${this.Country}`;
        }

        return `${this.Street} ${this.StreetNr}, ${this.PostalCode} ${this.City} ${this.Country}`;
    }

    public initWithJson(dataEntry: any) {
        super.initWithJson(dataEntry);
        this.Street = this.attribute(this.street.key);
        this.City = this.attribute(this.city.key);
        this.PostalCode = this.attribute(this.postalCode.key);
        this.Country = this.attribute(this.country.key);
        this.StreetNr = this.attribute(this.streetNr.key);
        this.TopNr = this.attribute(this.topNr.key);
        this.Floor = this.attribute(this.floor.key);    
        this.Longitude = this.attribute(this.longitude.key);    
        this.Latitude = this.attribute(this.latitude.key);    
        
        this.devices = this.relationshipMany(this.devices.Key, this.devices.Type);
        this.customer = this.relationship(this.customer.Key, this.customer.Type);        
    }
}
