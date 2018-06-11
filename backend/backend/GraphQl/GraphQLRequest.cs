using Newtonsoft.Json.Linq;

namespace backend.GraphQl {
    public class GraphQLRequest {
        public string OperationName { get; set; }
        public string Query { get; set; }
        public JObject Variables { get; set; }
    }
}