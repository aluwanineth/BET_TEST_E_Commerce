using E_Commerce.Identity.Contexts;
using E_Commerce.Infrastructure.Persistence.Contexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Commerce.Controller.IntergrationTests
{
    public static class Utilities
    {
        public static void InitializeDbForTests(ApplicationDbContext dbContext)
        {
            var products = new List<Domain.Entities.Product>
            {
                new Domain.Entities.Product
                {
                    Description = "Test description 1",
                    Name = "Test product 1",
                    Price = 1000,
                    Quantity = 2,
                    ImageUrl = "product1.jpg",
                    Created = DateTime.Now,
                    CreatedBy = "Aluwani",
                    LastModified = DateTime.UtcNow,
                    LastModifiedBy =  "Aluwani"
                },
                new Domain.Entities.Product
                {
                    Description = "Test description 2",
                    Name = "Test product 2",
                    Price = 2000,
                    Quantity = 3,
                    ImageUrl = "product2.jpg",
                    Created = DateTime.Now,
                    CreatedBy = "Aluwani",
                    LastModified = DateTime.UtcNow,
                    LastModifiedBy =  "Aluwani"
                },
                new Domain.Entities.Product
                {
                    Description = "Test description 3",
                    Name = "Test product 3",
                    Price = 3000,
                    Quantity = 3,
                    ImageUrl = "product3.jpg",
                    Created = DateTime.Now,
                    CreatedBy = "Aluwani",
                    LastModified = DateTime.UtcNow,
                    LastModifiedBy =  "Aluwani"
                },
                new Domain.Entities.Product
                {
                    Description = "Test description 4",
                    Name = "Test product 4",
                    Price = 4000,
                    Quantity = 4,
                    ImageUrl = "product4.jpg",
                    Created = DateTime.Now,
                    CreatedBy = "Aluwani",
                    LastModified = DateTime.UtcNow,
                    LastModifiedBy =  "Aluwani"
                },
                new Domain.Entities.Product
                {
                    Description = "Test description 5",
                    Name = "Test product 5",
                    Price = 5000,
                    Quantity = 2,
                    ImageUrl = "product5.jpg",
                    Created = DateTime.Now,
                    CreatedBy = "Aluwani",
                    LastModified = DateTime.UtcNow,
                    LastModifiedBy =  "Aluwani"
                },
                new Domain.Entities.Product
                {
                    Description = "Test description 6",
                    Name = "Test product 6",
                    Price = 6000,
                    Quantity = 6,
                    ImageUrl = "product6.jpg",
                    Created = DateTime.Now,
                    CreatedBy = "Aluwani",
                    LastModified = DateTime.UtcNow,
                    LastModifiedBy =  "Aluwani"
                }
            };
            dbContext.Products.AddRange(products);
            dbContext.SaveChanges();

            var order = new Domain.Entities.Order
            {
                OrderNo = "000001",
                UserId = "499df1ca-674f-47c4-92da-1581e39d9e66",
                Created = DateTime.Now,
                CreatedBy = "Aluwani",
                LastModified = DateTime.UtcNow,
                LastModifiedBy = "Aluwani"
            };
            dbContext.Orders.Add(order);
            dbContext.SaveChanges();

            var orderItem = new Domain.Entities.OrderItem
            {
                OrderId = 1,
                ProductId = 1,
                Quantity = 1,
                UnitPrice = 500,
                TotalPrice = 500
            };

            dbContext.OrderItems.Add(orderItem);
            dbContext.SaveChanges(true);
        }
    }
}
