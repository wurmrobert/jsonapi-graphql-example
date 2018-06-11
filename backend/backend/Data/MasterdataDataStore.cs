using System.Collections.Generic;
using System.Linq;
using backend.Models;

namespace backend.Data {
    public class MasterdataDataStore : IMasterdataDataStore {

        private MasterdataContext context;

        public MasterdataDataStore (MasterdataContext context) {
            this.context = context;
        }

        public IEnumerable<Customer> GetCustomers () {
            return context.Customers;
        }

        public Customer GetCustomerById (int id) {
            return context.Customers.First (i => i.Id.Equals (id));
        }
    }

}