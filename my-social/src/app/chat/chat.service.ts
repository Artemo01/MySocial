import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private hubConnection!: signalR.HubConnection;
  private messagesSubject = new BehaviorSubject<
    { sender: string; text: string }[]
  >([]);
  public messages$ = this.messagesSubject.asObservable();

  constructor() {}

  public startConnection(userId: string): void {
    const token = localStorage.getItem('Token');

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5000/chathub', {
        accessTokenFactory: () => token!,
        withCredentials: true,
      })
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.error('Error while starting connection: ', err));

    this.hubConnection.on('ReceiveMessage', (sender: string, text: string) => {
      const currentMessages = this.messagesSubject.value;
      this.messagesSubject.next([...currentMessages, { sender, text }]);
    });
  }

  public sendMessage(receiverId: string, message: string): void {
    this.hubConnection
      .invoke('SendMessageToUser', receiverId, message)
      .catch((err) => console.error('Error while sending message: ', err));
  }
}
