import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/User';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})
export class ChatsComponent implements OnInit {
  conversations: User[] = [];
  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService.getChats().subscribe({
      next: (conversationRes: User[]) => {
        this.conversations = conversationRes;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }
}
