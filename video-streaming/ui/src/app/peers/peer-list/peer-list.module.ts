import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeerListComponent } from './peer-list.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [PeerListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: PeerListComponent
      }
    ])
  ]
})
export class PeerListModule { }
