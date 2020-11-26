import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "users",
    loadChildren: () => import("./users/users.module").then(res => res.UsersModule)
  },
  {
    path: "peers",
    loadChildren: () => import("./peers/peers.module").then(res => res.PeersModule)
  },
  {
    path: "",
    redirectTo: "/users/login",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
