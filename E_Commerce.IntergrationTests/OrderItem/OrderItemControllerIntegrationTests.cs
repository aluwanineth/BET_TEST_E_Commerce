using E_Commerce.Application.Features.OrderDetail.Commands.CreateOrderDetail;
using E_Commerce.Application.Features.OrderItem.Queries.GetOrderItemById;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace E_Commerce.Controller.IntergrationTests.OrderItem
{
    public class OrderItemControllerIntegrationTests : IClassFixture<TestingWebAppFactory<Program>>
    {
        private readonly HttpClient _client;
        public OrderItemControllerIntegrationTests(TestingWebAppFactory<Program> factory)
            => _client = factory.CreateClient();

        [Fact]
        public async Task CreateOrderItemValidParameters()
        {
            var request = new CreateOrderItemCommand
            {
                OrderId = 1,
                ProductId = 1,
                Quantity = 2,
                TotalPrice = 3,
                UnitPrice = 2
            };
            var myContent = JsonConvert.SerializeObject(request);
            var buffer = Encoding.UTF8.GetBytes(myContent);
            var byteContent = new ByteArrayContent(buffer);
            byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            var httpResponse = await _client.PostAsync("/api/v1.0/OrderItem", byteContent);

            httpResponse.EnsureSuccessStatusCode();
            var stringResponse = await httpResponse.Content.ReadAsStringAsync();
            dynamic result = JObject.Parse(stringResponse);
            // Assert.True((bool)result.Succeeded);
            Assert.Equal(HttpStatusCode.OK, httpResponse.StatusCode);
        }

        [Fact]
        public async Task CreateOrderItemWithInvalidValidParameters()
        {
            var request = new CreateOrderItemCommand
            {
                OrderId = 1,
                ProductId = 0,
                Quantity = 2,
                TotalPrice = 3,
                UnitPrice = 2
            };
            var myContent = JsonConvert.SerializeObject(request);
            var buffer = Encoding.UTF8.GetBytes(myContent);
            var byteContent = new ByteArrayContent(buffer);
            byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            var httpResponse = await _client.PostAsync("/api/v1.0/OrderItem", byteContent);

            var stringResponse = await httpResponse.Content.ReadAsStringAsync();
            dynamic result = JObject.Parse(stringResponse);
            // Assert.True((bool)result.Succeeded);
            Assert.Equal(HttpStatusCode.BadRequest, httpResponse.StatusCode);
        }

        [Fact]
        public async Task GetOrderItem()
        {
            var httpResponse = await _client.GetAsync("/api/v1.0/OrderItem/1");

            httpResponse.EnsureSuccessStatusCode();
            var stringResponse = await httpResponse.Content.ReadAsStringAsync();
            dynamic result = JObject.Parse(stringResponse);
            // Assert.True((bool)result.Succeeded);
            Assert.Equal(HttpStatusCode.OK, httpResponse.StatusCode);
        }
    }
}
