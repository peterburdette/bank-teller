import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BankServiceService } from 'src/app/services/bank-service.service';

@Component({
  selector: 'app-addaccount',
  templateUrl: './addaccount.component.html',
  styleUrls: ['./addaccount.component.css'],
})
export class AddaccountComponent implements OnInit {
  accountHolder: string;
  checking: string;
  savings: string;

  constructor(
    private bankService: BankServiceService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    const account = {
      id: Math.floor(Math.random() * 10000),
      accountHolder: this.accountHolder,
      checking: +this.checking,
      savings: +this.savings,
    };

    console.log(account);

    if (!this.accountHolder || !this.checking || !this.savings) {
      // toast event
      this.snackBar.open('All fields are required.', 'Dismiss', {
        panelClass: ['error-snackbar'],
      });
      return;
    }

    this.bankService.addAccount(account).subscribe();

    this.accountHolder = '';
    this.checking = '';
    this.savings = '';

    this.snackBar.open('New account was opened.', 'Dismiss', {
      duration: 3000,
      panelClass: ['success-snackbar'],
    });
  }
}
