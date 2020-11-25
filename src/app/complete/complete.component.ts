import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-complete',
    templateUrl: './complete.component.html',
    styleUrls: ['./complete.component.scss']
})
export class CompleteComponent implements OnInit {
    requestUrl = environment.apiUrl;

    title: string;
    text: string;
    code: string;
    url: string;
    constructor(
        private http: HttpClient,
        private cookieService: CookieService,
        private route: ActivatedRoute,
    ) { }

    setCookieExpire(id, val) {
        const date = new Date();
        date.setTime(date.getTime() + (1 * 1000));
        this.cookieService.set(
            id,
            val,
            date,
            '/',
            undefined,
            false,
            'Lax'
        );
    }

    ngOnInit() {
        const userId = this.cookieService.get('user_id');
        const pathArray: Array<object> = JSON.parse(this.cookieService.get('user_path'));
        const pathIndex = Number(this.cookieService.get('user_current_path_index'));
        const completeJsonAPI = `${this.requestUrl}/thank_you/${pathArray[pathIndex]['file']}`;
        if (userId) {
            this.http.post(`${this.requestUrl}/submit`, {userId, complete: true}).subscribe(d => {
                this.http.get(completeJsonAPI).subscribe(
                  thankYouData => {
                    this.title = thankYouData['title'];
                    this.code = userId;
                    this.text = thankYouData['text'];
                    this.clearCookie();
                    }
                );
            });
        }        
    }

    clearCookie() {
        this.setCookieExpire('user_gp', '');
        this.setCookieExpire('user_path_id', '');
        this.setCookieExpire('user_current_question_index', '');
        this.setCookieExpire('user_complete_flag', '');
        this.setCookieExpire('user_path', '');
        this.setCookieExpire('user_id', '');
        this.setCookieExpire('user_current_path_index', '');
        this.cookieService.deleteAll();
        this.cookieService.deleteAll('/');
        this.cookieService.deleteAll('/', 'localhost');
        this.cookieService.deleteAll('/', 'qv-video.herokuapp.com');


        if (this.title === 'null') {
            this.setCookieExpire('user_gp', '');
            this.setCookieExpire('user_path_id', '');
            this.setCookieExpire('user_current_question_index', '');
            this.setCookieExpire('user_complete_flag', '');
            this.setCookieExpire('user_path', '');
            this.setCookieExpire('user_id', '');
            this.setCookieExpire('user_current_path_index', '');
            this.cookieService.deleteAll();
            this.cookieService.deleteAll('/');
            this.cookieService.deleteAll('/', 'localhost');
            this.cookieService.deleteAll('/', 'qv-video.herokuapp.com');
            this.title = 'Thank you';
            // tslint:disable-next-line: max-line-length
            this.code = 'We have received enough responses from your demographic group. Thank you for participating. Do not paste anything to the original hit page.';
            this.text = '';
            this.url = '';
        }
    }
}
