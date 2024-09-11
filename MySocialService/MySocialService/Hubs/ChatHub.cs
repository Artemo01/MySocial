using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;

namespace MySocialService.Hubs
{
    [Authorize]
    public class ChatHub : Hub
    {
        public async Task SendMessageToUser(string receiverUserId, string message)
        {
            var senderUserId = Context.UserIdentifier;

            if (senderUserId == null || receiverUserId == null)
            {
                throw new HubException("Niepoprawny użytkownik.");
            }

            await Clients.User(receiverUserId).SendAsync("ReceiveMessage", senderUserId, message);
        }

        public override async Task OnConnectedAsync()
        {
            var userId = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId != null)
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, userId);
            }
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var userId = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId != null)
            {
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, userId);
            }
            await base.OnDisconnectedAsync(exception);
        }
    }
}
