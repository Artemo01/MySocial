import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
import { ChatRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [ChatComponent],
  imports: [CommonModule, ChatRoutingModule, FormsModule],
})
export class ChatModule {}
