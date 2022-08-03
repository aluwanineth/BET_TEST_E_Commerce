using E_Commerce.Application.Features.Products.Queries.GetAllProducts;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace E_Commerce.Controller.IntergrationTests.Product
{
    public class ProductControllerIntegrationTests : IClassFixture<TestingWebAppFactory<Program>>
    {
        private readonly HttpClient _client;
        public ProductControllerIntegrationTests(TestingWebAppFactory<Program> factory)
            => _client = factory.CreateClient();

        [Fact]
        public async Task GetProducts()
        {
            var request = new GetAllProductsQuery
            { PageSize = 1, PageNumber = 10 };
            var requestStr = JsonConvert.SerializeObject(request);
            var s = new StringContent(requestStr, Encoding.UTF8, "application/json");
            var httpResponse = await _client.GetAsync("/api/v1.0/Product?PageNumber=1&PageSize=20");
               
            httpResponse.EnsureSuccessStatusCode();
            var stringResponse = await httpResponse.Content.ReadAsStringAsync();
            dynamic result = JObject.Parse(stringResponse);
           // Assert.True((bool)result.Succeeded);
            Assert.Equal(HttpStatusCode.OK, httpResponse.StatusCode);
        }

        [Fact]
        public async Task GetProduct()
        {
            var request = new GetAllProductsQuery
            { PageSize = 1, PageNumber = 10 };
            var requestStr = JsonConvert.SerializeObject(request);
            var s = new StringContent(requestStr, Encoding.UTF8, "application/json");
            var httpResponse = await _client.GetAsync("/api/v1.0/Product?id=1");

            httpResponse.EnsureSuccessStatusCode();
            var stringResponse = await httpResponse.Content.ReadAsStringAsync();
            dynamic result = JObject.Parse(stringResponse);
            // Assert.True((bool)result.Succeeded);
            Assert.Equal(HttpStatusCode.OK, httpResponse.StatusCode);
        }
    }
}
