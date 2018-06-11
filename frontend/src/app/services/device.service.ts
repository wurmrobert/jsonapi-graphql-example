import { Device } from './../models/Device';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { BaseModelService } from './base/base-model.service';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';


@Injectable()
export class DeviceService extends BaseModelService<Device> {


	public constructor(http: Http) {
		super(Device, "Device", `${environment.backend_jsonapi_url}/${Device.MODEL_TYPES}`, http);
	}
}
