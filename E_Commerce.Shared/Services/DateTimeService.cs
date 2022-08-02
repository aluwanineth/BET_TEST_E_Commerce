using E_Commerce.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Commerce.Infrastructure.Shared.Services
{
    public class DateTimeService : IDateTimeService
    {
        public DateTime CurrentDateTime => DateTime.Now;
    }
}
