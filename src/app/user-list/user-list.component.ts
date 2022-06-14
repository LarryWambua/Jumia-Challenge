import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserDataService } from '../services/user-data.service';
import Swal from 'sweetalert2';
import { ExportService } from '../services/export.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less']
})
export class UserListComponent implements OnInit {
  userData: User[] = [];
  disableGender = true;
  disableNationality = true;
  checkGender = false;
  checkNationality = false;
  gender = '';
  nationality = '';
  includeGender = true;
  includeNationality = true
  includeName = true;
  includeLocation = true;
  includeEmail = true;
  includeAge = true;
  includeRegistered = true;
  includePhone = true;
  includePicture = true;
  Loading = false;
  csvData: User[] = [];

  constructor(private userDataService: UserDataService, private exportService: ExportService) { }

  ngOnInit(): void {

  }

  /* Disable nationality input text */
  toggleDisableNationality() {
    this.disableNationality = !this.disableNationality;
  }

  /* Disable gender input text */
  toggleDisableGender() {
    this.disableGender = !this.disableGender;
  }

  /* Function that calls serivce which fetches user data from API */
  fetchUsers(page = '1') {
    //necesary for filtering so we don't pass empty values
    let str = 'results=20&page='+page;
    if (this.gender != '') {
      this.gender = (this.gender).toLowerCase();
      str += '&gender=' + this.gender;
    }
    if (this.nationality != '') {
      this.nationality = (this.nationality).toUpperCase();
      str += '&nat=' + this.nationality;
    }

    //Now call function in service
    this.Loading = true;
    this.userDataService.getData(str).subscribe(
      (data: any) => {
        this.userData = data.results;
        this.Loading = false;

      },
      error => {
        this.Loading = false;
        console.log(error);
        Swal.fire('Error', error, 'error');
      });
  }


  /* Function that calls serivce which fetches user data from API with specific columns and param to export to cvs
     Function then calls service to save file to client
  */
  exportCSV() {
    //necesary for filtering the columns
    let str = 'inc=';
    if (this.includeGender) {
      str += 'gender,'
    }
    if (this.includeAge) {
      str += 'dob,'
    }
    if (this.includeLocation) {
      str += 'location,'
    }
    if (this.includeName) {
      str += 'name,'
    }
    if (this.includePhone) {
      str += 'phone,'
    }
    if (this.includePicture) {
      str += 'picture,'
    }
    if (this.includeGender) {
      this.gender = (this.gender).toLowerCase();
      str += 'gender,'
    }
    str.slice(0, -1); //remove trailing comma


    //Now call function in service
    this.userDataService.exportCSV(str).subscribe(

      //after calling API call export service to download
      data => this.exportService.downloadFile(data)),
      (error: string) => {
        console.log(error);
        Swal.fire('Error', error, 'error');
      };

  }
  
}