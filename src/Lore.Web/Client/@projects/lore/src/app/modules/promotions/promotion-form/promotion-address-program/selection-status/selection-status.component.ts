import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { RequestProgress } from '@common/utils/request-progress/request-progress.class';
import { FadeIn } from '@common/animations/fade-in-out.animation';

@Component({
  selector: 'app-selection-status',
  templateUrl: './selection-status.component.html',
  styleUrls: ['./selection-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [FadeIn]
})
export class SelectionStatusComponent {
  @Input() progress: RequestProgress;
  @Input() count: number;
}
