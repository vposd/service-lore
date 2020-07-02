import { Injectable } from '@angular/core';
import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface NotificationMessage<T> {
  payload: T;
  type: string;
}

export const listenEvent = <T>(event: string) =>
  filter((message: NotificationMessage<T>) => message.type === event);

@Injectable({
  providedIn: 'root',
})
export class NotificationHub {
  get events$() {
    return this.eventsBroadcast.asObservable();
  }

  private _connection: HubConnection;
  private readonly eventsBroadcast = new Subject<NotificationMessage<object>>();

  async start() {
    const connection = new HubConnectionBuilder()
      .withUrl(`http://localhost:8000/notifications`)
      .build();

    connection.on('eventFired', (event) => this.eventsBroadcast.next(event));

    return connection
      .start()
      .then(() => console.log('[NotificationHub] Started successfully'))
      .catch(() =>
        console.error('[NotificationHub] Error start notifications hub')
      );
  }

  async stop() {
    if (this._connection) {
      this._connection.stop();
    }
  }
}
