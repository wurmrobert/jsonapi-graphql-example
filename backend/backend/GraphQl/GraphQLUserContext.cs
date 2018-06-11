using System.Security.Claims;

namespace backend.GraphQl {
    public class GraphQLUserContext {
        public ClaimsPrincipal User { get; set; }
    }
}