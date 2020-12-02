import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: "",
      component: DashboardComponent,
      children: [
        {
          path: "messages",
          loadChildren: () => import("./messages/messages.module").then(res => res.MessagesModule)
        },
        {
          path: "",
          pathMatch: "full",
          redirectTo: "messages"
        }
      ]
    }])
  ]
})
export class DashboardModule { }
