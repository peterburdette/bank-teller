import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Account } from 'src/app/models/Account';
import { BankServiceService } from 'src/app/services/bank-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  currentAccount: Account[] = [];
  accountId: number;
  value: string = 'Deposit';
  withdrawTarget: string;
  transferDestination: string;
  amount: string;

  constructor(
    private route: ActivatedRoute,
    private bankService: BankServiceService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    // gets the parameter for the url (the param is the account id)
    this.accountId = this.route.snapshot.params['id'];
    console.log('id: ', this.accountId);

    // pulls in all accounts and filters by the param id
    this.bankService
      .getAccounts()
      .subscribe(
        (accounts) =>
          (this.currentAccount = accounts.filter(
            (account) => account.id == this.accountId
          ))
      );
  }

  onSubmit() {
    if (!this.amount) {
      // toast event
      this.snackBar.open('You must input an amount.', 'Dismiss', {
        panelClass: ['error-snackbar'],
      });
      return;
    }

    if (this.value === 'Deposit') {
      const postData = {
        id: this.currentAccount[0].id,
        accountHolder: this.currentAccount[0].accountHolder,
        checking: this.currentAccount[0].checking + +this.amount,
        savings: this.currentAccount[0].savings,
      };

      // loops through the currentAccount property object and updates the checking amount
      const updatedCurrentAccount = this.currentAccount.map((obj) => {
        return {
          ...obj,
          id: this.currentAccount[0].id,
          accountHolder: this.currentAccount[0].accountHolder,
          checking: this.currentAccount[0].checking + +this.amount,
          savings: this.currentAccount[0].savings,
        };
      });

      // updates the currentAccount data so the page is dynamically updated
      Object.assign(this.currentAccount, updatedCurrentAccount);

      this.bankService.deposit(this.accountId, postData).subscribe();

      // toast event
      this.snackBar.open(
        'You successfully deposited: $' + this.amount,
        'Dismiss',
        {
          duration: 5000,
          panelClass: ['success-snackbar'],
        }
      );
    } else if (this.value === 'Withdraw') {
      if (+this.amount > this.currentAccount[0].checking) {
        // toast event
        this.snackBar.open(
          'The amount you are trying to withdraw is greater than what is in your account.',
          'Dismiss',
          {
            duration: 5000,
            panelClass: ['error-snackbar'],
          }
        );
        return;
      } else {
        const postData = {
          id: this.currentAccount[0].id,
          accountHolder: this.currentAccount[0].accountHolder,
          checking:
            this.withdrawTarget === 'Checking'
              ? this.currentAccount[0].checking - +this.amount
              : this.currentAccount[0].checking,
          savings:
            this.withdrawTarget === 'Savings'
              ? this.currentAccount[0].savings - +this.amount
              : this.currentAccount[0].savings,
        };

        // loops through the currentAccount property object and updates the checking amount
        const updatedCurrentAccount = this.currentAccount.map((obj) => {
          return {
            ...obj,
            id: this.currentAccount[0].id,
            accountHolder: this.currentAccount[0].accountHolder,
            checking:
              this.withdrawTarget === 'Checking'
                ? this.currentAccount[0].checking - +this.amount
                : this.currentAccount[0].checking,
            savings:
              this.withdrawTarget === 'Savings'
                ? this.currentAccount[0].savings - +this.amount
                : this.currentAccount[0].savings,
          };
        });

        // updates the currentAccount data so the page is dynamically updated
        Object.assign(this.currentAccount, updatedCurrentAccount);

        this.bankService.withdraw(this.accountId, postData).subscribe();

        // toast event
        this.snackBar.open(
          'You successfully withdrew: $' + this.amount,
          'Dismiss',
          {
            duration: 5000,
            panelClass: ['success-snackbar'],
          }
        );
      }
    } else {
      const postData = {
        id: this.currentAccount[0].id,
        accountHolder: this.currentAccount[0].accountHolder,
        checking:
          this.transferDestination === 'Checking'
            ? this.currentAccount[0].checking - +this.amount
            : this.currentAccount[0].checking + +this.amount,
        savings:
          this.transferDestination === 'Savings'
            ? this.currentAccount[0].savings - +this.amount
            : this.currentAccount[0].savings + +this.amount,
      };

      // loops through the currentAccount property object and updates the checking amount
      const updatedCurrentAccount = this.currentAccount.map((obj) => {
        return {
          ...obj,
          id: this.currentAccount[0].id,
          accountHolder: this.currentAccount[0].accountHolder,
          checking:
            this.transferDestination === 'Checking'
              ? this.currentAccount[0].checking - +this.amount
              : this.currentAccount[0].checking + +this.amount,
          savings:
            this.transferDestination === 'Savings'
              ? this.currentAccount[0].savings - +this.amount
              : this.currentAccount[0].savings + +this.amount,
        };
      });

      // updates the currentAccount data so the page is dynamically updated
      Object.assign(this.currentAccount, updatedCurrentAccount);

      this.bankService.transfer(this.accountId, postData).subscribe();

      // toast event
      this.snackBar.open(
        'You successfully transferred: $' + this.amount,
        'Dismiss',
        {
          duration: 5000,
          panelClass: ['success-snackbar'],
        }
      );
    }

    this.amount = '';
  }

  deleteAccount() {
    this.bankService.deleteAccount(this.accountId).subscribe();
    // redirects user to home page after deleting an account
    this.router.navigate(['/']);
  }
}
