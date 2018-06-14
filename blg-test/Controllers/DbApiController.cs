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
    public class UserDataController : ApiController
    {
        private IDbApiRepository _dbApiRepository;

        public UserDataController()
        {
            _dbApiRepository = new DbApiRepository();
        }

        [HttpPost]
        public IHttpActionResult Post([FromBody]User newUser)
        {
            User user = _dbApiRepository.RecordUser(newUser);
            return Ok(user);
        }

    }
}
