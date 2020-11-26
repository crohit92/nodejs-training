import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userForm = this.fb.group({
    userName: [],
    password: []
  });
  constructor(private http: HttpClient, private fb: FormBuilder, private readonly router: Router) { }

  ngOnInit(): void {
  }

  login() {
    if (this.userForm.valid) {
      this.http.post("http://localhost:3000/users/login", {
        userName: this.userForm.get("userName").value,
        password: this.userForm.get("password").value
      }).subscribe((res: { id: string; token: string }) => {
        sessionStorage.setItem("token", res.token);
        sessionStorage.setItem("uid", res.id);
        this.router.navigateByUrl("/peers/list")
      }, err => {
        alert("An error occured!")
      });
    }
  }
}
