import { ModelRelation } from './../../models/base/ModelRelation';
import { DeviceService } from './../../services/device.service';
import { Device } from './../../models/Device';
import { JsonViewerService } from './../json-viewer/json-viewer.service';
import { CustomerService } from './../../services/customer.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Customer } from '../../models/Customer';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit, OnDestroy {

  customer: Customer;
  showDevices = false;

  private routerSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private customerService: CustomerService,
    private deviceService: DeviceService,
    public jsonViewerService: JsonViewerService
  ) { }

  ngOnInit() {
    this.routerSub = this.route.params.subscribe(params => {
      let id = params['id'];
      if (id != null) {
        this.setCustomer(id);
      } else {
        this.customer = new Customer();
        this.jsonViewerService.Model = this.customer;
      }
    });

  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
    this.jsonViewerService.Model = null;
  }

  async saveCustomer() {
    console.log('saveCustomer');

    // save devices first
    await this.saveDevicesOfCustomer(this.customer);

    if (this.customer.Id != null) {
      // update
      await this.customerService.update(this.customer).toPromise();
    } else {
      // add
      await this.customerService.add(this.customer).toPromise();
      this.location.back();
    }
  }

  private saveDevicesOfCustomer(customer: Customer): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        for (let deviceRelation of customer.Devices.Relations) {
          if (deviceRelation.Data) {
            deviceRelation.Data.Customer.Data = customer;
            if (deviceRelation.Id != null) {
              // update
              await this.deviceService.update(deviceRelation.Data).toPromise();
            } else {
              // create
              let newDevice = await this.deviceService.add(deviceRelation.Data).toPromise();
              deviceRelation.Data = newDevice;
            }
            deviceRelation.Data.resetDirtyAttributes();
          }
        }
        resolve();
      } catch (ex) {
        reject(ex);
      }
    });
  }

  async loadDeviceRelation(deviceRelation: ModelRelation<Device>) {
    deviceRelation.Data = await this.deviceService.getById(deviceRelation.Id).toPromise();
  }

  addDevice() {
    let device = new Device();
    device.MacAddress = "00:A0:C9:14:C8:29";
    this.customer.Devices.AddRelation(null, device);
  }

  onDeviceClicked(d: Device) {
    if (d == null) return;
    this.jsonViewerService.Model = d;
  }

  private async setCustomer(id: string) {
    this.customer = await this.customerService.getById(id).toPromise();
    this.jsonViewerService.Model = this.customer;
  }


  private async fetchAllDevicesForCustomer(customer: Customer) {
    for(let deviceRelation of customer.Devices.Relations) {
      if(deviceRelation.Data == null) { // not fetched until yet
        deviceRelation.Data = await this.deviceService.getById(deviceRelation.Id).toPromise();
      }
    }
  }

}
