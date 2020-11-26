import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Peer, { PeerJSOption } from 'peerjs';

@Component({
  selector: 'app-peer-list',
  templateUrl: './peer-list.component.html',
  styleUrls: ['./peer-list.component.scss']
})
export class PeerListComponent implements OnInit {
  peer: Peer;
  users: any[];
  @ViewChild("remoteStream") remoteStream: ElementRef<HTMLVideoElement>;
  @ViewChild("localStream") localStream: ElementRef<HTMLVideoElement>;
  constructor(private http: HttpClient) {
    const uid = sessionStorage.getItem("uid");
    this.peer = new Peer(
      uid, {
        host: "localhost",
        port: 3000,
        path: "/peerjs",
        key: "peerjs",
        secure: false,
      } as PeerJSOption);
    this.peer.listAllPeers((ids) => {
      console.log(ids);
      this.http.get(`http://localhost:3000/users/by-ids?ids=${ids.join()}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
      }).subscribe((users: any[]) => {
        this.users = users;
      });
    });
    this.peer.on("call", (call) => {
      navigator.getUserMedia({
        video: true,
        audio: true
      }, (stream) => {
        this.localStream.nativeElement.srcObject = stream;
        call.answer(stream);
        call.on("stream", (remoteStream) => {
          this.remoteStream.nativeElement.srcObject = remoteStream;
        });
      }, (err) => {

      })
      // navigator.getUserMedia({
      //   video: true,
      //   audio: true
      // }, (stream) => {
      //   this.localStream.nativeElement.srcObject = stream;
      //   call.answer(stream);
      //   call.on("stream", (remoteStream) => {
      //     this.remoteStream.nativeElement.srcObject = remoteStream;
      //   });
      // }, (err) => {

      // })
    });
    // var conn = this.peer.connect('another-peers-id');
    // // on open will be launch when you successfully connect to PeerServer
    // conn.on('open', function () {
    //   // here you have conn.id
    //   conn.send('hi!');
    // });
  }

  call(targetId: string) {
    navigator.getUserMedia({
      video: true,
      audio: true
    }, (stream) => {
      this.localStream.nativeElement.srcObject = stream;
      const call = this.peer.call(targetId, stream);
      call.on("stream", remoteStream => {
        this.remoteStream.nativeElement.srcObject = remoteStream;
      })
    }, (err) => {

    })
  }
  ngOnInit(): void {
  }

}
