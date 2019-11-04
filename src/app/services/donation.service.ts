import { Injectable, EventEmitter, Output} from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DonationService {
  requestUrl = 'http://localhost:5000';
  organizations: BehaviorSubject<Array<Object>> = new BehaviorSubject([]);
  constructor(
    private http: HttpClient, 
  ) { }
  requestOrganizations(){
    let donationAPI = `${this.requestUrl}/api/donation`;
    this.http.get(donationAPI).pipe(
      catchError(this.handleError)
    ).subscribe(data => {
      this.organizations.next(data['donation']);
    });
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };
}
