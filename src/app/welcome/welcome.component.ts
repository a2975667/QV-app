import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { GlobalService } from '../services/global.service';
import { User } from '../schema/user';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  condition_one: boolean = false;
  condition_two: boolean = false;
  condition_three: boolean = false;

  constructor(
    private gService: GlobalService, 
    private router: Router,
    private cookieService: CookieService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }
  initCookie(user: User){
    this.cookieService.set('user_current_question_index', String(0));
    this.cookieService.set('user_complete_flag', String(user.complete_flag));
    this.cookieService.set('user_path', JSON.stringify(user.path));
    this.cookieService.set('user_id', user.userid);
    this.cookieService.set('user_current_path_index', String(0));
  }
  createUser() {
    if(this.condition_one && this.condition_two && this.condition_three){
      if(!this.cookieService.check('user_id')){
        let userGP = this.route.snapshot.paramMap.get('id');
        this.gService.getUserID(userGP).subscribe((user) => {
          console.log(userGP)
          this.initCookie(user);
          this.router.navigate(['demographic']);
        })
      }else{
        this.router.navigate(['demographic']);
      }
    }    
  }
}
