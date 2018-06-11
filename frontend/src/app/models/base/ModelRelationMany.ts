import { ModelRelation } from './ModelRelation';
import { BaseModel } from './BaseModel';

export class ModelRelationMany<T> { 
    
    private baseModel: BaseModel;
    private key: string;
    private type: string;
    private relations: Array<ModelRelation<T>> = [];


    public constructor(baseModel: BaseModel, key: string, type: string) {
        this.baseModel = baseModel;
        this.key = key;
        this.type = type;
    }


    public get Relations(): Array<ModelRelation<T>>{
        return this.relations;
    }

    public set Relations(value:  Array<ModelRelation<T>>){
        this.relations = value;
    }

    public get DirtyRelations(): boolean {
        for(let r of this.relations) {
            if(r.Data && r.Data instanceof (BaseModel)) {
                if(r.Data.DirtyAttributes) {
                    return true;
                }
            }
        }
        return false;
    }

    public get Key(): string {
        return this.key;
    }

    public get Type(): string {
        return this.type;
    }


    public AddRelation(id: string, data?: T, firstPosition?: boolean): ModelRelation<T> {
        let relation = new ModelRelation<T>(this.baseModel, this.key, this.type, id);
        if(data) relation.Data = data;
        
        if(relation.Id != null) { // only on existing models ;)
            let exists = this.relations.find(r => r.Id === relation.Id);
            if(exists) return exists; // it already exists
        }
        
        
        this.baseModel.addToRelationshipMany(this.key, relation);
        
        if(firstPosition) {
            this.relations.unshift(relation);
        } else {
            this.relations.push(relation);
        }
        return relation;
    }

    public RemoveRelation(id: string) {
        this.relations = this.relations.filter(r => r.Id !== id);
        this.baseModel.removeFromRelationshipMany(this.key, id);
    }


    public clone(r: ModelRelationMany<T>) {
        this.type = r.Type;
        this.relations = [];
        if(r.Relations) {
            r.Relations.forEach(element => {
                this.AddRelation(element.Id);
            });
        }
    }


}