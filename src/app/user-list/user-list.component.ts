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
  gender ='';
  nationality = '';
  Loading = false;
  csvData:User[] = [];

  constructor( private userDataService: UserDataService, private exportService: ExportService ) { }

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
  fetchUsers() {
    //necesary for filtering so we don't pass empty values
    let str = ''; 
    if( this.gender != ''){
      this.gender = (this.gender).toLowerCase();
    str += '&gender=' + this.gender;
    }
    if( this.nationality != ''){
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
 
  /* Function that calls serivce to export to CSV:
      Create two arrays, one for the header(titles) and the other for row data
      Combine the two arrays into one with key value pairs
      Pass the new array to the export service
  */
  exportCSV(){
    let headers:string[] = ['Name', 'Gender', 'Location', 'Email', 'Current Age', 'Registration Seniority', 'Phone Number', 'Picture'];
    let values:string[]=[];

    //Push Data into second array
    this.userData.forEach(function (item, index) {
     let name = item.name.title + ' '+ item.name.first + ' '+ item.name.last;
     let location = item.location.country;
     let email = item.email;
     let gender = item.gender;
     let age = item.dob.age.toString();
     let registered = item.registered.age.toString();
     let phone = item.phone;
     let picture = item.picture.large;
     values.push( name,gender,location,email,age,registered,phone,picture );
    });

    //Now Combine
     let csv = [];
     let obj:any = {};
      for(let i = 0 ; i < headers.length && i < values.length ; i++){
        obj[headers[i]] = values[i];
          }
          csv.push(obj);

     //Finally Call Service     
     this.exportService.downloadFile(csv);
  }
}
