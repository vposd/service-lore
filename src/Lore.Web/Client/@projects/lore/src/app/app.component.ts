import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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

  ngOnInit() {
    this.contextReady = true;
  }
}
