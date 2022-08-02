using E_Commerce.Application.Interfaces.Repositories;
using E_Commerce.Domain.Entities;
using E_Commerce.Infrastructure.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Commerce.Infrastructure.Persistence.Repository
{
    public class ProductRepositoryAsync : GenericRepositoryAsync<Product>, IProductRepositoryAsync
    {
        public ProductRepositoryAsync(ApplicationDbContext dbContext) : base(dbContext)
        {
        }

    }
}

