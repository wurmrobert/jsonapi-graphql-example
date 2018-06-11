import { environment } from './../environments/environment';
import { JsonViewerService } from './components/json-viewer/json-viewer.service';
import { routing } from './app.routing';
import { InstallationService } from './services/installation.service';
import { DeviceService } from './services/device.service';
import { CustomerService } from './services/customer.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';


import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { CustomersGridComponent } from './components/customers-grid/customers-grid.component';
import { CustomerComponent } from './components/customer/customer.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { JsonViewerComponent } from './components/json-viewer/json-viewer.component';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory'


export function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({uri: `${environment.backend_graphql_url}`}),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    routing,
    FormsModule,
    MonacoEditorModule.forRoot()
  ],
  declarations: [
    AppComponent,
    CustomersGridComponent,
    CustomerComponent,
    JsonViewerComponent
  ],
  providers: [
    CustomerService,
    DeviceService,
    InstallationService,
    JsonViewerService,
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
