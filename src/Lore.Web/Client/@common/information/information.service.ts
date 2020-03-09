import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export enum MessageType {
  Success,
  Warning,
  Danger
}

export class InformationOptions {
  type: MessageType;
  message: string;
  label: string;
  timeoutClose: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class InformationService {
  constructor(private snackBar: MatSnackBar) {}

  success(message: string, label = '') {
    this.show({
      type: MessageType.Success,
      message,
      label,
      timeoutClose: true
    });
  }

  error(message: string, label = 'Ошибка') {
    this.show({
      type: MessageType.Danger,
      message,
      label,
      timeoutClose: true
    });
  }

  warning(message: string, label = 'Предупреждение') {
    this.show({
      type: MessageType.Warning,
      message,
      label,
      timeoutClose: false
    });
  }

  show(options: InformationOptions) {
    const panelClass = [];
    switch (options.type) {
      case MessageType.Danger:
        panelClass.push('text--danger');
        break;
      case MessageType.Success:
        panelClass.push('text--success');
        break;
      case MessageType.Warning:
        panelClass.push('text--warning');
        break;
    }

    this.snackBar.open(
      (options.label ? `${options.label}: ` : '') + options.message,
      'Закрыть',
      {
        panelClass,
        duration: options.timeoutClose ? 3000 : null
      }
    );
  }
}
