import { environment } from './../../environments/environment';
import { Customer } from './../models/Customer';
import { Injectable } from '@angular/core';
import { BaseModelService } from './base/base-model.service';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';


@Injectable()
export class CustomerService extends BaseModelService<Customer> {


	public constructor(http: Http) {
		super(Customer, "Customer", `${environment.backend_jsonapi_url}/${Customer.MODEL_TYPES}`, http);
	}
}
