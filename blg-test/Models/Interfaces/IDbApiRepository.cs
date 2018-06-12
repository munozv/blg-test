using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace blg_test.Models.Interfaces
{
    public interface IDbApiRepository
    {
        User RecordUser(string firstName, string lastName, string userEmail, string userPhone, string ipAddress);
    }
}