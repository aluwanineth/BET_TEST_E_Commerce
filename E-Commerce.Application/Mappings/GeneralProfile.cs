using AutoMapper;
using E_Commerce.Application.Features.OrderDetail.Commands.CreateOrderDetail;
using E_Commerce.Application.Features.Orders.Commands;
using E_Commerce.Application.Features.Products.Queries.GetAllProducts;
using E_Commerce.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace E_Commerce.Application.Mappings
{
    public class GeneralProfile : Profile
    {
        public GeneralProfile()
        {
            CreateMap<Product, GetAllProductsViewModel>().ReverseMap();
            CreateMap<GetAllProductsQuery, GetAllProductsParameter>();

            //order
            CreateMap<CreateOrderCommand, Order>();
            CreateMap<Order, CreateCommandViewModel>().ReverseMap(); 

            //Order Detail
             CreateMap<CreateOrderItemCommand, OrderItem>();
        }
    }
}