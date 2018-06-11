using System.Collections.Generic;
using GraphQL.Types;
using JsonApiDotNetCore.Models;

namespace backend.Models {

    public class Customer: Identifiable<int> {
        
        [Attr("first_name")]
        public string FirstName { get; set; }
        
        [Attr("last_name")]
        public string LastName { get; set; }

        [Attr("email")]        
        public string Email { get; set; }

        [Attr("street")]
        public string Street { get; set; }

        [Attr("street_nr")]
        public string StreetNr { get; set; }

        [Attr("city")]
        public string City { get; set; }

        [Attr("top_nr")]
        public int TopNr { get; set; }

        [Attr("floor")]
        public string Floor { get; set; }

        [Attr("company")]
        public string Company { get; set; }

        [Attr("customer_nr")]
        public string CustomerNr { get; set; }

        [Attr("postal_code")]
        public string PostalCode { get; set; }

        [Attr("country")]
        public string Country { get; set; }

        [Attr("note")]
        public string Note { get; set; }


        [HasMany("devices")]
        public virtual List<Device> Devices { get; set; }
    }

    public class CustomerType : ObjectGraphType<Customer> {
        public CustomerType () {
            Field (i => i.Id);
            Field (i => i.FirstName);
            Field (i => i.LastName);
            Field (i => i.Email);
            Field (i => i.Street);
            Field (i => i.StreetNr);
            Field (i => i.City);
            Field (i => i.TopNr);
            Field (i => i.Floor);
            Field (i => i.Company);
            Field (i => i.CustomerNr);
            Field (i => i.PostalCode);
            Field (i => i.Country);
            Field (i => i.Note);
        }
    }
}