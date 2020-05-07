import {
  Component,
  Input,
  HostBinding,
  ChangeDetectionStrategy,
} from '@angular/core';

import {
  RequestProgress,
  RequestProgressState,
} from '../request-progress.class';

@Component({
  selector: 'request-progress',
  templateUrl: './request-progress.component.html',
  styleUrls: ['./request-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestProgressComponent {
  @Input() set requestProgressState(state: RequestProgressState) {
    this.requestProgress.state = state;
  }

  @Input() requestProgress = new RequestProgress();
  @Input() fetchingTitle = 'Loading...';
  @Input() fetchingMessage: string;
  @Input() errorTitle = 'Error';
  @Input() errorMessage: string;
  @Input() emptyTitle = 'Empty';
  @Input() emptyMessage: string;

  @HostBinding('style.display') get display() {
    return this.requestProgress.success ? 'none' : '';
  }
}
