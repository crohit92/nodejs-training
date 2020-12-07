import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chatter-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  users: { name: string }[];
  activeUser: { name: string };
  constructor(private client: HttpClient) { }

  ngOnInit(): void {
    this.client.get("http://localhost:3333/api/v1/users").subscribe((users: any) => {
      this.users = users;
    });
  }

}
