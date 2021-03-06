﻿using blg_test.Models.Interfaces;
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
            newUser.Email = newUser.Email.Trim();
            newUser.FirstName = newUser.FirstName.Trim();
            newUser.LastName = newUser.LastName.Trim();
            newUser.Phone = newUser.Phone.Trim();
            newUser.IpAddress = newUser.IpAddress.Trim();
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

        public blg_test.Address RecordAddress(blg_test.Address newAddress)
        {
            var entities = new Entities();
            newAddress.Id = 0;
            newAddress.AddressLine1 = newAddress.AddressLine1.Trim();
            newAddress.AddressLine2 = newAddress.AddressLine2.Trim();
            newAddress.City = newAddress.City.Trim();
            newAddress.State = newAddress.State.Trim();
            newAddress.Zipcode = newAddress.Zipcode.Trim();

            var result = entities.Addresses.Add(newAddress);

            entities.SaveChanges();
            return result;
        }

        public blg_test.Address GetAddress(int id)
        {
            var entities = new Entities();
            var result = entities.Addresses.Single(x => x.Id == id);
            return result;
        }

        Estimate IDbApiRepository.RecordEstimate(Estimate est)
        {
            var entities = new Entities();
            var result = entities.Estimates.Add(est);
            entities.SaveChanges();
            return result;
        }

        public Estimate GetEstimate(int id)
        {
            var entities = new Entities();
            var result = entities.Estimates.Single(x => x.Id == id);
            return result;
        }

        public UserEstimate RecordUserEstimate(UserEstimate newUserEstimate)
        {
            var entities = new Entities();
            var result = entities.UserEstimates.Add(newUserEstimate);
            entities.SaveChanges();

            return result;
        }

        public UserEstimate GetUserEstimate(int id)
        {
            var entities = new Entities();
            var result = entities.UserEstimates.Single(x => x.Id == id);
            return result;
        }
    }
}