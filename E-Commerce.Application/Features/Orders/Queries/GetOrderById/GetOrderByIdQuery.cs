using E_Commerce.Application.Exceptions;
using E_Commerce.Application.Interfaces.Repositories;
using E_Commerce.Application.Wrappers;
using E_Commerce.Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace E_Commerce.Application.Features.Orders.Queries.GetOrderById
{
    public class GetOrderByIdQuery : IRequest<Response<GetOrderViewModel>>
    {
        public int Id { get; set; }
        public class GetProductByIdQueryHandler : IRequestHandler<GetOrderByIdQuery, Response<GetOrderViewModel>>
        {
            private readonly IOrderRepositoryAsync _orderRepository;
            public GetProductByIdQueryHandler(IOrderRepositoryAsync orderRepository)
            {
                _orderRepository = orderRepository;
            }
            public async Task<Response<GetOrderViewModel>> Handle(GetOrderByIdQuery query, CancellationToken cancellationToken)
            {
                var orderItem = await _orderRepository.GetOrder(query.Id);
                if (orderItem == null) throw new ApiException($"Order Not Found.");
                return new Response<GetOrderViewModel>(orderItem);
            }
        }
    }
}
