import { BaseModel } from './BaseModel';

export class ModelRelation<T> {

    private baseModel: BaseModel;
    private key: string;
    private type: string;
    private id: string;
    private data: T;

    public constructor(baseModel: BaseModel, key: string, type: string, id?: string) {
        this.baseModel = baseModel;
        this.key = key;
        this.type = type;
        this.id = id;
    }

    public get Key(): string {
        return this.key;
    }

    public get Type(): string {
        return this.type;
    }

    public get Id(): string {
        return this.id;
    }

    public set Id(value: string) {
        if(value !== this.id) {
            this.id = value;
            this.baseModel.setRelationship(this);
        }
    }

    public get Data(): T {
        return this.data;
    }

    public set Data(value: T) {
        let obj: any = value;
        if(obj) {
            if(obj.Id) this.Id = obj.Id;
            this.data = value;
            this.baseModel.setRelationship(this);
        } else {
            this.data = null;
            this.baseModel.removeRelationship(this.Key);
        }
    }


    public clone(r: ModelRelation<T>) {
        if(!r) return;
        
        this.key = r.Key;
        this.type = r.type;
        this.Id = r.Id;
        
        let data: any = r.Data;
        if(data && data.copy) {
            this.data = data.copy();
        } else {
            this.data = r.Data;
        }
    }
}