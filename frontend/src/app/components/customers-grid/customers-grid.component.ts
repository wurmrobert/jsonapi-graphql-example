import { Customer } from './../../models/Customer';
import { CustomerService } from './../../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-customers-grid',
  templateUrl: './customers-grid.component.html',
  styleUrls: ['./customers-grid.component.scss']
})
export class CustomersGridComponent implements OnInit {

  customers: Array<Customer>;
  loadingInfo: string;

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private apollo: Apollo
  ) { }

  ngOnInit() {
    //this.graphql_fetchAllCustomers();
    // this.jsonApi_fetchAllCustomers();
  }

  onAddBtnClicked() {
    this.router.navigateByUrl('customer');
  }

  onCustomerClick(c: Customer) {
    this.router.navigateByUrl(`customer/${c.Id}`);
  }

  graphql_fetchAllCustomers() {
    this.customers = [];
    this.loadingInfo = "loading...";
    let start = new Date().getTime();

    this.apollo.query({
      query: gql`
      {
        customers {
          id,
          firstName
        }
      }
      `,
    }).subscribe((resp: any) => {
      let end = new Date().getTime();
      let time = end - start;

      this.customers = [];
      for(let r of resp.data.customers) {
        let c = new Customer();
        c.Id = r.id;
        c.FirstName = r.firstName;
        this.customers.push(c);
      }
      
      this.loadingInfo = `GraphQl loading time: ${time} ms`;
    });
  }

  async jsonApi_fetchAllCustomers() {
    this.customers = [];

    try {
      this.loadingInfo = "loading...";

      let start = new Date().getTime();
      this.customers = await this.customerService.getAll().toPromise();
      let end = new Date().getTime();
      let time = end - start;

      console.log('customers: ', this.customers);

      this.loadingInfo = `json:api loading time: ${time} ms`;
    } catch (ex) {
      this.loadingInfo = "Error during loading!";
      console.error(ex);
    }
  }

}
