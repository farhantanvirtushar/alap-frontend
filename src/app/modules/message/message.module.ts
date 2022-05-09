import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { InboxComponent } from './pages/inbox/inbox.component';
import { ChatsComponent } from './components/chats/chats.component';
import { ConversationComponent } from './components/conversation/conversation.component';


@NgModule({
  declarations: [
    InboxComponent,
    ChatsComponent,
    ConversationComponent
  ],
  imports: [
    CommonModule,
    MessageRoutingModule
  ]
})
export class MessageModule { }
