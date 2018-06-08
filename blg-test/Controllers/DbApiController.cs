using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace blg_test.Controllers
{
    public class DbApiController : ApiController
    {
        public IHttpActionResult LogUser(string userName, string userEmail, string userPhone)
        {
           
            return Ok();
        }
    }
}
