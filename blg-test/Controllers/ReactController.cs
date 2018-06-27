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
        
        public ActionResult SendConfirmation(int userId, int addressId, int estimateId, int userEstimateId)
        {
            var dbApiRepository = new DbApiRepository();

            var user = dbApiRepository.GetUser(userId);
            var address = dbApiRepository.GetUser(addressId);
            var estimate = dbApiRepository.GetUser(estimateId);
            var userEstimate = dbApiRepository.GetUser(userEstimateId);


            var apiKey = System.Environment.GetEnvironmentVariable("SENDGRID_APIKEY");
            var client = new SendGridClient(apiKey);
            var msg = new SendGridMessage()
            {
                From = new EmailAddress("admin@blg-test.azurewebsites.net", "blg -Test"),
                Subject = "Thank you for using blg-test !",
                PlainTextContent = "Hello, Email!",
                HtmlContent = "<strong>Hello, Email!</strong>"
            };
            msg.AddTo(new EmailAddress(user.Email, user.FirstName + " " + user.LastName));
            client.SendEmailAsync(msg);

            return View();
        }
    }
}