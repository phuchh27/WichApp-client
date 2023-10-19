// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
// import { io, Socket } from 'socket.io-client';

// @Injectable({
//   providedIn: 'root',
// })
// export class WebsocketService {
//   // private socket: WebSocket | undefined;
//   private socket!: Socket;

//   constructor() {
//     this.connect();
//   }

//   private connect(): void {
//     const wsUrl = 'ws://127.0.0.1:8000/ws/items/';
//     this.socket = io(wsUrl);

//   }

//   sendStoreId(storeId: string): void {
//     try{
//       if (this.socket) {
//         this.socket.emit('store_id', storeId);
//       }

//     }catch{
//       console.log('erpr')
//     }
//   }

//   getItems(): Observable<any> {
//     return new Observable((observer) => {
//       try{
//         this.socket.on('items', (data: any) => {
//           observer.next(data);
//         });

//       }
//       catch{
//         console.log('12121')
//       }
//     });
//   }
// }
