import { Installation } from './../models/Installation';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { BaseModelService } from './base/base-model.service';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';


@Injectable()
export class InstallationService extends BaseModelService<Installation> {


	public constructor(http: Http) {
		super(Installation, "Installation", `${environment.backend_jsonapi_url}/${Installation.MODEL_TYPES}`, http);
	}
}
