using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Models;
using JsonApiDotNetCore.Controllers;
using JsonApiDotNetCore.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace backend.Controllers {
    [Route("api/[controller]")]
    public class DevicesController : JsonApiController<Device> {
        
        public DevicesController(
            IJsonApiContext jsonApiContext,
            IResourceService<Device> resourceService,
            ILoggerFactory loggerFactory) 
            : base(jsonApiContext, resourceService, loggerFactory)
        { }

        [HttpPost]
        public override Task<IActionResult> PostAsync([FromBody] Device entity) {
            return PostAsync(entity);
        }  
    }
}