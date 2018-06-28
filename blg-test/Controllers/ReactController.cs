using blg_test.Models;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;

namespace blg_test.Controllers
{
    public class ReactController : Controller
    {
        // GET: React
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult AddressForm()
        {
            return View();
        }

        public ActionResult EstimateForm()
        {
            return View();
        }

        public ActionResult SendConfirmation(string userId, string addressId, string estimateId, string userEstimateId)
        {
            var dbApiRepository = new DbApiRepository();

            var user = dbApiRepository.GetUser(int.Parse(userId));
            var address = dbApiRepository.GetAddress(int.Parse(addressId));
            var estimateIdInt = int.Parse(estimateId);
            Estimate estimate = null;
            if (estimateIdInt != 0)
            {
                estimate = dbApiRepository.GetEstimate(estimateIdInt);
            }
            var userEstimate = dbApiRepository.GetUserEstimate(int.Parse(userEstimateId));


            var apiKey = System.Environment.GetEnvironmentVariable("SENDGRID_APIKEY");
            var client = new SendGridClient(apiKey);
            var msg = new SendGridMessage()
            {
                From = new EmailAddress("admin@blg-test.azurewebsites.net", "blg-Test"),
                Subject = "Thank you for using blg-test !",
                HtmlContent = @"<style>
table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}

tr:nth-child(even) {
    background-color: #dddddd;
}
</style>
</head>
<body>

<h2>User</h2>
<table>
  <tr>
    <th>Name</th>
    <th>Email</th>
    <th>Phone</th>
    <th>IP Address</th>
  </tr>
  <tr>
    <td>" + user.FirstName + " " + user.LastName + @"</td>
    <td>" + user.Email + @"</td>
    <td>" + user.Phone + @"</td>
    <td>" + user.IpAddress + @"</td>
  </tr>
</table>

  
<h2>Address</h2>
<table>
  <tr>
    <th>Address Line 1</th>
    <th>Address Line 2</th>
    <th>City</th>
    <th>Zipcode</th>
     <th>State</th>
  </tr>
  <tr>
    <td>" + address.AddressLine1 + @"</td>
    <td>" + address.AddressLine2 + @"</td>
     <td>" + address.City + @"</td>
    <td>" + address.Zipcode + @"</td>
    <td>" + address.State + @"</td>
  </tr>
</table>
  <h2>Api Estimate</h2>
<table>
  <tr>
    <th>Api Address</th>
    <th>Rent Estimate</th>
    <th>Low Rent Estimate</th>
    <th>High Rent Estimate</th>
     <th>Is Rent From API</th>
  </tr>
  <tr>
    <td>" + estimate.ApiAddress + @"</td>
    <td>" + estimate.RentEstimate + @"</td>
     <td>" + estimate.LowRentRange + @"</td>
    <td>" + estimate.HighRentRange + @"</td>
    <td>" + estimate.IsRentEstimateFromAPI + @"</td>
  </tr>
</table> 
  <h2>User Estimate</h2>
<table>
  <tr>
   <th>User Rent Estimate</th>
   </tr>
  <tr>
    <td>" + userEstimate.RentEstimate + @"</td>
  </tr>
</table>",
                PlainTextContent = "Please allow html content."
            };
            msg.AddTo(new EmailAddress(user.Email, user.FirstName + " " + user.LastName));
            client.SendEmailAsync(msg);

            return View();
        }
    }
}