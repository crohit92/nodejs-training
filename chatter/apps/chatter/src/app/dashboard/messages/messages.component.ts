import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { Message } from "./message";
import { User } from "../../users/user";
import { io, Socket } from "socket.io-client"
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'chatter-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  currentUser: User;
  users: User[];
  chatActiveWith: User;
  messages: Message[] = [];
  socket: Socket;
  chatFormGroup = new FormGroup({
    data: new FormControl('', [Validators.required, Validators.minLength(1)])
  });
  constructor(private client: HttpClient) {
    this.currentUser = JSON.parse(sessionStorage.getItem("user"));
    this.socket = io("http://localhost:3333", {
      query: {
        id: this.currentUser._id
      }
    });
    this.socket.on("message", (message) => {
      this.messages = this.messages ?? [];
      this.messages.push(message);
      this.autoScroll();
    });
  }

  ngOnInit(): void {
    this.client.get("http://localhost:3333/api/v1/users", {
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("token")}`
      }
    }).subscribe((users: any) => {
      this.users = users;
    });
  }

  loadMessages(messagesWith: User) {
    this.chatActiveWith = messagesWith;

    (this.client.get(`http://localhost:3333/api/v1/users/${this.currentUser._id}/messages?with=${messagesWith._id}`) as Observable<Message[]>)
      .subscribe(messages => {
        this.messages = messages;
        this.autoScroll();
      })
  }

  sendMessage() {
    if (this.chatFormGroup.valid) {
      const message: Message = {
        from: this.currentUser._id,
        to: this.chatActiveWith._id,
        data: this.chatFormGroup.get("data").value
      };
      this.socket.emit("message", message);
      this.messages.push(message);
      this.chatFormGroup.setValue({ data: '' });
      this.autoScroll();
    }
  }

  autoScroll() {
    setTimeout(() => {
      document.querySelector(".chat__messages")
        .scroll({
          left: 0,
          top: document.querySelector(".chat__messages").scrollHeight,
          behavior: "smooth"
        })
    })
  }
}
