import { Installation } from './Installation';
import { Customer } from './Customer';
import { ModelRelation } from './base/ModelRelation';
import { ModelCache } from './base/ModelCache';
import { BaseAttribute } from './base/BaseAttribute';
import { BaseModel } from './base/BaseModel';


export class Device extends BaseModel {

    public static MODEL_TYPE = "device";    
    public static MODEL_TYPES = "devices";

    
    private macAddress = new BaseAttribute<string>("mac_address");
    private serialNumber = new BaseAttribute<string>("serial_number");
    private isOnline = new BaseAttribute<boolean>("is_online");
    

    private customer = new ModelRelation<Customer>(this, Customer.MODEL_TYPE, Customer.MODEL_TYPES);
    private installation = new ModelRelation<Installation>(this, Installation.MODEL_TYPE, Installation.MODEL_TYPES);


    
    public isAPreparingDevice = false;

    public constructor(id?: string) {
        super(Device.MODEL_TYPES, id);
        this.setRelationship(this.installation);
        this.setRelationship(this.customer);
    }

    public get IsOnline(): boolean {
        return this.isOnline.value;
    }

    public set IsOnline(value: boolean) {
        this.isOnline.value = value;
    }

    public get MacAddress(): string {
        if(this.macAddress.value == null) return null; // also at undefined
        return this.macAddress.value;
    }
    public set MacAddress(value: string) {
        this.setAttribute(this.macAddress.key, value);
        this.macAddress.value = value;
    }

    public get SerialNumber(): string {
        return this.serialNumber.value;
    }
    public set SerialNumber(value: string) {
        if(value && value.toUpperCase) {
            value = value.toUpperCase(); // set serial number alwasy so upper case -> cosys request
        }
        
        this.setAttribute(this.serialNumber.key, value);
        this.serialNumber.value = value;
    }



    public get Customer(): ModelRelation<Customer> {
        return this.customer;
    }

    public set Customer(value: ModelRelation<Customer>) {
        this.setRelationship(value);
        this.customer = value;
    }

 
    public get Installation(): ModelRelation<Installation> {
        return this.installation;
    }

    public set Installation(value: ModelRelation<Installation>) {
        this.setRelationship(value);
        this.installation = value;
    }

    public initWithJson(dataEntry: any) {
        super.initWithJson(dataEntry);

        this.IsOnline = this.attribute(this.isOnline.key);
        this.SerialNumber = this.attribute(this.serialNumber.key);
        this.MacAddress = this.attribute(this.macAddress.key);

        this.customer = this.relationship(this.customer.Key, this.customer.Type);
        this.installation = this.relationship(this.installation.Key, this.installation.Type);


        this.resetDirtyAttributes();
    }
}
