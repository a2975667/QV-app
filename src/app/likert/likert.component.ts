import { Component, OnInit, Input} from '@angular/core';
import { LikertService } from '../services/likert.service';
import { Router, ActivatedRoute} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-likert',
  templateUrl: './likert.component.html',
  styleUrls: ['./likert.component.scss']
})
export class LikertComponent implements OnInit {
  requestUrl = environment.apiUrl;
  json: object;
  constructor(
    private liService: LikertService,
    private route: Router,
    private cookieService: CookieService,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
  ) { }

  decidePath() {
    const pathIndex = Number(this.cookieService.get('user_current_path_index'));
    const pathArray: Array<object> = JSON.parse(this.cookieService.get('user_path'));
    const type: string = pathArray[pathIndex]['type'];
    if (type === 'normal') {
      this.route.navigate(['likert']);
      this.liService.requestForm();
    } else if (type === 'qv') {
      this.route.navigate(['qv']);
    } else if (type === 'donation') {
      this.route.navigate(['donation']);
    } else if (type === 'complete') {
      this.route.navigate(['complete']);
    }
  }

  ngOnInit() {
    const isDonation = this.activatedRoute.snapshot.paramMap.get('donation');
    if (isDonation) {
      this.liService.requestForm('control');
    } else {
      this.liService.requestForm();
    }
    this.liService.likertForm.subscribe(data => {
    this.json = data;
    });
  }

  submit(data) {
    const isDonation = this.activatedRoute.snapshot.paramMap.get('donation');
    if (isDonation) {
      const pathArray: Array<object> = JSON.parse(this.cookieService.get('user_path'));
      const pathIndex = Number(this.cookieService.get('user_current_path_index')) + 1;
      const userId = this.cookieService.get('user_id');
      const completeJsonAPI = `${this.requestUrl}/thank_you/${pathArray[pathIndex]['file']}`;
      this.http.post(`${this.requestUrl}/submit`,
      {
        data,
        userId,
      }
      ).pipe(
        catchError(this.handleError)
      ).subscribe(() => {
        this.http.get(completeJsonAPI).subscribe(completeJSON => {
          this.route.navigate(['complete', {...completeJSON, userId}]);
        });
      });
    } else {
      this.liService.submit(data).subscribe(
        result => {
          this.decidePath();
        }
      );
    }
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
  }
}
