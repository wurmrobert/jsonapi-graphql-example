using System.Collections.Generic;
using System.Linq;
using backend.Data;
using backend.Models;
using JsonApiDotNetCore.Controllers;
using JsonApiDotNetCore.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace backend.Controllers {
    [Route("api/[controller]")]
    public class CustomersController : JsonApiController<Customer> {
        
        public CustomersController(
            IJsonApiContext jsonApiContext,
            IResourceService<Customer> resourceService,
            ILoggerFactory loggerFactory) 
            : base(jsonApiContext, resourceService, loggerFactory)
        { }
       
    }
}