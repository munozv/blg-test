using blg_test.Models;
using blg_test.Models.Interfaces;
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
        private IDbApiRepository _dbApiRepository;

        public DbApiController()
        {
            _dbApiRepository = new DbApiRepository();
        }

        public IHttpActionResult LogUser(string firstName, string lastName, string userEmail, string userPhone, string ipAddress)
        {
            User user = _dbApiRepository.RecordUser(firstName, lastName, userEmail, userPhone, ipAddress);
            return Ok();
        }
    }
}
