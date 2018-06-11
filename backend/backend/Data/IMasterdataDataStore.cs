using System.Collections.Generic;
using backend.Models;

namespace backend.Data {
    public interface IMasterdataDataStore {
        IEnumerable<Customer> GetCustomers ();
        Customer GetCustomerById (int id);
    }
}