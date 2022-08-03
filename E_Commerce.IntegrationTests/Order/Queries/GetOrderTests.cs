using E_Commerce.Application.Exceptions;
using E_Commerce.Application.Features.Orders.Queries.GetOrderById;
using FluentAssertions;
using NUnit.Framework;

namespace E_Commerce.IntegrationTests.Order.Queries
{
    using static Testing;
    public class GetOrderTests : BaseTestFixture
    {
        [Test]
        public async Task ShouldReturnOrder()
        {
            var query = new GetOrderByIdQuery() { Id = 1 };
            var result = await SendAsync(query);
            result.Data.OrderNo.Should().NotBeNullOrEmpty();
        }

        [Test]
        public async Task ShouldRequireValidOrderId()
        {
            var command = new GetOrderByIdQuery() { Id = 999 };

            await FluentActions.Invoking(() =>
                SendAsync(command)).Should().ThrowAsync<ApiException>();
        }
    }
}

