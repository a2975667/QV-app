import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { submitPostSchema } from '../schema/submitPostSchema';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LikertService {
  requestUrl = 'http://localhost:5000';
  likertForm: BehaviorSubject<Object> = new BehaviorSubject({});
  constructor(
    private http: HttpClient, 
    private cookieService: CookieService,
    private router: Router,
  ) { }
  getCookieById(id: string) {
    return this.cookieService.get(id);
  }
  getCurrentPath() :string {
    let pathIndex = Number(this.getCookieById('user_current_path_index'));
    let pathArray: Array<object> = JSON.parse(this.getCookieById('user_path'));
    return pathArray[pathIndex]['file'];
  }
  requestForm(){
    let fileName: string = this.getCurrentPath();
    let fileAPI = `${this.requestUrl}/qv/${fileName}`;
    this.http.get(fileAPI).pipe(
      catchError(this.handleError)
    ).subscribe(data => {
      console.log(data);
      this.likertForm.next(data);
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
  
  submit(data){
    let pathIndex = Number(this.getCookieById('user_current_path_index'));
    let pathArray: Array<object> = JSON.parse(this.getCookieById('user_path'));
    this.cookieService.set('user_current_path_index', String(pathIndex+1));
    if (pathIndex+1 >= pathArray.length) {
      this.cookieService.deleteAll();
      return this.http.post(`${this.requestUrl}/submit`, data).pipe(
        catchError(this.handleError)
      )
    }
    return this.http.post(`${this.requestUrl}/submit`, data).pipe(
      catchError(this.handleError)
    )
  }
}
