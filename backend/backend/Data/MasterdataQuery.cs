using backend.Models;
using GraphQL.Types;

namespace backend.Data {
    public class MasterdataQuery : ObjectGraphType {

        public MasterdataQuery (IMasterdataDataStore dataStore) {

            Field<ListGraphType<CustomerType>> (
                "customers",
                resolve : context => {
                    return dataStore.GetCustomers();
                }
            );

            Field<CustomerType> (
                "customer",
                arguments : new QueryArguments (new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "id" }),
                resolve : context => {
                    var id = context.GetArgument<int> ("id");
                    return dataStore.GetCustomerById (id);
                }
            );
        }
    }
}