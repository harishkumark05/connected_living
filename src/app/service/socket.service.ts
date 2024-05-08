// socket.service.ts

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Socket, io} from 'socket.io-client';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
private apiBaseUrl =environment.apiBaseUrl;
  constructor() {
    this.socket = io(`${this.apiBaseUrl}`,{});
  }

  on(eventName: string): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(eventName, data => {
        observer.next(data);
      });
    });
  }

  emit(eventName: string, data: any): void {
    this.socket.emit(eventName, data);
  }
}
