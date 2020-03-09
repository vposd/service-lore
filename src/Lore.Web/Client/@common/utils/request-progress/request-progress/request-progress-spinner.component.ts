import {
  Component,
  Input,
  HostBinding,
  ChangeDetectionStrategy
} from '@angular/core';

import { RequestProgress } from '../request-progress.class';
import { RequestProgressComponent } from './request-progress.component';

@Component({
  selector: 'request-progress-spinner',
  templateUrl: './request-progress-spinner.component.html',
  styleUrls: ['./request-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestProgressSpinnerComponent extends RequestProgressComponent {
  @Input() diameter = 24;
}
