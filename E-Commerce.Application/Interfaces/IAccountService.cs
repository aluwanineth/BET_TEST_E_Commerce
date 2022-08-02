using E_Commerce.Application.DTOs;
using E_Commerce.Application.DTOs.Account;
using E_Commerce.Application.Wrappers;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace E_Commerce.Application.Interfaces
{
    public interface IAccountService
    {
        Task<Response<AuthenticationResponse>> AuthenticateAsync(AuthenticationRequest request, string ipAddress);
        Task<Response<string>> RegisterAsync(RegisterRequest request, string origin);
        Task<Response<string>> ConfirmEmailAsync(string userId, string code);
        Task<Response<TokenModel>> RefreshToken(TokenModel tokenModel, string ipAddress);
    }
}
