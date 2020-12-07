import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: "",
        component: AppComponent,
        children: [{
          path: "dashboard",
          loadChildren: () => import("./dashboard/dashboard.module").then(res => res.DashboardModule)
        },
        {
          path: "login",
          loadChildren: () => import("./users/users.module").then(res => res.UsersModule)
        },
        {
          path: "",
          pathMatch: "full",
          redirectTo: "/login"
        }]
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
