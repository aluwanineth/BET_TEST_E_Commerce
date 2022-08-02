using E_Commerce.Application.Features.Orders.Queries.GetOrderById;
using E_Commerce.Application.Wrappers;
using E_Commerce.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace E_Commerce.Application.Interfaces.Repositories
{
    public interface IOrderRepositoryAsync : IGenericRepositoryAsync<Order>
    {
        Task<bool> IsUniqueOrderNoAsync(string orderNo);
        Task<string> CreateOrderNoAsync();
        Task<GetOrderViewModel> GetOrder(int id);
        Task<Response<string>> Checkout(int id, string userEmail);
    }
}
