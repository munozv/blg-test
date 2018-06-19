using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace blg_test.Models.Interfaces
{
    public interface IDbApiRepository
    {
        User RecordUser(User newUser);
        User GetUser(int userId);
        Address RecordAddress(Address newAddress);
        Address GetAddress(int id);
    }
}