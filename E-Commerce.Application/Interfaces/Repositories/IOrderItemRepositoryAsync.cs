using E_Commerce.Application.Features.OrderItem.Queries.GetOrderItemById;
using E_Commerce.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace E_Commerce.Application.Interfaces.Repositories
{
    public interface IOrderItemRepositoryAsync : IGenericRepositoryAsync<OrderItem>
    {
        Task<GetOrderItemViewModel> GetOrderItem(int id);
    }
}
