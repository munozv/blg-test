using blg_test.Models;
using blg_test.Models.Interfaces;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Xml;
using System.Web;
using System.Web.Http;
using System.Xml.Serialization;

namespace blg_test.Controllers
{
    public class UserEstimateDataController : ApiController
    {
        private IDbApiRepository _dbApiRepository;

        public UserEstimateDataController()
        {
            _dbApiRepository = new DbApiRepository();
        }

        public IHttpActionResult GetEstimateDataById(int id)
        {
            UserEstimate est = _dbApiRepository.GetUserEstimate(id);
            return Ok(est);
        }

        [HttpPost]
        public IHttpActionResult Post([FromBody]UserEstimate newUserEstimate)
        {
            UserEstimate estimate = _dbApiRepository.RecordUserEstimate(newUserEstimate);
            return Ok(estimate);
        }
    }
}
