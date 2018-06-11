import { DevexpressFilter, RansackHelper } from './../../utils/helper/RansackHelper';
import { Observable } from 'rxjs/Observable';
import { ModelCache } from './../../models/base/ModelCache';
import { BaseService } from './base.service';
import { BaseModel } from "../../models/base/BaseModel";
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';

import * as pluralize from 'pluralize';
import * as _ from 'lodash';

export type FilterType = { condition: DevexpressFilter, filters: Array<{ key: string, value: string }> };
export type AdditionalParams = Array<{ param: string, val: string }>;


export abstract class BaseModelService<M extends BaseModel> extends BaseService {

	public readonly chache = new ModelCache<M>();

	public constructor(
		private modelClass: { new(id?: string): M },
		public readonly MODEL_NAME: string,
		public readonly URL_MODEL: string,
		protected http: Http
	) {
		super(MODEL_NAME);
	}


	/****************************************************************************************
		- Public Methods
	 ***************************************************************************************/


	public getById(id: string): Observable<M> {
		if (!id) {
			return Observable.create((observer) => {
				observer.next(null);
				observer.complete();
			});
		}
		let m = this.chache.get(id);
		if (m) {
			return Observable.create((observer) => {
				observer.next(m);
				observer.complete();
			});
		}

		return this.http.get(this.URL_MODEL + '/' + id)
			.map(this.extractGetModel)
			.catch((e: any) => Observable.throw(this.handleError(e, 'getById')))
			.do((m) => {
				this.chache.set(m);
			});
	}

	public getAll(fixFilters?: FilterType): Observable<M[]> {

		let options = new RequestOptions({ headers: this.HTTP_HEADER });
		let urlParams = new URLSearchParams();
		options.search = urlParams;


		if (fixFilters) {
			this.setFixFilterToUrlParams(fixFilters, urlParams);
		}

		console.log('getAll: ', this.URL_MODEL);

		return this.http.get(this.URL_MODEL, options)
			.map(this.extractGetModels)
			.catch((e: any) => Observable.throw(this.handleError(e, 'getAll')));
	}


	public getAllBySearchText(pattern: string): Observable<M[]> {

		let options = new RequestOptions({ headers: this.HTTP_HEADER });
		let params: URLSearchParams = new URLSearchParams();
		let separetdPattern = pattern.replace(/\s/g, ',');
		params.set("search", separetdPattern);
		options.search = params;


		return this.http.get(this.URL_MODEL, options)
			.map(this.extractGetModels)
			.catch((e: any) => Observable.throw(this.handleError(e, 'getAllBySearchText')));
	}


	public getByPage(pageNumber: number, customUrl?: string, additionalParams?: AdditionalParams): Observable<M[]> {
		let params: URLSearchParams = new URLSearchParams();
		params.set("page[number]", pageNumber.toString());
		params.set("page[size]", this.PAGE_SIZE.toString());

		if (additionalParams != null && additionalParams instanceof Array) {
			for (let p of additionalParams) {
				params.set(p.param, p.val); // params.set("sort", "last_name");
			}
		}

		let options = this.requestOptions;
		options.search = params;

		if (customUrl == null) {
			return this.http.get(this.URL_MODEL, options)
				.map(this.extractGetByPage)
				.catch((e: any) => Observable.throw(this.handleError(e, 'getByPage')));
		} else {
			return this.http.get(customUrl, options)
				.map(this.extractGetByPage)
				.catch((e: any) => Observable.throw(this.handleError(e, 'getByPage')));
		}

	}


	public add(d: M): Observable<M> {
		let body = d.asJson();
		return this.http.post(this.URL_MODEL, body, this.requestOptions)
			.map(this.extractGetModel)
			.catch((e: any) => Observable.throw(this.handleError(e, 'add')));
	}


	public update(d: M): Observable<any> {
		let body = d.asJson();
		return this.http.patch(this.URL_MODEL + '/' + d.Id, body, this.requestOptions)
			.map(this.extractGetModel)
			.catch((e: any) => Observable.throw(this.handleError(e, 'update')));
	}


	public remove(id: string): Observable<Response> {
		return this.http.delete(this.URL_MODEL + '/' + id, this.requestOptions);
	}


	public fetchRelations = (d: M): Promise<any> => {
		// template pattern
		return new Promise(async (resolve, reject) => { 
			try {
				resolve();
			} catch(ex) {
				reject(ex);
			}
		});
	}

	

	/****************************************************************************************
		- Protected Methods
	 ***************************************************************************************/


	protected getModelAttributeKey(s) {
		return _.snakeCase(s);
	}

	protected setFilterParams(bodyParams: URLSearchParams, filter: any) {
		if (!filter && filter! instanceof Array) return;
		if (filter.length > 2) {

			if (filter[0] instanceof Array) {
				// sub filter
				// condition
				// sub filter
				for (let x of filter) {
					if (x instanceof Array) {
						this.setFilterParams(bodyParams, x);
					} else {
						// TODO: use and, or
					}
				}

			} else {
				if (filter.length === 3) {
					// [attribute, condition, value]
					let key = this.getModelAttributeKey(filter[0]);
					let condition = RansackHelper.convertDevexpressFilterConditionToRansak(filter[1]);
					bodyParams.set(`filter[${key}_${condition}]`, filter[2]);
				}

				if (filter.length === 4 && filter[1] instanceof Array) {
					// used for relations [type, [attributes], condition, value]
					// e.g. device_type_manufacturer_hardware_version_eq

					let key = this.getModelAttributeKey(filter[0]);
					let attributes = '';
					for (let attr of filter[1]) {
						attributes += `_${this.getModelAttributeKey(attr)}`;
					}

					let condition = RansackHelper.convertDevexpressFilterConditionToRansak(filter[2]);
					bodyParams.set(`filter[${key}${attributes}_${condition}]`, filter[3]);

				}
			}
		}

	}

	protected setFixFilterToUrlParams(filter: FilterType, urlParams: URLSearchParams) {
		for (let f of filter.filters) {
			if (f.value != null) {
				let key = this.getModelAttributeKey(f.key);
				urlParams.set(`filter[${key}_${RansackHelper.convertDevexpressFilterConditionToRansak(filter.condition)}]`, f.value);
			}
		}
	}

	/****************************************************************************************
		- Private Methods
	 ***************************************************************************************/



	protected extractGetModel = (res: Response, index: number): any => {
		let bodyData = res.json().data || [];
		let model = new this.modelClass();
		model.initWithJson(bodyData);
		return model;
	}

	protected extractGetModels = (res: Response): any => {
		let bodyData = res.json().data || [];
		let returnData: M[] = [];


		bodyData.forEach((dataEntry) => {
			var model = new this.modelClass();
			model.initWithJson(dataEntry);
			returnData.push(model);
		});

		return returnData;
	}


	protected extractGetByPage = (res: Response): any => {
		let models = this.extractGetModels(res);
		return models;
	}
}
