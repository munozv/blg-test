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
    public class EstimateDataController : ApiController
    {
        private IDbApiRepository _dbApiRepository;

        public EstimateDataController()
        {
            _dbApiRepository = new DbApiRepository();
        }

        public IHttpActionResult GetEstimateDataById(int id)
        {
            Estimate est = _dbApiRepository.GetEstimate(id);
            return Ok(est);
        }

        public IHttpActionResult GetEstimate(string address, string cityStateZip)
        {
            var client = new HttpClient();

            var uriAddress = new Uri("http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz18ic863ulu3_3mmvk&address="
        + address
        + "&rentzestimate=true&citystatezip=" + cityStateZip);


            var result = client.GetAsync(uriAddress).Result;

            XmlDocument xml = new XmlDocument();

            xml.LoadXml(result.Content.ReadAsStringAsync().Result);

            XmlSerializer serializer = new XmlSerializer(typeof(ZestimateModel.searchresults));
            XmlReader xmlReader = new XmlNodeReader(xml);
            ZestimateModel.searchresults xmlModel = (ZestimateModel.searchresults)serializer.Deserialize(xmlReader);

            Estimate range = null;
            foreach (var eval in xmlModel.response.results)
            {
                if (eval.rentzestimate != null &&
                    eval.rentzestimate.amount != null &&
                    !string.IsNullOrWhiteSpace(eval.rentzestimate.amount.Value.ToString()))
                {
                    range = new Estimate();
                    range.IsRentEstimateFromAPI = true;
                    range.HighRentRange = eval.rentzestimate.valuationRange.high.Value.ToString();
                    range.LowRentRange = eval.rentzestimate.valuationRange.low.Value.ToString();
                    range.RentEstimate = eval.rentzestimate.amount.Value.ToString();
                    range.ApiAddress = eval.address.street + " " + eval.address.city + " " + eval.address.zipcode + " " + eval.address.state;
                    break;
                }
            }
            if (range == null)
            {
                foreach (var eval in xmlModel.response.results)
                {
                    if (eval.zestimate != null &&
                        eval.zestimate.amount != null &&
                        !string.IsNullOrWhiteSpace(eval.zestimate.amount.Value))
                    {
                        range = new Estimate();
                        range.IsRentEstimateFromAPI = false;
                        int estimate = int.Parse(eval.zestimate.amount.Value);
                        estimate = estimate / 100 * 5;
                        range.RentEstimate = estimate.ToString();
                        range.HighRentRange = (estimate + (estimate / 100 * 10)).ToString();
                        range.LowRentRange = (estimate - (estimate / 100 * 10)).ToString();
                        range.ApiAddress = eval.address.street + " " + eval.address.city + " " + eval.address.zipcode + " " + eval.address.state;

                        break;
                    }
                }
            }
            if (range != null)
            {
                return Ok(_dbApiRepository.RecordEstimate(range));
            }
            return BadRequest();
        }

    }
}
