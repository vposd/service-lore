import { HttpErrorResponse } from '@angular/common/http';

import { Store } from '../store/store.class';

export class RequestProgressState {
  /** In progress */
  progress?: boolean;

  /** Is request done successfully */
  done?: boolean;

  /** Is request returns empty */
  empty?: boolean;

  /** Error message */
  error?: string;

  /** Non error optional message */
  message?: string;
}

const ERRORS_MAP = {
  0: 'Нет соединения с сервером',
  204: 'Нет данных для отображения',
  400: 'Ошибка выполнения операции',
  403: 'У пользователя отсутствуют или ограничены права',
  404: 'Ресурс не найден',
  405: 'Метод не разрешен',
  415: 'Не поддерживаемый формат файла',
  431: 'Слишком большие поля заголовка запроса',
  500: 'Ошибка сервера'
};

const StatusTextMap = {
  ValidationException: 'Поля содержат некорректные значения'
};

// TODO: Refactor:
//    - rename to RequestState
//    - methods for set states

export class RequestProgress extends Store<RequestProgressState> {
  get success() {
    return !!(this.state.done && !this.state.error && !this.state.empty);
  }

  constructor() {
    super(new RequestProgressState());
  }

  static formatError(
    errorResponse: { status: number },
    statusCodeMap?: { [key: number]: string }
  ): string;
  static formatError(
    errorResponse: HttpErrorResponse,
    statusCodeMap: { [key: number]: string } = {}
  ) {
    const errorsMap = { ...ERRORS_MAP, ...statusCodeMap };
    if (!errorResponse) {
      return errorsMap[500];
    }

    const messageByCode =
      errorResponse.status > 500
        ? errorsMap[500]
        : errorsMap[errorResponse.status] || '';
    const messageByDescription = StatusTextMap[errorResponse.statusText] || '';
    const error = messageByDescription
      ? messageByDescription
      : `${messageByCode || ''}`;

    return error;
  }

  start() {
    this.state = { progress: true };
  }

  stop(empty = false) {
    this.state = { done: true, empty };
  }

  error(errorResponse: { status: number }): void;
  error(errorResponse: HttpErrorResponse) {
    this.state = { error: RequestProgress.formatError(errorResponse) };
  }
}
