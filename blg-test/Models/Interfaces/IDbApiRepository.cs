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
        blg_test.Address RecordAddress(blg_test.Address newAddress);
        blg_test.Address GetAddress(int id);
        Estimate RecordEstimate(Estimate est);
        Estimate GetEstimate(int id);
    }

}