import { Component, Input, OnInit } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.less']
})
export class UserCardComponent implements OnInit {
  @Input() user!: User[];
  @Input() column!:String[];
  constructor() { }

  ngOnInit(): void {
    // console.log("user is " + JSON.stringify(this.user));
  }

}
