import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { RouterModule } from "@angular/router";



@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: UsersComponent,
        children: [
          {
            path: "login",
            loadChildren: () => import("./login/login.module").then(res => res.LoginModule)
          }
        ]
      }
    ])
  ]
})
export class UsersModule { }
