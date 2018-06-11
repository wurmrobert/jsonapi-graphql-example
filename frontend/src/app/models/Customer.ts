import { Installation } from './Installation';
import { Device } from './Device';
import { ModelRelationMany } from './base/ModelRelationMany';
import { BaseAttribute } from './base/BaseAttribute';
import { BaseModel } from './base/BaseModel';

export class Customer extends BaseModel {
    public static MODEL_TYPE = "customer";    
    public static MODEL_TYPES = "customers";

    private firstName = new BaseAttribute<string>("first_name");
    private lastName = new BaseAttribute<string>("last_name");
    private email = new BaseAttribute<string>("email");
    private street = new BaseAttribute<string>("street");
    private streetNr = new BaseAttribute<string>("street_nr");
    private city = new BaseAttribute<string>("city");
    private postalCode = new BaseAttribute<string>("postal_code");
    private country = new BaseAttribute<string>("country");

    private devices = new ModelRelationMany<Device>(this, Device.MODEL_TYPES, Device.MODEL_TYPES);
    private installations = new ModelRelationMany<Installation>(this, Installation.MODEL_TYPES, Installation.MODEL_TYPES);
    


    public constructor(id?: string) {
        super(Customer.MODEL_TYPES, id);
    }


    public get FirstName(): string {
        return this.firstName.value;
    }
    public set FirstName(value: string) {
        this.setAttribute(this.firstName.key, value);
        this.firstName.value = value;
    }

    public get LastName(): string {
        return this.lastName.value;
    }
    public set LastName(value: string) {
        this.setAttribute(this.lastName.key, value);
        this.lastName.value = value;
    }


    public get Email(): string {
        return this.email.value;
    }
    public set Email(value: string) {
        this.setAttribute(this.email.key, value);
        this.email.value = value;
    }

    public get Street(): string {
        return this.street.value;
    }
    public set Street(value: string) {
        this.setAttribute(this.street.key, value);
        this.street.value = value;
    }

    public get StreetNr(): string {
        return this.streetNr.value;
    }
    public set StreetNr(value: string) {
        this.setAttribute(this.streetNr.key, value);
        this.streetNr.value = value;
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


    public get Devices(): ModelRelationMany<Device> {
        return this.devices;
    }

    public set Devices(value: ModelRelationMany<Device>) {
        this.devices = value;
    }


    public get Installations(): ModelRelationMany<Installation> {
        return this.installations;
    }

    public set Installations(value: ModelRelationMany<Installation>) {
        this.installations = value;
    }


    public initWithJson(dataEntry: any) {
        super.initWithJson(dataEntry);

        this.FirstName = this.attribute(this.firstName.key);
        this.LastName = this.attribute(this.lastName.key);
        this.Email = this.attribute(this.email.key);
        this.Street = this.attribute(this.street.key);
        this.StreetNr = this.attribute(this.streetNr.key);
        this.City = this.attribute(this.city.key);
        this.PostalCode = this.attribute(this.postalCode.key);
        this.Country = this.attribute(this.country.key);

        this.Devices = this.relationshipMany(this.devices.Key, this.devices.Type);
        this.Installations = this.relationshipMany(this.installations.Key, this.installations.Type);

        this.resetDirtyAttributes();
    }

}
