using E_Commerce.Application.Features.OrderDetail.Commands.Checkout;
using E_Commerce.Application.Features.Orders.Commands;
using E_Commerce.Application.Features.Orders.Queries.GetOrderById;
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

namespace E_Commerce.Controller.IntergrationTests.Order
{
    public class OrderControllerIntegrationTests : IClassFixture<TestingWebAppFactory<Program>>
    {
        private readonly HttpClient _client;
        public OrderControllerIntegrationTests(TestingWebAppFactory<Program> factory)
            => _client = factory.CreateClient();

        [Fact]
        public async Task CreateOrderWithoutValidParameters()
        {
            var request = new CreateOrderCommand
            { 
                OrderNo = "000001",
                UserId = "121212122121211212"
            };
            var myContent = JsonConvert.SerializeObject(request);
            var buffer = Encoding.UTF8.GetBytes(myContent);
            var byteContent = new ByteArrayContent(buffer);
            byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            var httpResponse = await _client.PostAsync("/api/v1.0/Order", byteContent);

            //httpResponse.EnsureSuccessStatusCode();
            var stringResponse = await httpResponse.Content.ReadAsStringAsync();
            dynamic result = JObject.Parse(stringResponse);
            // Assert.True((bool)result.Succeeded);
            Assert.Equal(HttpStatusCode.BadRequest, httpResponse.StatusCode);
        }

        [Fact]
        public async Task GetOrder()
        {
            var request = new GetOrderByIdQuery
            { Id = 1 };
            var requestStr = JsonConvert.SerializeObject(request);
            var s = new StringContent(requestStr, Encoding.UTF8, "application/json");
            var httpResponse = await _client.GetAsync("/api/v1.0/Order/1");

            httpResponse.EnsureSuccessStatusCode();
            var stringResponse = await httpResponse.Content.ReadAsStringAsync();
            dynamic result = JObject.Parse(stringResponse);
            // Assert.True((bool)result.Succeeded);
            Assert.Equal(HttpStatusCode.OK, httpResponse.StatusCode);
        }

        [Fact]
        public async Task CheckoutOrderValidParameters()
        {
            var request = new CheckoutOrderCommand
            {
                OrderId = 1,
                UserEmail = "aluwani.nethavhakone@icloud.com",
            };
            var myContent = JsonConvert.SerializeObject(request);
            var buffer = Encoding.UTF8.GetBytes(myContent);
            var byteContent = new ByteArrayContent(buffer);
            byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            var httpResponse = await _client.PostAsync("/api/v1.0/Order/checkout", byteContent);

            httpResponse.EnsureSuccessStatusCode();
            var stringResponse = await httpResponse.Content.ReadAsStringAsync();
            dynamic result = JObject.Parse(stringResponse);
            // Assert.True((bool)result.Succeeded);
            Assert.Equal(HttpStatusCode.OK, httpResponse.StatusCode);
        }
    }
}
