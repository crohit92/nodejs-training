import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { io, Socket } from "socket.io-client";

@Component({
  selector: 'chatter-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  users: { _id: string; name: string }[];
  activeUser: { _id: string; name: string };
  socket: Socket;
  constructor(private client: HttpClient) { }

  ngOnInit(): void {
    const myId = sessionStorage.getItem("userId");
    this.socket = io("http://localhost:3333", {
      query: {
        id: myId
      }
    });
    this.socket.on("message", (message: { from: string; to: string; data: string }) => {
      console.log(message);
    });
    this.client.get("http://localhost:3333/api/v1/users").subscribe((users: any) => {
      this.users = users;
    });
  }

  loadMessages(otherUser: string) {

  }

  sendMessage(message: string) {
    this.socket.send({
      to: this.activeUser._id,
      message
    });
  }

}
