import { Injectable } from '@angular/core';

enum Color {
  Info = '#317dc7',
  Error = '#f44336',
  Warn = '#f57c00',
  Success = '#4caf50'
}

@Injectable({
  providedIn: 'root'
})
export class Logger {
  info(message: string) {
    this.log(message, Color.Info);
  }

  error(message: string) {
    this.log(message, Color.Error);
  }

  warn(message: string) {
    this.log(message, Color.Warn);
  }

  success(message: string) {
    this.log(message, Color.Success);
  }

  private log(message: string, color: Color) {
    console.log(`%c${message}`, `color: ${color}`);
  }
}

export const logger = new Logger();
