using E_Commerce.Domain.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace E_Commerce.Domain.Entities
{
    public class Product : AuditableBaseEntity
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        [Required]
        public decimal Price { get; set; }
        [Required]
        public int Quantity { get; set; }
        public string Description { get; set; }  
    }
}
