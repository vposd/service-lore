import { Injectable } from '@angular/core';
import FileSaver from 'file-saver';

/**
 * Responsibles for save files on disk
 */
@Injectable({
  providedIn: 'root'
})
export class FileSaverService {
  /**
   * Saves blob as file with title
   */
  save(file: Blob, title: string) {
    return FileSaver.saveAs(file, title);
  }
}
