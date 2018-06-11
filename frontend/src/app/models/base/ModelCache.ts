import { BaseModel } from './BaseModel';
import { Observable } from 'rxjs/Observable';


export class ModelCache<T extends BaseModel > {
    private readonly cache = new Map<string, T>(); // id, model

    public get(id: string): T {
        let model = this.cache.get(id);        
        if(!model) return null;
        if(model.Outgrew) {
            this.cache.delete(id); // model is to old -> outdated
            return null;
        }
        return model;
    }

    public set(model: T) {
        if(!model) return;

        let existing = this.cache.get(model.Id);
        if(existing) {
            this.cache.delete(model.Id);
        }
        this.cache.set(model.Id, model);
    }

    public remove(id: string) {
        this.cache.delete(id);
    }

    public clear() {
        this.cache.clear();
    }

}
