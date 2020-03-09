import {
  Component,
  Input,
  HostBinding,
  ChangeDetectionStrategy
} from '@angular/core';

import { RequestProgress } from '../request-progress.class';

@Component({
  selector: 'request-progress',
  templateUrl: './request-progress.component.html',
  styleUrls: ['./request-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestProgressComponent {
  @Input() requestProgress = new RequestProgress();
  @Input() fetchingTitle = 'Подождите, идет загрузка';
  @Input() fetchingMessage: string;
  @Input() errorTitle = 'Ошибка';
  @Input() errorMessage: string;
  @Input() emptyTitle = 'Нет данных';
  @Input() emptyMessage: string;

  @HostBinding('style.display') get display() {
    return this.requestProgress.success ? 'none' : '';
  }
}
