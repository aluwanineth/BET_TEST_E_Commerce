using E_Commerce.Application.Exceptions;
using E_Commerce.Application.Features.OrderDetail.Commands.Checkout;
using FluentAssertions;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace E_Commerce.IntegrationTests.Order.Command
{
    using static Testing;
    class CheckoutOrderTests : BaseTestFixture
    {
        [Test]
        public async Task ShouldRequireMinimumFields()
        {
            var command = new CheckoutOrderCommand();

            await FluentActions.Invoking(() =>
                SendAsync(command)).Should().ThrowAsync<ValidationException>();
        }

        [Test]
        public async Task ShouldChechoutOrder()
        {
            //var userId = await RunAsDefaultUserAsync();

            var command = await SendAsync(new CheckoutOrderCommand
            {
                UserEmail = "aluwani@gmail.com",
                OrderId = 1
            });
            command.Should().NotBeNull();
            command.Message.Should().Be("Order sent to user");
        }
    }
}

