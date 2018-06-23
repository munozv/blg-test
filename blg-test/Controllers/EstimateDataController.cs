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

namespace blg_test.Controllers
{
    public class EstimateDataController : ApiController
    {
        private IDbApiRepository _dbApiRepository;

        public EstimateDataController()
        {
            _dbApiRepository = new DbApiRepository();
        }

        //[HttpPost]
        //public IHttpActionResult Post([FromBody]Address newAddress)
        //{
        //    Address address = _dbApiRepository.RecordAddress(newAddress);
        //    return Ok(address);
        //}

        public IHttpActionResult GetEstimate(string address, string cityStateZip)
        {
            var client = new HttpClient();

            var uriAddress = new Uri("http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz18ic863ulu3_3mmvk&address="
        + address
        + "&rentzestimate=true&citystatezip=" + cityStateZip);


            var result = client.GetAsync(uriAddress).Result;

            XmlDocument xml = new XmlDocument();

            xml.LoadXml(result.Content.ReadAsStringAsync().Result);

            string json = JsonConvert.SerializeXmlNode(xml);

            ZestimateModel jsonModel = JsonConvert.DeserializeObject<ZestimateModel>(json);
            EstimateRange range = null;
            foreach (var eval in jsonModel.SearchResultssearchresults.response.results.result)
            {
                if (eval.rentzestimate != null &&
                    eval.rentzestimate.amount != null &&
                    !string.IsNullOrWhiteSpace(eval.rentzestimate.amount.text))
                {
                    range = new EstimateRange();
                    range.IsRentFromAPI = true;
                    range.HighRange = eval.rentzestimate.valuationRange.high.text;
                    range.LowRange = eval.rentzestimate.valuationRange.low.text;
                    range.RentEstimate = eval.rentzestimate.amount.text;
                    range.Address = eval.address.street + " " + eval.address.city + " " + eval.address.zipcode + " " + eval.address.state;
                    break;
                }
            }
            if (range == null)
            {
                range = new EstimateRange();
                range.IsRentFromAPI = false;
                foreach (var eval in jsonModel.SearchResultssearchresults.response.results.result)
                {
                    if (eval.zestimate != null &&
                        eval.zestimate.amount != null &&
                        !string.IsNullOrWhiteSpace(eval.zestimate.amount.text))
                    {
                        range = new EstimateRange();
                        range.IsRentFromAPI = true;
                        int estimate = int.Parse(eval.zestimate.amount.text);
                        estimate = estimate / 100 * 5;
                        range.RentEstimate = estimate.ToString();
                        range.HighRange = (estimate + (estimate / 100 * 10)).ToString();
                        range.LowRange = (estimate - (estimate / 100 * 10)).ToString();
                        range.Address = eval.address.street + " " + eval.address.city + " " + eval.address.zipcode + " " + eval.address.state;
                        break;
                    }
                }
            }
            return Ok(range);
        }

    }
}
