using System.Threading;
using System.Threading.Tasks;
using E_Commerce.Application.Interfaces.Repositories;
using FluentValidation;


namespace E_Commerce.Application.Features.OrderDetail.Commands.CreateOrderDetail
{public class CreateOrderItemCommandValidator : AbstractValidator<CreateOrderItemCommand>
    {
        public CreateOrderItemCommandValidator()
        {
            RuleFor(o => o.ProductId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();

            RuleFor(o => o.OrderId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();
            RuleFor(o => o.Quantity)
               .NotEmpty().WithMessage("{PropertyName} is required.")
               .NotNull();
        }
    }
}