import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public messages: { sender: string; text: string }[] = [];
  public newMessage: string = '';
  public receiverId: string = '';

  constructor(private chatService: ChatService) {}

  public ngOnInit(): void {
    const userId = localStorage.getItem('userId')!;
    this.chatService.startConnection(userId);

    this.chatService.messages$.subscribe((messages) => {
      this.messages = messages;
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim() !== '') {
      this.chatService.sendMessage(this.receiverId, this.newMessage);
      this.newMessage = '';
    }
  }
}
