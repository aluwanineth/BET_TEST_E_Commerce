using E_Commerce.Application.Exceptions;
using E_Commerce.Application.Features.Orders.Commands;
using FluentAssertions;
using NUnit.Framework;

namespace E_Commerce.IntegrationTests.Order.Command
{
    using static Testing;
    public class CreateOrderTests : BaseTestFixture
    {
        [Test]
        public async Task ShouldRequireMinimumFields()
        {
            var command = new CreateOrderCommand();

            await FluentActions.Invoking(() =>
                SendAsync(command)).Should().ThrowAsync<ValidationException>();
        }

        [Test]
        public async Task ShouldCreateOrder()
        {
            //var userId = await RunAsDefaultUserAsync();

            var command = await SendAsync(new CreateOrderCommand
            {
                OrderNo = "00002",
                UserId = "432e4c81-0c78-4c93-937c-15a0cf0ec274"
            });


            command.Should().NotBeNull();
            command.Succeeded.Should().Be(true);
        }
    }
}

