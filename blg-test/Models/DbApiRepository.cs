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

        public User GetUser(int userId)
        {
            var entities = new Entities();
            var result = entities.Users.Single(x => x.Id == userId);
            return result;
        }

        public Address RecordAddress(Address newAddress)
        {
            var entities = new Entities();
            newAddress.Id = 0;
            var result = entities.Addresses.Add(newAddress);

            entities.SaveChanges();
            return result;
        }

        public Address GetAddress(int id)
        {
            var entities = new Entities();
            var result = entities.Addresses.Single(x => x.Id == id);
            return result;
        }
    }
}