using MySocialService.DTO;

namespace MySocialService.Services.API
{
    public interface IChatService
    {
        Task SendMessageAsync(MessageDto message);
        Task<IEnumerable<MessageDto>> GetMessagesAsync(string senderId, string receiverId);
    }
}
