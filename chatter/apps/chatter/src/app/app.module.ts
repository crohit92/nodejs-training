import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: "",
        component: AppComponent,
        children: [{
          path: "dashboard",
          loadChildren: () => import("./dashboard/dashboard.module").then(res => res.DashboardModule)
        },
        {
          path: "",
          pathMatch: "full",
          redirectTo: "dashboard/messages"
        }]
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
