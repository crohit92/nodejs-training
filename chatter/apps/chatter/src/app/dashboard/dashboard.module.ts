import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthGuardService } from "./guards/auth-guard.service";


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: "",
      component: DashboardComponent,
      canActivate: [AuthGuardService],
      children: [
        {
          path: "messages",
          loadChildren: () => import("./messages/messages.module").then(res => res.MessagesModule),
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
