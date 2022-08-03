using E_Commerce.Application.Exceptions;
using E_Commerce.Application.Features.OrderDetail.Commands.CreateOrderDetail;
using FluentAssertions;
using NUnit.Framework;


namespace E_Commerce.IntegrationTests.OrderItem.Commands
{
    using static Testing;
    public  class CreateOrderItemTests : BaseTestFixture
    {
        [Test]
        public async Task ShouldRequireMinimumFields()
        {
            var command = new CreateOrderItemCommand();

            await FluentActions.Invoking(() =>
                SendAsync(command)).Should().ThrowAsync<ValidationException>();
        }

        [Test]
        public async Task ShouldCreateOrderItem()
        {
            //var userId = await RunAsDefaultUserAsync();

            var command = await SendAsync(new CreateOrderItemCommand
            {
                OrderId = 1,
                ProductId = 1,
                Quantity = 1,   
                TotalPrice = 0,
                UnitPrice = 99    
            });
            command.Should().NotBeNull();
            command.Succeeded.Should().Be(true);
        }
    }
}


