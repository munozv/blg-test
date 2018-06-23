using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace blg_test.Models
{
    public class ZestimateModel
    {
        public Xml xml { get; set; }
        public SearchresultsSearchresults SearchResultssearchresults { get; set; }
    }

    public class Xml
    {
        public string version { get; set; }
        public string encoding { get; set; }
    }

    public class SearchresultsSearchresults
    {
        public string xsischemaLocation { get; set; }
        public string xmlnsxsi { get; set; }
        public string xmlnsSearchResults { get; set; }
        public Request request { get; set; }
        public Message message { get; set; }
        public Response response { get; set; }
    }

    public class Request
    {
        public string address { get; set; }
        public string citystatezip { get; set; }
    }

    public class Message
    {
        public string text { get; set; }
        public string code { get; set; }
    }

    public class Response
    {
        public Results results { get; set; }
    }

    public class Results
    {
        public Result[] result { get; set; }
    }

    public class Result
    {
        public string zpid { get; set; }
        public Links links { get; set; }
        public Address address { get; set; }
        public Zestimate zestimate { get; set; }
        public Localrealestate localRealEstate { get; set; }
        public Rentzestimate rentzestimate { get; set; }
    }

    public class Links
    {
        public string homedetails { get; set; }
        public string mapthishome { get; set; }
        public string comparables { get; set; }
    }

    public class Address
    {
        public string street { get; set; }
        public string zipcode { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public string latitude { get; set; }
        public string longitude { get; set; }
    }

    public class Zestimate
    {
        public Amount amount { get; set; }
        public string lastupdated { get; set; }
        public Oneweekchange oneWeekChange { get; set; }
        public string valueChange { get; set; }
        public Valuationrange valuationRange { get; set; }
        public string percentile { get; set; }
    }

    public class Amount
    {
        public string currency { get; set; }
        public string text { get; set; }
    }

    public class Oneweekchange
    {
        public string deprecated { get; set; }
    }

    public class Valuationrange
    {
        public Low low { get; set; }
        public High high { get; set; }
    }

    public class Low
    {
        public string currency { get; set; }
        public string text { get; set; }
    }

    public class High
    {
        public string currency { get; set; }
        public string text { get; set; }
    }

    public class Localrealestate
    {
        public Region region { get; set; }
    }

    public class Region
    {
        public string name { get; set; }
        public string id { get; set; }
        public string type { get; set; }
        public string zindexValue { get; set; }
        public Links1 links { get; set; }
    }

    public class Links1
    {
        public string overview { get; set; }
        public string forSaleByOwner { get; set; }
        public string forSale { get; set; }
    }

    public class Rentzestimate
    {
        public Amount1 amount { get; set; }
        public string lastupdated { get; set; }
        public Oneweekchange1 oneWeekChange { get; set; }
        public Valuechange valueChange { get; set; }
        public Valuationrange1 valuationRange { get; set; }
    }

    public class Amount1
    {
        public string currency { get; set; }
        public string text { get; set; }
    }

    public class Oneweekchange1
    {
        public string deprecated { get; set; }
    }

    public class Valuechange
    {
        public string duration { get; set; }
        public string currency { get; set; }
        public string text { get; set; }
    }

    public class Valuationrange1
    {
        public Low1 low { get; set; }
        public High1 high { get; set; }
    }

    public class Low1
    {
        public string currency { get; set; }
        public string text { get; set; }
    }

    public class High1
    {
        public string currency { get; set; }
        public string text { get; set; }
    }

}
