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
    public class AddressDataController : ApiController
    {
        private IDbApiRepository _dbApiRepository;

        public AddressDataController()
        {
            _dbApiRepository = new DbApiRepository();
        }

        [HttpPost]
        public IHttpActionResult Post([FromBody]Address newAddress)
        {
            Address address = _dbApiRepository.RecordAddress(newAddress);
            return Ok(address);
        }

        public IHttpActionResult GetAddressDataById(int id)
        {
            Address user = _dbApiRepository.GetAddress(id);
            return Ok(user);
        }

    }
}
