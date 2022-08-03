using E_Commerce.Application.Exceptions;
using E_Commerce.Application.Features.OrderItem.Queries.GetOrderItemById;
using FluentAssertions;
using NUnit.Framework;

namespace E_Commerce.IntegrationTests.OrderItem.Queries
{
    using static Testing;
    public class GetOrderItemTests : BaseTestFixture
    {
        
        [Test]
        public async Task ShouldReturnOrder()
        {
            var query = new GetOrderItemByIdQuery { Id = 1 };

            var result = await SendAsync(query);
            result.Data.Name.Should().NotBeNullOrEmpty();
            result.Data.Id.Should().Be(1);
            result.Data.OrderId.Should().Be(1);

        }

        [Test]
        public async Task ShouldRequireValidProductId()
        {
            var command = new GetOrderItemByIdQuery { Id = 78 };

            await FluentActions.Invoking(() =>
                SendAsync(command)).Should().ThrowAsync<ApiException>();
        }

    }
}
