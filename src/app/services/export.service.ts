import { Injectable } from '@angular/core';
import * as saveAs from 'file-saver';
import * as FileSaver from 'file-saver';
@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

   /**
   * Saves the file on the client's machine via FileSaver library.
   *
   * @param buffer The data that need to be saved.
   * @param fileName File name to save as.
   * @param fileType File type to save as.
   */
    private saveAsFile(buffer: any, fileName: string, fileType: string): void {
      const data: Blob = new Blob([buffer], { type: fileType });
      FileSaver.saveAs(data, fileName);
    }
  
    /**
     * Creates an array of data to CSV. It will automatically generate a title row based on object keys.
     *
     * @param rows array of data to be converted to CSV.
     * @param fileName filename to save as.
     * @param columns array of object properties to convert to CSV. If skipped, then all object properties will be used for CSV.
     */
    // public exportToCsv(rows: object[], fileName: string, columns?: string[]): string {
    //   if (!rows || !rows.length) {
    //     return "";
    //   }
    //   const separator = ',';
    //   const keys = Object.keys(rows[0]).filter(k => {
    //     if (columns?.length) {
    //       return columns.includes(k);
    //     } else {
    //       return true;
    //     }
    //   });
    //   const csvContent =
    //     keys.join(separator) +
    //     '\n' +
    //     rows.map(row => {
    //       return keys.map(k => {
    //         let cell = row[k] === null || row[k] === undefined ? '' : row[k];
    //         cell = cell instanceof Date
    //           ? cell.toLocaleString()
    //           : cell.toString().replace(/"/g, '""');
    //         if (cell.search(/("|,|\n)/g) >= 0) {
    //           cell = `"${cell}"`;
    //         }
    //         return cell;
    //       }).join(separator);
    //     }).join('\n');
    //   this.saveAsFile(csvContent, `${fileName}${CSV_EXTENSION}`, CSV_TYPE);
    // }

    downloadFile(data: any) {
      const replacer = (key: any, value: null) => value === null ? '' : value; // specify how you want to handle null values here
      const header = Object.keys(data[0]);
      let csv = data.map((row: { [x: string]: any; }) => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
      csv.unshift(header.join(','));
      let csvArray = csv.join('\r\n');
  
      var blob = new Blob([csvArray], {type: 'text/csv' })
      saveAs(blob, "myFile.csv");
  }
}
