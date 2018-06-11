using GraphQL.Types;

namespace backend.Data {

    public class MasterdataSchema: Schema {
        public MasterdataSchema (MasterdataQuery query) {
            Query = query;
        }
    }

}