using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace blg_test.Models
{
    public class EstimateRange
    {
        public string Address { get; set; }

        public string RentEstimate { get; set; }

        public bool IsRentFromAPI { get; set; }

        public string LowRange { get; set; }

        public string HighRange { get; set; }

    }
}