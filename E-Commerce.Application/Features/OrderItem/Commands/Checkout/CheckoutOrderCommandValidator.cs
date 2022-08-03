using System.Threading;
using System.Threading.Tasks;
using E_Commerce.Application.Features.OrderDetail.Commands.Checkout;
using E_Commerce.Application.Interfaces.Repositories;
using FluentValidation;


namespace E_Commerce.Application.Features.OrderItem.Commands.Checkout
{
    public class CheckoutOrderCommandValidator : AbstractValidator<CheckoutOrderCommand>
    {
        public CheckoutOrderCommandValidator(IOrderRepositoryAsync orderRepository)
        {
            RuleFor(o => o.OrderId)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();

            RuleFor(o => o.UserEmail)
                .EmailAddress()
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .NotNull();
        }
    }
}