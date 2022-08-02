using E_Commerce.Domain.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace E_Commerce.Domain.Entities
{
    public class OrderItem : AuditableBaseEntity
    {
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal TotalPrice { get; set; }
        public Order Order { get; set; }
        public Product Product { get; set; }
    }
}
