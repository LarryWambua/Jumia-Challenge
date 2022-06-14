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
  includeSeniority = true;
  Loading = false;
  columnData = ['Name','Gender','Nationality','Registration Seniority','Current Age','Phone Number'];
  str='';
  throttle = 0;
  distance = 2;
  page = 1;

  constructor(private userDataService: UserDataService, private exportService: ExportService) { }

  ngOnInit(): void {

  }

  /* Disable/Enable nationality input text */
  toggleDisableNationality() {
    this.disableNationality = !this.disableNationality;
    if(this.disableNationality)
    this.nationality = '';
  }

  /* Disable gender input text */
  toggleDisableGender() {
    this.disableGender = !this.disableGender;
    if(this.disableGender)
    this.gender = '';
  }

  /* Function that calls serivce which fetches user data from API */
  fetchUsers( isSearchFilter: boolean) {
    //Do some filtering
    this.filterData( isSearchFilter);
    ++this.page;
    this.str += '&results=20&page='+this.page;
    //Now call function in service
    this.Loading = true;
    this.userDataService.getData(this.str).subscribe(
      (data: any) => {
        this.userData.push(...data.results);//push necesary for infinite scrolling
        this.Loading = false;

      },
      error => {
        this.Loading = false;
        console.log(error);
        Swal.fire('Error', error, 'error');
      });
  }

  /*Function that Filters column, row data and url params*/
  filterData(isSearchFilter : boolean){

     //Check if search filter is applied ie gender or nationality if yes clear data first since the previous one might not contain the filter
     if(isSearchFilter){
      this.userData = [];
    }
  
    //necesary for filtering so we don't pass empty url param values
   
    if (this.gender != '') {
      this.gender = (this.gender).toLowerCase();
      this.str += '&gender=' + this.gender;
    }else{}
    if (this.nationality != '') {
      this.nationality = (this.nationality).toUpperCase();
      this.str += '&nat=' + this.nationality;
    }

    //necesary for filtering the columns and row data 
    this.str = '&exc=';
    if ( !this.includeGender ) {
      this.str += 'gender,';
      let value = 'Gender';
     this.columnData = this.columnData.filter(item => item !== value); //remove from column data
    }else{
      if (!this.columnData.includes('Gender')) {
        this.columnData.splice(1,0,'Gender');  //add back to column data
      }
    }
    if ( !this.includeAge ) {
      this.str += 'dob,';
      let value = 'Current Age';
      this.columnData = this.columnData.filter(item => item !== value);
    }
    else{
      if (!this.columnData.includes('Current Age')) {
        this.columnData.splice(4,0,'Current Age');  //add back to column data
      }
    }
    if ( !this.includeRegistered ) {
      this.str += 'registered,';
      let value = 'Registration Seniority';
      this.columnData = this.columnData.filter(item => item !== value);
    } else{
      if (!this.columnData.includes('Registration Seniority')) {
        this.columnData.splice(2,0,'Registration Seniority');  //add back to column data
      }
    }
    if ( !this.includePhone ) {
      this.str += 'phone,';
      let value = 'Phone Number';
     this.columnData = this.columnData.filter(item => item !== value);
    }else{
      if (!this.columnData.includes('Phone Number')) {
        this.columnData.splice(5,0,'Phone Number');  //add back to column data
      }
    }

    if ( !this.includeNationality ) {
      this.str += 'nat,';
      let value = 'Nationality';
     this.columnData = this.columnData.filter(item => item !== value);
    }else{
      if (!this.columnData.includes('Nationality')) {
        this.columnData.splice(2,0,'Nationality');  //add back to column data
      }
    }

    if ( !this.includeName ) {
      this.str += 'name,';
      let value = 'Name';
      this.columnData = this.columnData.filter(item => item !== value);
    }else{
      if (!this.columnData.includes('Name')) {
        this.columnData.splice(0,0,'Name');  //add back to column data
      }
    }
    if(this.str === '&exc=')
    this.str = '';
    this.str.slice(0, -1); //remove trailing comma

  }


  /* Function that calls serivce which fetches user data from API with specific columns and param to export to cvs
     Function then calls service to save file to client
  */
  exportCSV() {
  //First Filter
  this.filterData(false);
    //Now call function in service
    this.userDataService.exportCSV(this.str).subscribe(
      //after calling API call export service to download
      data => this.exportService.downloadFile(data)),
      (error: string) => {
        console.log(error);
        Swal.fire('Error', error, 'error');
      };

  }

  //For test purposes
  get genderMessage() { return `Gender is ${this.checkGender ? 'On' : 'Off'}`; }

  get nationalityMessage() { return `Nationality is ${this.checkGender ? 'On' : 'Off'}`; }

  
}