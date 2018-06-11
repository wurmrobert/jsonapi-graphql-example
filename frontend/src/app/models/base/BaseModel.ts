import { ObjectHelper } from './../../utils/helper/ObjectHelper';
import { ModelRelationMany } from './ModelRelationMany';
import { ModelRelation } from './ModelRelation';
import * as _ from "lodash";
import * as moment from "moment";

export function JsonProperty(key: string) {
	return function(target: any, propertyName: string) {
		
	}
}

export abstract class BaseModel {

	public IsNew: boolean;
	public MarkAsDeletable: boolean;
	
	protected id:string;
	private type: string;

	private originalAttributes: any = null;
	private jsonData:any = null;
	private age: Date;
	
	public constructor(type: string, id?:string) {
		this.initJsonData();
		this.id = id;
		this.type = type;
		this.jsonData.type = type;
		this.resetDirtyAttributes();
	}


	public get Id():string {
		return this.id;
	}

	public set Id(value: string) {
		this.id = value;
	}

	public get Age(): Date {
		return this.age;
	}

	public get Outgrew(): boolean {
		let now = moment();
		let diff: number = moment(now).diff(this.age, 'seconds');
		return diff > 30;
	}


	public get DirtyAttributes(): boolean {
		if(!this.jsonData) return false;
		return !_.isEqual(this.jsonData.attributes, this.originalAttributes);
	}

	public resetDirtyAttributes() {
		this.originalAttributes = _.cloneDeep(this.jsonData.attributes);
	}


	public asJson() {
		let jsonCopy = _.cloneDeep(this.jsonData);
		let tmp =  { 'data': jsonCopy };
		ObjectHelper.removeKeysFromObjectRecursive('baseModel', tmp.data.relationships);
		return tmp;
	}


	/**
	 * sets all datas from given json entry
	 */
	public initWithJson(dataEntry:any) {
		this.jsonData = dataEntry;
		this.id = this.entry('id');
		this.age = new Date();
	}


	public get Type(): string {
		return this.type;
	}

	/**
	* get enty value from json data entry
	**/
	protected entry(key:string) {
		if(!this.jsonData) {
			return null;
		}
		return this.jsonData[key];
	}


	/**
	* get attribute value from json data entry
	**/
	protected attribute(attrKey:string) {
		if(this.hasAttribute()) {
			return this.jsonData.attributes[attrKey];
		}
	}

	protected setAttribute(key:string, value:Object) {
		if(!this.hasAttribute()) {
			this.initJsonData();
		}
		this.jsonData.attributes[key] = value;
	}

	public setRelationship(relation: ModelRelation<any>) {
		if(!relation) {
            throw Error('Relation must be set!');
		}
		
		if(!this.hasAttribute()) {
			this.initJsonData();
		}
		if(this.jsonData.relationships[relation.Key] && this.jsonData.relationships[relation.Key].data && this.jsonData.relationships[relation.Key].data instanceof Array) {
			
			let relationObj = this.jsonData.relationships[relation.Key].data.find(o => o && (o.id == relation.Id));
			if(!relationObj && this.getRelationObject(relation)) {
				// push relation if not exists
				this.jsonData.relationships[relation.Key].data.push(this.getRelationObject(relation));
			}
		} else {
			this.jsonData.relationships[relation.Key] = {};
			this.jsonData.relationships[relation.Key].data = this.getRelationObject(relation);
		}
	}

	private getRelationObject(relation: ModelRelation<any>) {
		if(relation && relation.Id) {
			return {id: relation.Id, type: relation.Type};
		}
		return null;
	}

	public removeRelationship(relationKey) {
		if(!this.hasAttribute()) {
			this.initJsonData();
		}
		this.jsonData.relationships[relationKey] = {};
		this.jsonData.relationships[relationKey].data = null;
	}
	
	
	public addToRelationshipMany = (key: string, relation: ModelRelation<any>) => {
		if(relation == null) return;
		if(!this.jsonData.relationships[key]  || !this.jsonData.relationships[key].data || !(this.jsonData.relationships[key].data instanceof Array)) {
			this.jsonData.relationships[key] = {};
			this.jsonData.relationships[key].data = [];
		}
		
		// determine whether already exists
		let found =  this.jsonData.relationships[key].data.find(r => r && (r.id === relation.Id));
		if(found == null) {
			this.jsonData.relationships[key].data.push(this.getRelationObject(relation));
		} else {
			let index = this.jsonData.relationships[key].data.indexOf(this.jsonData.relationships[key].data.find(r => r && (r.id == relation.Id)));
			this.jsonData.relationships[key].data[index] = this.getRelationObject(relation);
		}
	}

	public removeFromRelationshipMany = (key: string, id: string) => {
		if(!this.jsonData.relationships[key]) {
			throw Error(`Unable to remove relationship with key: ${key}. Key doesn´t exists!`);
		}
		if(this.jsonData.relationships[key].data instanceof Array) {
			this.jsonData.relationships[key].data = this.jsonData.relationships[key].data.filter(r => !r || (r.id != id));
		} else {
			if(this.jsonData.relationships[key].data && this.jsonData.relationships[key].data.id == id) {
				delete this.jsonData.relationships[key];
			}
		}
		
	}

	

	/**
	* get relationship value from json data entry
	**/
	protected relationship(relationShipKey:string, relationShipType: string): ModelRelation<any> {
		if(this.hasRelationShip(relationShipKey)) {
			return new ModelRelation(this, relationShipKey, relationShipType, this.jsonData.relationships[relationShipKey].data.id);
		}
	}

	protected relationshipMany(relationKey: string, relationType: string): ModelRelationMany<any> {
		if(this.hasRelationShip(relationKey)) {
			let data = this.jsonData.relationships[relationKey].data;

			if(data instanceof Array) {
				let r = new ModelRelationMany(this, relationKey, relationType);
				for(let element of data) {
					if(element) {
						r.AddRelation(element.id);
					}
				}
				return r;
			};
			let r = new ModelRelationMany(this, relationKey, relationType);
			r.AddRelation(data.id);
			return r;
		} else {
			return new ModelRelationMany(this, relationKey, relationType);
		}
	}

	private hasAttribute() {
		if(!this.jsonData) return false;
		if(this.jsonData.attributes) return true;
		
		return false;
	}

	private hasRelationShip(relationShipKey:string) {
		if(!this.jsonData) return false;
		if(!this.jsonData.relationships) return false;
		if(!this.jsonData.relationships[relationShipKey]) return false;
		if(!this.jsonData.relationships[relationShipKey].data) {
			this.jsonData.relationships[relationShipKey].data = {};
		}
		
		return true;
	}

	private initJsonData() {
		this.jsonData = {
			"type": "",
			"attributes": { },
			"relationships": { }
		};
	}
}
