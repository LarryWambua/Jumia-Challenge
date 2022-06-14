import { Injectable } from '@angular/core';
import * as saveAs from 'file-saver';
@Injectable({
  providedIn: 'root'
})
export class ExportService {
  _baseUrl ='';
  constructor() { }

   /**
   * Saves the file on the client's machine via FileSaver library.
   *
   */
    downloadFile(data: any){
      saveAs(data, `csv report.csv`)
    }
}
