using E_Commerce.Application.Features.OrderItem.Queries.GetOrderItemById;
using System;
using System.Collections.Generic;
using System.Text;

namespace E_Commerce.Application.Features.Orders.Queries.GetOrderById
{
    public class GetOrderViewModel
    {
        public int Id { get; set; }
        public string OrderNo { get; set; }
        public List<GetOrderItemViewModel> OrderItems { get; set; }
        public  string Total { get; set; }
    }
}
