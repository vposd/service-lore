import * as Sentry from '@sentry/browser';
import {
  ErrorHandler,
  Injectable,
  InjectionToken,
  Inject,
  Optional,
  Injector
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Logger } from '@common/utils/logger/logger.service';
import { Environment } from '@contracts/environment.class';
import { AuthenticationService } from '@common/authentication/auth-service/authentication.service';

import { AppShellConfig } from '../../config/app-shell.config.service';

export const SENTRY_DSN = new InjectionToken<string>('SENTRY_DSN');

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {
  private auth: AuthenticationService;

  constructor(
    @Optional() @Inject(SENTRY_DSN) dsn: string,
    private environment: Environment,
    private appShellConfig: AppShellConfig,
    private logger: Logger,
    private injector: Injector
  ) {
    if (!dsn) {
      this.logger.info(`[Sentry] Missing sentry dsn`);
    }
    setTimeout(() => (this.auth = this.injector.get(AuthenticationService)));
    this.initialize(dsn);
  }

  handleError(error: Error) {
    this.checkLoadingChunkError(error);
    this.captureError(error);

    console.error(error);
  }

  private initialize(dsn: string) {
    Sentry.init({
      dsn,
      enabled: this.environment.production,
      integrations(integrations) {
        return integrations.filter(i => i.name !== 'TryCatch');
      },
      beforeSend: event => {
        const user: Sentry.User = this.auth.user
          ? { id: this.auth.user.userId }
          : {};
        event.user = {
          ...event.user,
          user
        };
        event.tags = {
          ...event.tags,
          productName: this.appShellConfig.productOptions.productName
        };
        return event;
      }
    });
  }

  /** Reload application in case loading chunk error */
  private checkLoadingChunkError(error: Error) {
    const chunkFailedMessage = /Loading chunk [\d]+ failed/;

    if (chunkFailedMessage.test(error.message)) {
      window.location.reload();
    }
  }

  private captureError(error: Error) {
    // Capture http error response manually
    if (error instanceof HttpErrorResponse) {
      this.createAndSendError(error);
    }

    // Capture promise rejections manually
    if (error['rejection']) {
      const rejectionError = error['rejection'] as Error;
      if (rejectionError) {
        this.createAndSendError(rejectionError);
      }
    }
  }

  private createAndSendError(error: Error) {
    const e = new Error(error.message);
    e.name = error.name;
    e.stack = error.stack;
    Sentry.captureException(e);
  }
}
