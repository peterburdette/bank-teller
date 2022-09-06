import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// importing the Task interface
import { Account } from '../models/Account';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class BankServiceService {
  private apiUrl = 'http://localhost:5000/accounts';

  constructor(private http: HttpClient) {}

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.apiUrl);
  }

  deposit(accountId: number, postData: Account): Observable<any> {
    // get correct account
    const url = `${this.apiUrl}/${accountId}`;

    // sends a put request to update the account balance
    return this.http.put(url, postData, httpOptions);
  }

  withdraw(accountId: number, postData: Account) {
    // get correct account
    const url = `${this.apiUrl}/${accountId}`;

    // sends a put request to update the account balance
    return this.http.put(url, postData, httpOptions);
  }

  transfer(accountId: number, postData: Account) {
    // get correct account
    const url = `${this.apiUrl}/${accountId}`;

    // sends a put request to update the account balance
    return this.http.put(url, postData, httpOptions);
  }

  addAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.apiUrl, account, httpOptions);
  }

  deleteAccount(accountId: number): Observable<Account> {
    // get correct account
    const url = `${this.apiUrl}/${accountId}`;

    return this.http.delete<Account>(url);
  }
}
