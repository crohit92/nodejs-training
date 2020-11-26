import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeersComponent } from './peers.component';
import { RouterModule } from "@angular/router";
import { AuthGuardService } from "../guards/auth-guard.service";

@NgModule({
  declarations: [PeersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: "",
      component: PeersComponent,
      children: [
        {
          path: "list",
          loadChildren: () => import("./peer-list/peer-list.module").then(res => res.PeerListModule),
          canActivate: [AuthGuardService]
        },
        {
          path: "",
          redirectTo: "list",
          pathMatch: "full"
        }
      ]
    }])
  ]
})
export class PeersModule { }
