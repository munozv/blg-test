using blg_test.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace blg_test.Models
{
    public class DbApiRepository : IDbApiRepository
    {
        public User RecordUser(string firstName, string lastName, string userEmail, string userPhone, string ipAddress)
        {
            var entities = new Entities();

            var newUser = entities.Users.Add(new User() { FirstName = firstName, LastName = lastName, Email = userEmail, Phone = userEmail, IpAddress = ipAddress });

            return newUser;
        }
    }
}