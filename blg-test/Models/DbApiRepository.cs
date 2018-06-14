using blg_test.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace blg_test.Models
{
    public class DbApiRepository : IDbApiRepository
    {
        public User RecordUser(User newUser)
        {
            var entities = new Entities();
            newUser.Id = 0;
            var result = entities.Users.Add(newUser);

            entities.SaveChanges();
            return result;
        }
    }
}