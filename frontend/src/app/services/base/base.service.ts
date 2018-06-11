import { Headers, RequestOptions } from '@angular/http';


export class BaseService {

    protected HTTP_HEADER = new Headers({ 
      'Content-Type': 'application/vnd.api+json', 
      'Accept': 'application/vnd.api+json' 
    });

	protected PAGE_SIZE = 100;

    protected get requestOptions(): RequestOptions {
		return new RequestOptions({ headers: this.HTTP_HEADER });
    };
    
    constructor(public readonly errorName: string) {
        
    }

	
    protected handleError = (error: any, method?: string) => {
		// add custom error handling here
		return error;
	}
}
