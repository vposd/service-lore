import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import {
  NotificationHub,
  listenEvent,
} from '@common/utils/notifications/notification-bus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  set contextReady(value: boolean) {
    this.contextReadyBroadcast.next(value);
  }

  get contextReady$() {
    return this.contextReadyBroadcast.asObservable();
  }

  private readonly contextReadyBroadcast = new BehaviorSubject(false);

  constructor(private readonly notifications: NotificationHub) {}

  ngOnInit() {
    this.contextReady = true;
    this.notifications.start();

    this.notifications.events$.subscribe(console.log);

    this.notifications.events$
      .pipe(listenEvent('OrderCreatedEvent'))
      .subscribe((x) => console.log('direct', x));
  }
}
