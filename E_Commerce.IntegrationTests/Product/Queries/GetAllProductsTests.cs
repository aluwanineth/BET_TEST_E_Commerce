using E_Commerce.Application.Exceptions;
using E_Commerce.Application.Features.Products.Queries.GetAllProducts;
using E_Commerce.Application.Features.Products.Queries.GetProductById;
using FluentAssertions;
using NUnit.Framework;

namespace E_Commerce.IntegrationTests.Product.Queries
{
    using static Testing;
    public class GetAllProductsTests : BaseTestFixture
    {
        [Test]
        public async Task ShouldReturnProducts()
        {
           // await RunAsDefaultUserAsync();
            var query = new GetAllProductsQuery 
            { PageSize = 1, PageNumber = 10 };

            var result = await SendAsync(query);

            result.Succeeded.Should().Be(true);
        }

        [Test]
        public async Task ShouldReturnProduct()
        {
           // await RunAsDefaultUserAsync();
            var query = new GetProductByIdQuery { Id = 1 };

            var result = await SendAsync(query);

            result.Data.Name.Should().NotBeNullOrEmpty();
        }

        [Test]
        public async Task ShouldRequireValidProductId()
        {
            var command = new GetProductByIdQuery { Id = 99 };

            await FluentActions.Invoking(() =>
                SendAsync(command)).Should().ThrowAsync<ApiException>();
        }
    }
}
