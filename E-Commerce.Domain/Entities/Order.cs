using E_Commerce.Domain.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace E_Commerce.Domain.Entities
{
    public class Order : AuditableBaseEntity
    {
        [Required]
        [MaxLength(6)]
        public string OrderNo { get; set; }
        [Required]
        public string UserId { get; set; }
        public virtual List<OrderItem> OrderItems { get; set; }
    }
}
