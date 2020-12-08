import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from "./message";
import { User } from "../../users/user";
@Component({
  selector: 'chatter-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  currentUser: User;
  users: User[];
  chatActiveWith: User;
  userMessages$: Observable<Message[]>;
  constructor(private client: HttpClient) {
    this.currentUser = JSON.parse(sessionStorage.getItem("user"));
  }

  ngOnInit(): void {
    this.client.get("http://localhost:3333/api/v1/users").subscribe((users: any) => {
      this.users = users;
    });
  }

  loadMessages(messagesWith: User) {
    this.chatActiveWith = messagesWith;
    this.userMessages$ = this.client.get(`http://localhost:3333/api/v1/users/${this.currentUser._id}/messages?with=${messagesWith._id}`) as Observable<Message[]>;
  }

  sendMessage(data: string) {
    this.client.post(`http://localhost:3333/api/v1/messages`, {
      from: this.currentUser._id,
      to: this.chatActiveWith._id,
      data
    }).subscribe(res => {
      this.loadMessages(this.chatActiveWith);
    })
  }
}
