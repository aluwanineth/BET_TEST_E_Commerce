using E_Commerce.Application.DTOs.Email;
using E_Commerce.Application.Exceptions;
using E_Commerce.Application.Interfaces;
using Microsoft.Extensions.Options;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;


namespace E_Commerce.Infrastructure.Shared.Services
{
    public class EmailService : IEmailService
    {
        public Domain.Settings.MailSettings _mailSettings { get; }

        public EmailService(IOptions<Domain.Settings.MailSettings> mailSettings)
        {
            _mailSettings = mailSettings.Value;

        }

        public async Task SendAsync(EmailRequest request)
        {
            try
            {
                var email = new MimeMessage();
                email.Sender = new MailboxAddress(_mailSettings.DisplayName, request.From ?? _mailSettings.EmailFrom);
                email.To.Add(MailboxAddress.Parse(request.To));
                email.Subject = request.Subject;
                var builder = new BodyBuilder();
                builder.HtmlBody = request.Body;
                email.Body = builder.ToMessageBody();
                using var smtp = new SmtpClient();
                smtp.Connect(_mailSettings.SmtpHost, _mailSettings.SmtpPort, SecureSocketOptions.None);
                smtp.Authenticate(_mailSettings.SmtpUsername, _mailSettings.SmtpPassword);
                await smtp.SendAsync(email);
                smtp.Disconnect(true);
            }
            catch (System.Exception ex)
            {
                //_logger.LogError(ex.Message, ex);
                throw new ApiException(ex.Message);
            }
        }
    }
}
