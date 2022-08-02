using System;
using System.Collections.Generic;
using System.Text;

namespace E_Commerce.Application.Interfaces
{
    public interface IAuthenticatedUserService
    {
        string UserId { get; }
    }
}
