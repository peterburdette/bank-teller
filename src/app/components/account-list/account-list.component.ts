import { Component, Input, OnInit } from '@angular/core';
import { Account } from 'src/app/models/Account';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css'],
})
export class AccountListComponent implements OnInit {
  @Input() account: Account;

  constructor() {}

  ngOnInit(): void {
    console.log(this.account);
  }
}
