import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'chatter-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private client: HttpClient,
    private readonly router: Router) { }

  ngOnInit(): void {
  }

  login(username: string, password: string) {
    this.client.post("http://localhost:3333/api/v1/users/login", {
      username,
      password
    }).subscribe((res: any) => {
      sessionStorage.setItem("token", res.token);
      sessionStorage.setItem("userId", res.user._id);
      this.router.navigateByUrl("/dashboard/messages");
    });
  }

}
