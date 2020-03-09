import { Observable } from 'rxjs';

import { RequestProgressState } from '@common/utils/request-progress/request-progress.class';

export class RegularDialogOptions {
  type?: 'info' | 'danger' | 'success' | 'warning' | 'confirm';
  title: string;
  message: string;
  closeHandler?: () => void;
  closeLabel?: string;
  saveHandler?: () => void;
  saveButtonClass?: string;
  saveProgressState$?: Observable<RequestProgressState>;
  saveLabel?: string;
}
