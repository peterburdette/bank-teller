import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/models/Account';
import { BankServiceService } from 'src/app/services/bank-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  accountList: Account[] = [];

  constructor(private bankService: BankServiceService) {}

  ngOnInit(): void {
    this.bankService
      .getAccounts()
      .subscribe((accounts) => (this.accountList = accounts));
  }
}
