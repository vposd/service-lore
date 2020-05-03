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

  ngOnInit() {}

  onUserLogin() {
    this.contextReady = true;
    this.notifications.start();
  }

  onUserLogout() {
    this.notifications.stop();
  }
}
