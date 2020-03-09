import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { FileSaverService } from '@common/utils/file-saver/file-saver.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  constructor(private http: HttpClient, private fileSaver: FileSaverService) {}

  get(endpoint: string, params: HttpParams) {
    return this.http.get(endpoint, { params });
  }

  export(reportName: string, endpoint: string, params: HttpParams) {
    return this.http
      .get(endpoint, {
        params,
        responseType: 'arraybuffer',
        headers: {
          accept:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }
      })
      .pipe(
        map(data => {
          let xlsx: Blob;
          if (data) {
            xlsx = new Blob([data], {
              type:
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            });
          }
          return { xlsx };
        }),
        map(response => {
          if (response.xlsx.size) {
            return this.fileSaver.save(
              response.xlsx,
              `${reportName} (сформирован ${dayjs().format(
                'D MMMM YYYY г.'
              )}).xlsx`
            );
          }
        })
      );
  }

  /**
   * Method is use to download file.
   * @param data - Array Buffer data
   * @param type - type of the document.
   */
  private downLoadFile(data: any, type: string) {
    const blob = new Blob([data], { type });
    const url = window.URL.createObjectURL(blob);
    const pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert('Please disable your Pop-up blocker and try again.');
    }
  }
}
